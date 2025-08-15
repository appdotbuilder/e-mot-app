<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\IncomingLetter
 *
 * @property int $id
 * @property string $registration_number
 * @property string $sender_name
 * @property string $sender_organization
 * @property string $subject
 * @property string $letter_number
 * @property string $recipient_name
 * @property \Illuminate\Support\Carbon $received_date
 * @property string $status
 * @property string $department
 * @property \Illuminate\Support\Carbon|null $last_update_date
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter query()
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereRegistrationNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereSenderName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereSenderOrganization($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereLetterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereRecipientName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereReceivedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereLastUpdateDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IncomingLetter whereUpdatedAt($value)
 * @method static \Database\Factories\IncomingLetterFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class IncomingLetter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'registration_number',
        'sender_name',
        'sender_organization',
        'subject',
        'letter_number',
        'recipient_name',
        'received_date',
        'status',
        'department',
        'last_update_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'received_date' => 'date',
        'last_update_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'incoming_letters';

    /**
     * Get the status label for display.
     *
     * @return string
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'received' => 'Diterima',
            'in_process' => 'Dalam Proses',
            'reviewed' => 'Sedang Ditinjau',
            'approved' => 'Disetujui',
            'rejected' => 'Ditolak',
            'completed' => 'Selesai',
            default => $this->status,
        };
    }
}