<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLetterProgressRequest extends FormRequest
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
            'status' => 'required|in:received,in_process,reviewed,approved,rejected,completed',
            'department' => 'required|string|max:255',
            'last_update_date' => 'required|date',
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
            'status.required' => 'Status Surat wajib dipilih.',
            'status.in' => 'Status Surat tidak valid.',
            'department.required' => 'Bidang wajib diisi.',
            'last_update_date.required' => 'Tanggal Update wajib diisi.',
            'last_update_date.date' => 'Format tanggal update tidak valid.',
        ];
    }
}