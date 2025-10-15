<?php
namespace App\Http\Controllers;

use App\Models\Exhibition;
use Inertia\Inertia;

class ExhibitionController extends Controller
{
    public function index()
    {
        $exhibitions = Exhibition::with('galleries')
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Exhibitions/Index', [
            'exhibitions' => $exhibitions,
        ]);
    }

    public function show($id)
    {
        $exhibition = Exhibition::with('galleries')->findOrFail($id);

        return Inertia::render('Exhibitions/Show', [
            'exhibition' => $exhibition,
        ]);
    }
}

