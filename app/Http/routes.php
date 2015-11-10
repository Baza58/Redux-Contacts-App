
<?php

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', 'HomeController@getHome');
Route::get('/api/contacts', 'HomeController@getContacts');
Route::post('/api/contacts/create', 'HomeController@postCreateContact');
Route::get('/api/contacts/{id}', 'HomeController@getSingleContact');
Route::delete('/api/contacts/{id}/delete', 'HomeController@deleteContact');
Route::post('/api/contacts/{id}/edit', 'HomeController@putEditContact');

Route::any('/home', 'HomeController@getAuthorize');

Route::any('/home/contacts', 'HomeController@getAuthorize' );

Route::any('/home/contacts/{id}', 'HomeController@getAuthorize');
