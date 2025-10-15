<?php
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ExhibitionController;
use App\Http\Controllers\GalleryController;
use App\Models\Exhibition;
use App\Models\Gallery;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $artworks = Gallery::latest()->take(6)->get();
    $exhibitions = Exhibition::with('galleries')->orderBy('date', 'desc')->get();

    return Inertia::render('index', [
        'artworks' => $artworks,
        'exhibitions' => $exhibitions,
    ]);
})->name('home');

Route::get('/exhibitions', [ExhibitionController::class, 'index'])->name('exhibitions.index');

Route::get('/exhibitions/{exhibition}', function (App\Models\Exhibition $exhibition) {
    $exhibition->load('galleries');
    return Inertia::render('Exhibitions/Show', [
        'exhibition' => $exhibition,
    ]);
});

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{artwork}', [GalleryController::class, 'show'])->name('gallery.show');
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');

require __DIR__ . '/settings.php';
