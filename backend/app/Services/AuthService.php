<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthService {

    public function createUser(mixed $validated)
    {
        $settings = (object) [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'sort' => 'title',
            'view' => 'grid',
            'theme' => 'light',
            'filter' => 'all',
            'location' => null,
            'currentlyReadingId' => null
        ];

        $user = User::create([
            'handle' => $validated['handle'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'settings' => json_encode($settings)
        ]);

        return $user;
    }

    public function createGuest()
    {
        $name     = 'guest_' . rand(11111, 99999);
        $password = uniqid('Zz1');

        $guest = [
            'name'     => $name,
            'handle'   => $name,
            'email'    => 'guest@guest.com',
            'password' => $password,
            'password_confirmation' => $password,
        ];

        return $guest;
    }

    public function createLoginCredentials(Request $request)
    {
        return [
            'handle' => strtolower($request->input('handle')),
            'password' => $request->input('password')
        ];
    }
}
