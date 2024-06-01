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

    }

    public function delete(string $id)
    {

    }
}
