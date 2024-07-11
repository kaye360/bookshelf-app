<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\UserBook;
use Exception;

class UserBookController extends Controller
{

    public function index(string $userId)
    {
        return UserBook::all()->where('userId', $userId)->values()->all();
    }


    public function store(AddBookRequest $request)
    {
        $validated = $request->validated();
        $userBook  = UserBook::create( $validated );
        return response()->json( $userBook, 201 );
    }


    public function update(UpdateBookRequest $request, string $id)
    {
        $userBook = UserBook::find($id);

        if( !$userBook ) {
            throw new Exception("Can't find book with id: $id", 404);
        }

        $validated = $request->validated();
        $userBook->update($validated);

        return response()->json( $userBook, 201);
    }


    public function delete(string $id)
    {
        UserBook::find($id)->delete();
        return 204;
    }
}
