<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exhibition extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'location',
        'description',
        'visitors',
    ];

    public function galleries()
    {
        return $this->belongsToMany(Gallery::class, 'exhibition_gallery')
            ->withPivot('order')
            ->orderBy('pivot_order');
    }
}

