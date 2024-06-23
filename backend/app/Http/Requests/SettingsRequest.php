<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SettingsRequest extends FormRequest
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
            "currentlyReadingId" => ['string', 'nullable'],
            "email"              => ['email', 'nullable'],
            "filter"             => ['string', 'nullable', Rule::in(['all', 'read', 'unread', 'favourites', 'owned', 'wishlist'])],
            "location"           => ['string', 'nullable'],
            "name"               => ['string', 'nullable'],
            "sort"               => ['string', 'nullable', Rule::in(['oldest', 'newest', 'title', 'author'])],
            "theme"              => ['string', 'nullable', Rule::in(['light', 'dark'])],
            "view"               => ['string', 'nullable', Rule::in(['grid', 'list', 'card'])],
        ];
    }
}
