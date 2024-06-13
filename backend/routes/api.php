<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommunityBookController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserBookController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


/**
 * Authentication Routes
 */
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('register', [AuthController::class, 'register']);
Route::get('register/isUserHandleAvailable/{handle}', [AuthController::class, 'isUserHandleAvailable']);

/**
 * User Profile Routes
 */
Route::get('profile/{id}', [ProfileController::class, 'show']);
Route::put('profile/{id}', [ProfileController::class, 'update'])->middleware('auth:sanctum');;

/**
 * User Settings Routes
 */
Route::get('settings/{id}', [SettingsController::class, 'show'])->middleware('auth:sanctum');;
Route::put('settings/{id}', [SettingsController::class, 'update'])->middleware('auth:sanctum');;

/**
 * User Bookshelf Routes
 */
Route::get('bookshelf/{userId}', [UserBookController::class, 'index']);
Route::post('book', [UserBookController::class, 'store']);
Route::put('book/{id}', [UserBookController::class, 'update'])->middleware('auth:sanctum');
Route::delete('book/{id}', [UserBookController::class, 'delete'])->middleware('auth:sanctum');

/**
 * Community Book Routes
 */
Route::get('community', [CommunityBookController::class, 'index']);
Route::get('community/book/{id}', [CommunityBookController::class, 'show']);
Route::post('community/book', [CommunityBookController::class, 'store']);

/**
 * Error Routes
 */
Route::fallback( function(){
    return response()->json([
        'message' => 'Page Not Found.'], 404);
});
