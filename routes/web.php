<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//    return Inertia::render('welcome');
// })->name('home');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Ruta para gestionar categorías y productos en el dashboard
    Route::get('dashboard/manage', function () {
        return Inertia::render('manage');
    })->name('manage');

    // Rutas de recursos para categorías y productos
    Route::resource('manage/categories', CategoryController::class);
    Route::resource('manage/products', ProductController::class);

});

// Ruta para gestionar categorías y productos
// Route::get('categories', function () {
//    return Inertia::render('categories/manage-categories');
// })->name('categories.manage');

// Otras rutas para categorías y productos
// Route::resource('categories', CategoryController::class);
// Route::resource('products', ProductController::class);

// Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
// Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
