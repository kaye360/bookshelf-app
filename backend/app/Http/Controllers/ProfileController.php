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
            'userId'     => $user->id,
            'joined'     => $user->created_at->format('M d, Y'),
            'location'   => ( json_decode( $user->settings ) )->location,
            'books'      => $profileService->getBooks($user),
            'totalBooks' => $profileService->getTotalBooks($user),
            'tags'       => $profileService->getTags($user),
        ];

        return response()->json($response);
    }
}
