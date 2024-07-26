<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
            $validated = $request->validated();

            $user = User::create([
                'handle' => $validated['handle'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password'])
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User Account Created Successfully',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
    }


    public function isUserHandleAvailable($handle)
    {
        $isHandleAvailable = User::where('handle', $handle)->exists();
        return response()->json( ['isHandleAvailable' => !$isHandleAvailable] );
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

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ],200);
    }


    public function logout()
    {
        request()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Succesfully Logged out'
        ], 200);
    }
}
