<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
use App\Models\Gallery;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $artworks = Gallery::latest()->take(6)->get();
    return Inertia::render('index', [
        'artworks' => $artworks
    ]);
})->name('home');


Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{artwork}', [GalleryController::class, 'show'])->name('gallery.show');
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');

require __DIR__ . '/settings.php';
