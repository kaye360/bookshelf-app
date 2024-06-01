<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserBook;
use stdClass;

class UserAuthenticationController extends Controller
{
    public function register(Request $request)
    {
            $name = $request->input('name');
            $handle = $request->input('handle');
            $handle = str_replace(' ', '_', $handle );
            $handle = substr($handle, 0, 10);
            $email = strtolower($request->input('email'));
            $password = $request->input('password');

            $user = User::create([
                'name' => $name,
                'handle' => $handle,
                'email' => $email,
                'password' => Hash::make($password)
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User Account Created Successfully',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
    }


    public function login(Request $request)
    {
        $handle = strtolower($request->input('handle'));
        $password = $request->input('password');

        $credentials = [
            'handle' => $handle,
            'password' => $password
        ];
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }

        $user = User::where('handle', $request['handle'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        $books = UserBook::all()->where('userId', '=', $user->id)->toArray();
        foreach( $books as &$book ) {
            $book['tags'] = json_decode($book['tags']);
            $book['image'] = new stdClass();
            $book['image']->url = $book['imageUrl'];
            $book['image']->width = $book['imageWidth'];
            $book['image']->height = $book['imageHeight'];
            unset($book['imageUrl'], $book['imageWidth'], $book['imageHeight']);
        }

        $user->books = $books;


        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ],200);
    }


    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Succesfully Logged out'
        ], 200);
    }
}
