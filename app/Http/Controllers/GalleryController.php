<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Artwork;
use App\Models\Category;

class GalleryController extends Controller
{
    public function index()
    {
        $artworks = Gallery::all();

        return Inertia::render('gallery/Index', [
            'artworks' => $artworks,
            'categories' => array_merge(['Vše'], Tag::pluck('name')->toArray()),
        ]);
    }

    public function show(Gallery $artwork)
    {
        $artworks = Gallery::all(); // nebo podle potřeby filtrovat/paginovat
        return Inertia::render('gallery/Show', [
            'artwork' => $artwork,
            'artworks' => $artworks
        ]);
    }
}
