<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserBook;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    public function show($userHandle)
    {
        $profileService = new ProfileService();

        $user     = User::where('handle', $userHandle)->first();
        $location = ( json_decode( $user->settings ) )->location;
        $books    = UserBook::select(['key', 'title', 'imageUrl', 'authors', 'pageCount'])
            ->where('userId', $user->id)
            ->inRandomOrder()
            ->take(20)
            ->get();

        $dbTags = UserBook::select(['tags'])
            ->where('userId', $user->id)
            ->get();

        $tags = $profileService->getTags($dbTags);

        $response = (object) [
            'userId' => $user->id,
            'location' => $location,
            'books' => $books,
            'joined' => $user->created_at->format('M d, Y'),
            'tags' => $tags,
        ];

        return response()->json($response);
    }
}
