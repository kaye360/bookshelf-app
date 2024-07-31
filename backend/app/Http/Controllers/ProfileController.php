<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    public function show($userHandle, ProfileService $profileService)
    {
        $user = User::where('handle', $userHandle)->first();

        $response = (object) [
            'userId'   => $user->id,
            'location' => ( json_decode( $user->settings ) )->location,
            'books'    => $profileService->getBooks($user),
            'tags'     => $profileService->getTags($user),
            'joined'   => $user->created_at->format('M d, Y'),
        ];

        return response()->json($response);
    }
}
