<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommunityPostRequest;
use App\Models\CommunityPost;

class CommunityPostController extends Controller
{


    public function index()
    {
        return CommunityPost::latest()->paginate(25)->values()->all();
    }


    public function store(CommunityPostRequest $request)
    {
        $validated      = $request->validated();
        $communityPost  = CommunityPost::create( $validated );
        return response()->json( $communityPost, 201 );
    }
}
