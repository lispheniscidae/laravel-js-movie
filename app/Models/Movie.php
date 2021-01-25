<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['title', 'description', 'release', 'genre_id' , 'producer_id'];


    public function producer()
    {
        return $this->belongsTo(Producer::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

}
