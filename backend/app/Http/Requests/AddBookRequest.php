<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddBookRequest extends FormRequest
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
            'title'         => ['string', 'nullable'],
            'key'           => ['string', 'required'],
            'userId'        => ['numeric', 'required'],
            'imageUrl'      => ['string', 'nullable'],
            'rating'        => ['numeric'],
            'group'         => ['string', 'required'],
            'isRead'        => ['boolean', 'required'],
            'tags'          => ['json'],
            'authors'       => ['string'],
            'isFavourite'   => ['boolean'],
            'pageCount'     => ['numeric', 'nullable'],
            'publishedDate' => ['string', 'nullable'],
        ];
    }
}
