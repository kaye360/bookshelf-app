<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CommunityPostRequest extends FormRequest
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
            'userId'     => ['numeric', 'required'],
            'userHandle' => ['string', 'required'],
            'type'       => ['string', Rule::in(['CREATE_BOOK', 'FAVOURITE_BOOK', 'READ_BOOK', 'CREATE_REVIEW', 'JOIN']), 'required'],
            'imageUrl'   => ['string', 'nullable'],
            'title'      => ['string', 'required'],
            'key'        => ['string', 'required']
        ];
    }
}
