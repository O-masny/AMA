<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::get('/api/gallery', function (Request $request) {
    $query = \App\Models\Gallery::query()->with('tags');

    if ($request->has('tag')) {
        $query->whereHas('tags', fn($q) => $q->where('id', $request->tag));
    }

    return Inertia::render('gallery/Index', [
        'galleries' => $query->get()
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
