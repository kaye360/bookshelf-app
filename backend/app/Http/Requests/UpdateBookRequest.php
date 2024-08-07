<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
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
            'id'            => ['prohibited'],
            'userId'        => ['prohibited'],
            'isbn10'        => ['prohibited'],
            'isbn13'        => ['prohibited'],
            'userId'        => ['prohibited'],
            'title'         => ['string'],
            'imageUrl'      => ['string', 'nullable'],
            'rating'        => ['numeric'],
            'group'         => ['string'],
            'isRead'        => ['boolean'],
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
