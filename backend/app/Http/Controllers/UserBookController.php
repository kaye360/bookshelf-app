<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserBook;

/**
 * @see
 *  https://www.toptal.com/laravel/restful-laravel-api-tutorial
 */

class UserBookController extends Controller
{
    public function index(string $userId)
    {
        return UserBook::all()->where('userId', '=', $userId);
    }

    public function create(Request $request)
    {
        $userBook = UserBook::create( $request->all() );
        return response()->json( $userBook, 201 );
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'id' => ['numeric'],
            'title' => ['string', 'nullable'],
            'isbn10' => ['string', 'nullable'],
            'isbn13' => ['string', 'nullable'],
            'imageUrl' => ['string', 'nullable'],
            'userId' => ['string'],
            'rating' => ['numeric'],
            'group' => ['string'],
            'isRead' => ['boolean'],
            'tags' => ['json'],
            'authors' => ['string'],
            'isFavourite' => ['boolean'],
        ]);
        $userBook = UserBook::find($id);
        $userBook->update($request->all());
        return response()->json( $userBook, 201);
    }

    public function delete(string $id)
    {

    }
}
