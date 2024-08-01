<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\AuthService;

class AuthController extends Controller
{

    public function __construct(private AuthService $authService) {}

    public function register(RegisterRequest $request)
    {
            $validated = $request->validated();
            $user      = $this->authService->createUser($validated);
            $token     = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message'      => 'User Account Created Successfully',
                'user'         => $user,
                'access_token' => $token,
                'token_type'   => 'Bearer',
            ], 201);
    }


    public function isUserHandleAvailable($handle)
    {
        $isHandleAvailable = User::where('handle', $handle)->exists();
        return response()->json( ['isHandleAvailable' => !$isHandleAvailable] );
    }


    public function login(Request $request)
    {
        if (!Auth::attempt( $this->authService->createLoginCredentials($request) )) {
            return response()->json([ 'message' => 'Invalid login credentials' ], 401);
        }

        $user = User::where('handle', $request['handle'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ],200);
    }

    public function guest() {
        $guest = $this->authService->createGuest();
        $user  = $this->authService->createUser($guest);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'User Account Created Successfully',
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 201);
    }

    public function logout()
    {
        request()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Succesfully Logged out'
        ], 200);
    }
}
