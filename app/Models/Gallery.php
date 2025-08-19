<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Image;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image', // hlavní obrázek
        'year',
        'technique',
        'dimensions',
        'price',
        'category',
        'available',
        'story',
    ];


    // Vztah Many-to-Many s Tag
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'gallery_tag');
    }
}
