<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::resource('/api/generate','LayoutController@store');
Route::get('/api/layout/download/{directory}', 'LayoutController@download');
Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');
