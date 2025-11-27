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
        // Determine previous and next artwork based on created_at desc ordering
        $ordered = Gallery::orderBy('created_at', 'desc')->pluck('id')->toArray();
        $index = array_search($artwork->id, $ordered, true);

        $prevId = null;
        $nextId = null;

        if ($index !== false) {
            $prevId = $ordered[$index - 1] ?? null;
            $nextId = $ordered[$index + 1] ?? null;
        }

        $previous = $prevId ? Gallery::find($prevId) : null;
        $next = $nextId ? Gallery::find($nextId) : null;

        return Inertia::render('gallery/Show', [
            'artwork' => $artwork,
            'previousArtwork' => $previous,
            'nextArtwork' => $next,
        ]);
    }

    // JSON endpoint for incremental "load more" (server-side pagination)
    public function more(Request $request)
    {
        $perPage = $request->input('perPage', 12);
        $page = max(1, (int) $request->input('page', 1));
        $category = $request->input('category', 'Vše');

        $query = Gallery::query();
        if ($category && $category !== 'Vše') {
            $query->where('category', $category);
        }

        $paginator = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'items' => $paginator->items(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }
}
