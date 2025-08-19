<?php

use App\Http\Controllers\GalleryController;
use App\Models\Gallery;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $featuredArtworks = Gallery::latest()->take(6)->get();
    return Inertia::render('index', [
        'featuredArtworks' => $featuredArtworks
    ]);
})->name('home');


Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{artwork}', [GalleryController::class, 'show'])->name('gallery.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
