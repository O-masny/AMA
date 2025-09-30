<?php
namespace App\Models;
use App\Models\ExhibitionImage;
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

    public function images()
    {
        // Pokud chceš extra obrázky jen pro výstavu (např. bannery, fotky prostoru)
        return $this->hasMany(ExhibitionImage::class)->orderBy('order');
    }
}
