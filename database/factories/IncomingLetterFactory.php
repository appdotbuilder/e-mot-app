<?php

namespace Database\Factories;

use App\Models\IncomingLetter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IncomingLetter>
 */
class IncomingLetterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\IncomingLetter>
     */
    protected $model = IncomingLetter::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['received', 'in_process', 'reviewed', 'approved', 'rejected', 'completed'];
        $departments = [
            'Bagian Kepegawaian',
            'Bagian Umum',
            'Bidang Pemerintahan',
            'Bidang Kesehatan',
            'Bidang Pendidikan',
            'Bidang Pembangunan'
        ];
        
        $organizations = [
            'Dinas Pendidikan',
            'Dinas Kesehatan',
            'Dinas Pekerjaan Umum',
            'Dinas Sosial',
            'Badan Kepegawaian Daerah',
            'Sekretariat Daerah'
        ];

        return [
            'registration_number' => 'REG-' . $this->faker->unique()->numerify('###/####'),
            'sender_name' => $this->faker->name(),
            'sender_organization' => $this->faker->randomElement($organizations),
            'subject' => 'Permohonan Mutasi ' . $this->faker->jobTitle(),
            'letter_number' => $this->faker->numerify('###/###/####'),
            'recipient_name' => $this->faker->name(),
            'received_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'status' => $this->faker->randomElement($statuses),
            'department' => $this->faker->randomElement($departments),
            'last_update_date' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'notes' => $this->faker->optional(0.7)->sentence(10),
        ];
    }
}