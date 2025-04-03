import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types/inventory/product';
import { Category } from '@/types/inventory/category';


interface CategoriesTableProps {
    categories: Category[];
}


export default function CategoriesTable({ categories }: CategoriesTableProps) {
    return (
        <div className="rounded-xl border bg-white shadow-sm dark:bg-neutral-900">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre de Categoría</TableHead>
                        <TableHead>Productos</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                {category.products.length > 0 ? (
                                    <ul className="list-disc pl-4">
                                        {category.products.map((product) => (
                                            <li key={product.id}>
                                                {product.name} - ${product.price}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-sm text-gray-500">Sin productos</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
