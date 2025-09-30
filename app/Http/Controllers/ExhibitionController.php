<?php
namespace App\Http\Controllers;

use App\Models\Exhibition;
use Inertia\Inertia;

class ExhibitionController extends Controller
{
    public function index()
    {
        $exhibitions = Exhibition::with('images')->orderBy('date', 'desc')->get();

        return Inertia::render('Exhibitions/Index', [
            'exhibitions' => $exhibitions,
        ]);
    }
}
