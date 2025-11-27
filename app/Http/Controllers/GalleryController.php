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
    public function index(Request $request)
    {
        $perPage = 12;
        $category = $request->input('category', 'Vše');

        $query = Gallery::query();
        if ($category && $category !== 'Vše') {
            $query->where('category', $category);
        }

        $paginator = $query->orderBy('created_at', 'desc')->paginate($perPage)->withQueryString();

        return Inertia::render('gallery/Index', [
            'artworks' => $paginator->items(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'total' => $paginator->total(),
            ],
            'categories' => array_merge(['Vše'], Tag::pluck('name')->toArray()),
            'selectedCategory' => $category,
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
