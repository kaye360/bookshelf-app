<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommunityBookController;
use App\Http\Controllers\CommunityPostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserBookController;
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
Route::get('profile/{userHandle}', [ProfileController::class, 'show']);

/**
 * User Settings Routes
 */
Route::get('settings', [SettingsController::class, 'show'])->middleware('auth:sanctum');;
Route::put('settings/{id}', [SettingsController::class, 'update'])->middleware('auth:sanctum');;

/**
 * User Bookshelf Routes
 */
Route::get('bookshelf/id/{userId}', [UserBookController::class, 'indexById']);
Route::get('bookshelf/handle/{userHandle}', [UserBookController::class, 'indexByHandle']);
Route::post('book', [UserBookController::class, 'store'])->middleware('auth:sanctum');
Route::put('book/{id}', [UserBookController::class, 'update'])->middleware('auth:sanctum');
Route::delete('book/{id}', [UserBookController::class, 'delete'])->middleware('auth:sanctum');

/**
 * Community Book Routes
 */
Route::get('community/book/{id}', [CommunityBookController::class, 'show']);
Route::post('community/book', [CommunityBookController::class, 'store']);

/**
 * Community Post Routes
 */
Route::get('community', [CommunityPostController::class, 'index']);
Route::post('community', [CommunityPostController::class, 'store'])->middleware('auth:sanctum');

/**
 * Testing Route
 */
Route::get('test', function() {
    return 'Hello!';
});
