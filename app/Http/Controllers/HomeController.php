<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Obtener todas las categorías y productos
        $categoryId = $request->input('category_id');

        //        $productsQuery = Product::query();
        $productsQuery = Product::with('category');

        if ($categoryId) {
            $productsQuery->where('category_id', $categoryId);

        }

        $products = $productsQuery->get();

        $categories = Category::all();

        return Inertia::render('home', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $categoryId,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
