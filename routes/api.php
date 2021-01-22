<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\ProducerController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('Movie', MovieController::class);
Route::resource('Actor', ActorController::class);
Route::resource('Producer', ProducerController::class);
Route::resource('Genre', GenreController::class);
Route::resource('Role', RoleController::class);

Route::get('/movie/all', [MovieController::class, 'getMovieAll']);
Route::get('/actor/all', [ActorController::class, 'getActorAll']);
Route::get('/genre/all', [GenreController::class, 'getGenreAll']);
Route::get('/producer/all', [ProducerController::class, 'getProducerAll']);
Route::get('/role/all', [RoleController::class, 'getRoleAll']);
