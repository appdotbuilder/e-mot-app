<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIncomingLetterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'registration_number' => 'required|string|max:255|unique:incoming_letters,registration_number',
            'sender_name' => 'required|string|max:255',
            'sender_organization' => 'required|string|max:255',
            'subject' => 'required|string|max:500',
            'letter_number' => 'required|string|max:255',
            'recipient_name' => 'required|string|max:255',
            'received_date' => 'required|date',
            'status' => 'required|in:received,in_process,reviewed,approved,rejected,completed',
            'department' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'registration_number.required' => 'Nomor Register wajib diisi.',
            'registration_number.unique' => 'Nomor Register sudah digunakan.',
            'sender_name.required' => 'Nama Pengirim wajib diisi.',
            'sender_organization.required' => 'Nama OPD wajib diisi.',
            'subject.required' => 'Perihal Surat wajib diisi.',
            'letter_number.required' => 'Nomor Surat wajib diisi.',
            'recipient_name.required' => 'Nama Penerima wajib diisi.',
            'received_date.required' => 'Tanggal Surat Masuk wajib diisi.',
            'received_date.date' => 'Format tanggal tidak valid.',
            'status.required' => 'Status Surat wajib dipilih.',
            'status.in' => 'Status Surat tidak valid.',
            'department.required' => 'Bidang wajib diisi.',
        ];
    }
}