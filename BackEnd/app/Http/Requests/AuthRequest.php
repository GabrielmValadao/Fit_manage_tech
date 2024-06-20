<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    protected $stopOnFirstFailure = true;

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
            'email' => 'required|email|string',
            'password' => 'required|string'
        ];
    }
    public function messages(): array
    {
        return [
            'email.required' => 'O email e obrigátorio',
            'email.string' => 'O email deve ser um texto',
            'email.email' => 'O email deve ser válido',
            'password.required' => 'A senha e obrigátorio',
            'password.string' => 'A senha deve ser válida'
        ];
    }

}