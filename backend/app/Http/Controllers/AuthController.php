<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdatePasswordRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

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

    public function resetPasswordRequest(Request $request)
    {
        $validated = $request->validate(['username' => 'required']);
        $user      = User::where('handle', $validated['username'])->first();

        if( !$user ) {
            return response()->json([
                'message' => 'User not found',
                'status' => 'user.invalid'
            ], 400);
        }

        $status  = Password::sendResetLink( ['email' => $user->email] );

        return response()->json([
            'message' => $status === Password::RESET_LINK_SENT
                ? 'Password reset link sent'
                : 'Error with password reset link',
            'status' => $status
        ]);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $validated = $request->validated();

        $user = User::where([
            [ 'handle', $validated['username'] ],
            [ 'email', $validated['email'] ]
        ])->first();

        if( !$user ) {
            return response()->json([
                'message' => 'User not found',
                'status' => 'user.invalid'
            ], 400);
        }

        $status = Password::reset([
                'email'    => $validated['email'],
                'token'    => $validated['token'],
                'password' => $validated['password'],
                'password_confirmation' => $validated['password_confirmation'],
            ],
            function () use($user, $validated)
            {
                $user->forceFill([
                    'password' => Hash::make( $validated['password'] )
                ])->setRememberToken( Str::random(60));

                $user->save();
            }
        );

        return response()->json( ['status' => $status] );
    }
}
