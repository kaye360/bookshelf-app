<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingsRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function show()
    {
        $settings = User::find( Auth::user()->id );
        return response()->json($settings->settings);
    }


    public function update(SettingsRequest $request, $id)
    {
        $validated = $request->validated();

        $user = User::find($id);

        if( !$user ) {
            throw new Exception("Can't find user with id: $id", 404);
        }

        $user->update( ['settings' => json_encode($validated) ] );

        return response()->json( $validated, 201 );
    }
}
