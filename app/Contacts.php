<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Contacts extends Model
{
	protected $fillable = ['name', 'number', 'description',  'profile-picture'];

    public function user() {
    	return $this->belongsTo('App\User');
    }
}
