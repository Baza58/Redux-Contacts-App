<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use Auth;

class HomeController extends Controller
{

    public function __construct() {
        return $this->middleware('auth');
    }

    public function getAuthorize() {
        return view('home');
    }

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
        
        if ($request->file !== 'undefined') {
            $file = $request->file;
            $path = '' . base_path() . '/public/pics/' . $user->id;
            $name = time() . '-' . $file->getClientOriginalName();
            $file->move($path, $name);
            $url = "/pics/" . $user->id . '/' . $name;
            $user->contacts()->create([
                'name' => $request->name,
                'number' => $request->number,
                'description' => $request->description,
                'profile-picture' => $url
            ]);
        } else {
            $db = $user->contacts()->create([
                'name' => $request->name,
                'number' => $request->number,
                'description' => $request->description,
            ]);

        }
        
        $contact = $user->contacts()->where('id', $db->id)->first();

        return response()->json([
            'data' => $contact
        ]);
    }

    public function getSingleContact($id) {
        $user = Auth::user();

        $contact = $user->contacts()->where('id', $id)->first();
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
       
        
        if ($request->file !== 'undefined' && $request->file != null) {
            $file = $request->file;
            $path = '' . base_path() . '/public/pics/' . $user->id;
            $name = time() . '-' . $file->getClientOriginalName();
            $file->move($path, $name);
            $url = "/pics/" . $user->id . '/' . $name;
            $user->contacts()->where('id', $id)->update([
                'name' => $request->name,
                'number' => $request->number,
                'description' => $request->description,
                'profile-picture' => $url
            ]);
        } else {
            $user->contacts()->where('id', $id)->update([
                'name' => $request->name,
                'number' => $request->number,
                'description' => $request->description,
            ]);
        }
        
        $contact = $user->contacts()->where('id', $id)->first();
        $array = [];
        $array[$contact['id']] = $contact;


        return response()->json([
            'data' => $contact
        ]);
    }
}
