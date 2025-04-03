<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::updateOrCreate(['name' => 'Tecnología']);
        Category::updateOrCreate(['name' => 'Ropa']);
        Category::updateOrCreate(['name' => 'Hogar']);
        Category::updateOrCreate(['name' => 'Oficina']);
        Category::updateOrCreate(['name' => 'Juguetes']);
    }
}
