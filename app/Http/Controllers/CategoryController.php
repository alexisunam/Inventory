<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtenemos las categorias
        $categories = Category::with('products')->get();

        // Pasamos las categorias a la vista
        return Inertia::render('categories/index', [
            'categories' => $categories,
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
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        // Validación
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Crear la categoría
        Category::create([
            'name' => $validated['name'],
        ]);

        // Retornar una respuesta adecuada
        return redirect()->route('categories.index')->with('success', 'Categoría creada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Mostramos una categoria
        $category = Category::with('products')->findOrFail($id);
        return Inertia::render('Category/Show', [
            'category' => $category,
        ]);
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
    public function update(Request $request, Category $category)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update([
            'name' => $validated['name'],
        ]);

        return redirect()->route('categories.index')->with('success', 'Categoría actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Buscar la categoría por su ID
        $category = Category::findOrFail($id);

        // Eliminar la categoría
        $category->delete();

        // Redirigir con un mensaje de éxito
        return redirect()->route('categories.index')->with('success', 'Categoría eliminada correctamente');
    }
}
