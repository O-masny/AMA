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
        'image', // jeden obrázek = jedno dílo
        'year',
        'technique',
        'dimensions',
        'price',
        'category',
        'available',
        'story',
    ];

    protected $casts = [
        'image' => 'array', // nech to klidně tak — pokud ukládáš různé velikosti (thumb, full)
    ];

    public function exhibitions()
    {
        return $this->belongsToMany(Exhibition::class, 'exhibition_gallery')
            ->withPivot('order');
    }
}
