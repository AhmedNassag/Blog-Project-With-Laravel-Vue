<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::get('posts','PostController@index');
Route::apiResource('posts','PostController');
Route::apiResource('categories','CategoryController');
Route::get('category/{slug}/posts','PostController@categoryPosts');
Route::get('searchPosts/{query}','PostController@serachPosts');


Route::post('register','UserController@register');
Route::post('login','UserController@login');


Route::middleware('auth:api')->group(function()
{
    Route::get('user','UserController@details');
    Route::get('getAllNotifications','UserController@getAllNotifications');
    Route::get('getUnreadNotifications','UserController@getUnreadNotifications');
    Route::put('markNotificationAsRead','UserController@markNotificationAsRead');
    Route::post('comment/create','CommentController@store');
});



Route::group(['prefix'=>'/admin','middleware'=>'auth:api'],function(){
    Route::get('posts','AdminController@getPosts');
    Route::get('categories','AdminController@getCategories');
    Route::post('addPost','AdminController@addPost');
    Route::post('updatePost','AdminController@updatePost');
    Route::post('deletePosts','AdminController@deletePosts');
});
