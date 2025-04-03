// // resources/js/Pages/Home.tsx

import { Head } from '@inertiajs/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { NavBar } from '@/components/nav-bar';
import { Category } from '@/types/inventory/category';
import { Product } from '@/types/inventory/product';
import { router } from '@inertiajs/react';
import { AppHeader } from '@/components/app-header'; // Importar el router correctamente

interface Props {
    products: Product[];
    categories: Category[];
    selectedCategory: string;
}

export default function Home({ categories, products, selectedCategory }: Props) {
    const [filteredCategory, setFilteredCategory] = useState<string>(selectedCategory);

    const filteredProducts = filteredCategory
        ? products.filter((product: Product) => product.category.id.toString() === filteredCategory)
        : products;

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCategoryId = e.target.value;
        console.log(newCategoryId);
        setFilteredCategory(newCategoryId);

        router.visit('/', {
            method: 'get',
            data: { category_id: newCategoryId },
            only: ['products'],
            preserveState: true,
        });
    };

    return (
        <>
            <Head title="Inicio" />
            <NavBar />
            {/*<AppHeader/>*/}
            <div className="flex flex-col items-center justify-center p-6 mt-6">
                <h1 className="text-4xl font-bold">Listado de Productos</h1>
                <p className="text-xl mt-4">Selecciona una categoría para filtrar los productos.</p>

                {/* Filtro por Categoría */}
                <div className="my-4 w-full max-w-xs">
                    <select
                        className="w-full p-2 border rounded-md"
                        value={filteredCategory ?? ""}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tabla de Productos */}
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Producto</th>
                            <th className="px-4 py-2 border border-gray-300">Categoría</th>
                            <th className="px-4 py-2 border border-gray-300">Precio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product: Product) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-2 border border-gray-300">{product.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">{product.category?.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">${product.price}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="border p-2 text-center">
                                    No hay productos
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


