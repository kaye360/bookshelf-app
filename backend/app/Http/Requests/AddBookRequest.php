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
            'userId'        => ['numeric', 'required'],
            'isbn10'        => ['string', 'sometimes', Rule::unique('user_books', 'isbn10')->where('userId', auth()->user()->id ) ],
            'isbn13'        => ['string', 'sometimes', Rule::unique('user_books', 'isbn13')->where('userId', auth()->user()->id ) ],
            'imageUrl'      => ['string', 'nullable'],
            'rating'        => ['numeric'],
            'group'         => ['string', 'required'],
            'isRead'        => ['boolean', 'required'],
            'tags'          => ['json'],
            'authors'       => ['string'],
            'isFavourite'   => ['boolean'],
            'description'   => ['string', 'nullable'],
            'pageCount'     => ['numeric', 'nullable'],
            'publishedDate' => ['string', 'nullable'],
            'subTitle'      => ['string', 'nullable']
        ];
    }
}
