<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $categoryId = $request->input('category_id');

        $categories = Category::all(); // Obtenemos todas las categorías
        $productsQuery = Product::with('category');
        if ($categoryId === 'unassigned') {
            $categoryId = null;
        }

        if ($categoryId and $categoryId !== 'unassigned') {
            $productsQuery->where('category_id', $categoryId);
        }

        $products = $productsQuery->get(); // Obtenemos los productos con su categoría

        return Inertia::render('products/index', [
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
        // Crear Producto
        $categories = Category::all();

        return Inertia::render('products/create', [
            'categories' => $categories,
            'successMessage' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Guardar el Producto nuevo
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'category_id' => $request->category_id,
        ]);

        return Redirect::route('products.create')->with('success', 'Producto creado exitosamente.');
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
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'category_id' => $request->input('category_id'),
        ]);

        return redirect()->back()->with('success', 'Producto actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Buscar el producto por su ID
        $product = Product::find($id);

        // Verificar si el producto existe
        if (! $product) {
            return redirect()->route('products.index')->with('error', 'Producto no encontrado');
        }

        // Eliminar el producto
        $product->delete();

        // Redirigir de nuevo con un mensaje de éxito
        return redirect()->route('products.index')->with('success', 'Producto eliminado con éxito');
    }
}
