<?php

use App\Http\Controllers\UserBookController;
use App\Http\Controllers\UserAuthenticationController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [UserAuthenticationController::class, 'login']);
Route::post('logout', [UserAuthenticationController::class, 'logout'])->middleware('auth:sanctum');

Route::post('register', [UserAuthenticationController::class, 'register']);
Route::get('register/isUserHandleAvailable/{handle}', [UserAuthenticationController::class, 'isUserHandleAvailable']);
// Route::post('logout', [UserAuthenticationController::class, 'logout']);
// Route::get('user/{id}', [UserController::class, 'show']);
// Route::post('user', [UserController::class, 'create']);
// Route::put('user', [UserController::class, 'update']);
// Route::delete('user', [UserController::class, 'delete']);
// Route::get('profile/{id}', [UserController::class, 'profile']);


// Route::get('book/{id}', [GlobalBookController::class, 'show']);
// Route::get('community', [GlobalBookController::class, 'index']);

Route::get('bookshelf/{userId}', [UserBookController::class, 'index']);
Route::post('book/add', [UserBookController::class, 'create']);
Route::put('book/{id}', [UserBookController::class, 'update'])->middleware('auth:sanctum');
Route::delete('book/{id}', [UserBookController::class, 'delete'])->middleware('auth:sanctum');

Route::fallback( function(){
    return response()->json([
        'message' => 'Page Not Found.'], 404);
});
