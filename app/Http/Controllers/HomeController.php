<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use Auth;

class HomeController extends Controller
{
    public function getHome() {
        return view('home');
    }

    public function getContacts() {

    	$user = Auth::user();
    	$contacts = $user->contacts->toArray();
        $array = [];

        for ($i = 0; $i < count($contacts); $i++ ) {
            $array[$contacts[$i]['id']] = $contacts[$i];
        }


    	return response()->json([
    		'data' => $array
    	]);
    }

    public function postCreateContact(Request $request) {
        $user = Auth::user();
        $user->contacts()->create([
            'name' => $request->name,
            'number' => $request->number,
            'description' => $request->description
        ]);
        
        $contact = $user->contacts()->where('name', $request->name)->first();

        return response()->json([
            'data' => $contact
        ]);
    }

    public function getSingleContact($name) {
        $user = Auth::user();

        $contact = $user->contacts()->where('name', $name)->first();
        return response()->json([
            'data' => $contact
        ]);
    }
    public function deleteContact($id) {
        $user = Auth::user();
        $contact = $user->contacts()->where('id', $id)->delete();
        $contacts = $user->contacts;
        return response()->json([
            'data' => $contacts
        ]);
    }
    public function putEditContact(Request $request, $id) {
        $user = Auth::user();
        $user->contacts()->where('id', $id)->update([
            'name' => $request->name,
            'number' => $request->number,
            'description' => $request->description
        ]);
        $contact = $user->contacts()->where('id', $id)->first();
        $array = [];
        $array[$contact['id']] = $contact;
        return response()->json([
            'data' => $contact
        ]);
    }
}
