<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['fname', 'lname', 'note', 'imgpath'];


    public function role(){
        return $this->hasMany(Role::class);
    }
}
