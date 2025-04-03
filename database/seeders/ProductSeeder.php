<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        $electronics = Category::where('name', 'Tecnología')->first();
//        Product::create(['name' => 'Tablet Samsung y', 'price' => '499.99', 'category_id' => $electronics->id]);
        $electronics = Category::where('name', 'Tecnología')->first();
        $clothing = Category::where('name', 'Ropa')->first();
        $home = Category::where('name', 'Hogar')->first();
        $office = Category::where('name', 'Oficina')->first();

        Product::updateOrCreate(
            ['name' => 'Tablet Samsung Y', 'category_id' => $electronics->id],
            ['price' => '499.99']
        );

        Product::updateOrCreate(
            ['name' => 'Laptop Asus Pro', 'category_id' => $electronics->id],
            ['price' => '899.99']
        );

        Product::updateOrCreate(
            ['name' => 'Samsung Galaxy s25', 'category_id' => $electronics->id],
            ['price' => '1100.99']
        );

        Product::updateOrCreate(
            ['name' => 'Iphone 16', 'category_id' => $electronics->id],
            ['price' => '1200.99']
        );

        Product::updateOrCreate(
            ['name' => 'Camiseta Nike', 'category_id' => $clothing->id],
            ['price' => '29.99']
        );

        Product::updateOrCreate(
            ['name' => 'Tenis Adidas', 'category_id' => $clothing->id],
            ['price' => '26.99']
        );

        Product::updateOrCreate(
            ['name' => 'Chamarra de cuero', 'category_id' => $clothing->id],
            ['price' => '38.99']
        );

        Product::updateOrCreate(
            ['name' => 'Traje de buzo', 'category_id' => $clothing->id],
            ['price' => '49.99']
        );

        Product::updateOrCreate(
            ['name' => 'Gabardina', 'category_id' => $clothing->id],
            ['price' => '33.99']
        );

        Product::updateOrCreate(
            ['name' => 'Casco de futbol americano', 'category_id' => $clothing->id],
            ['price' => '18.99']
        );

        Product::updateOrCreate(
            ['name' => 'Chamarra de invierno', 'category_id' => $clothing->id],
            ['price' => '26.99']
        );

        Product::updateOrCreate(
            ['name' => 'Sofá Reclinable', 'category_id' => $home->id],
            ['price' => '399.99']
        );

        Product::updateOrCreate(
            ['name' => 'Lavadora', 'category_id' => $home->id],
            ['price' => '499.99']
        );

        Product::updateOrCreate(
            ['name' => 'Microondas', 'category_id' => $home->id],
            ['price' => '199.99']
        );

        Product::updateOrCreate(
            ['name' => 'Televisión', 'category_id' => $home->id],
            ['price' => '599.99']
        );

        Product::updateOrCreate(
            ['name' => 'Secadora', 'category_id' => $home->id],
            ['price' => '99.99']
        );

        Product::updateOrCreate(
            ['name' => 'Cama', 'category_id' => $home->id],
            ['price' => '199.99']
        );

        Product::updateOrCreate(
            ['name' => 'Escritorio', 'category_id' => $office->id],
            ['price' => '399.89']
        );

        Product::updateOrCreate(
            ['name' => 'Silla reclinable', 'category_id' => $office->id],
            ['price' => '99.79']
        );

        Product::updateOrCreate(
            ['name' => 'Folders', 'category_id' => $office->id],
            ['price' => '19.99']
        );

        Product::updateOrCreate(
            ['name' => 'Mesa de juntas', 'category_id' => $office->id],
            ['price' => '599.99']
        );
    }
}
