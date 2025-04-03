// import AppLayout from '@/layouts/app-layout';
// import { Head, Link } from '@inertiajs/react';
// import { useState } from 'react';
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Pencil, Trash, ArrowLeft, CirclePlus } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Product } from '@/types/inventory/product';
// import { Category } from '@/types/inventory/category';
// import type { BreadcrumbItem } from '@/types';
//
// interface Props {
//     products: Product[];
//     categories: Category[];
//     selectedCategory: string;
// }
//
// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Home',
//         href: '/'
//     },
//     {
//         title: 'Dashboard',
//         href: '/dashboard',
//     },
//     {
//         title: 'Gestionar',
//         href: '/dashboard/manage',
//     },
//     {
//         title: 'Productos',
//         href: '/manage/products'
//     }
// ];
//
//
// export default function ManageCategories({ products, categories, selectedCategory }: Props) {
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Gestionar Productos" />
//             <div className="p-6">
//                 <div className="flex items-center gap-4">
//                     <Link href="/dashboard/manage">
//                         <ArrowLeft size={32} className="text-gray-600 hover:text-gray-800" />
//                     </Link>
//                     <h1 className="text-3xl font-bold">Gestionar Productos</h1>
//                 </div>
//                 <div className="overflow-x-auto mt-6">
//                     <Button
//                         className="mb-4"
//                         onClick={() => {/* Lógica para abrir el modal de creación de categoría */}}
//                     >
//                         <CirclePlus /> Crear Producto
//                     </Button>
//                     <Table className="mt-4">
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>ID</TableHead>
//                                 <TableHead>Nombre</TableHead>
//                                 <TableHead>Categoría</TableHead>
//                                 <TableHead>Precio</TableHead>
//                                 <TableHead>Acciones</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {products.map(product => (
//                                 <TableRow key={product.id} className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
//                                     <TableCell>{product.id}</TableCell>
//                                     <TableCell>{product.name}</TableCell>
//                                     <TableCell>{product.category.name}</TableCell>
//                                     <TableCell>{product.price}</TableCell>
//                                     <TableCell className="flex gap-2">
//                                         <Button variant="outline" size="icon" onClick={() => setSelectedProduct(product)}>
//                                             <Pencil size={16} />
//                                         </Button>
//                                         <Button variant="destructive" size="icon">
//                                             <Trash size={16} />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>
//             </div>
//
//             {/* Modal de Edición */}
//             {selectedProduct && (
//                 <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Editar Categoría</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                             <label className="block">
//                                 <span className="text-gray-700">Nombre</span>
//                                 <input
//                                     type="text"
//                                     value={selectedProduct.name}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
//                                 />
//                             </label>
//                             <label>
//                                 <span className="text-gray-700">Precio</span>
//                                 <input
//                                     type="text"
//                                     value={selectedProduct.price}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
//                                 />
//                             </label>
//                         </div>
//                         <DialogFooter>
//                             <Button onClick={() => setSelectedProduct(null)}>Guardar</Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </AppLayout>
//     );
// }
//
//
// import { useState } from 'react';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { ArrowLeft, CirclePlus, Pencil, PlusCircle, Trash } from 'lucide-react';
// import AppLayout from '@/layouts/app-layout';
// import { Head, Link, useForm, router } from '@inertiajs/react';
// import { Button } from '@/components/ui/button';
// import { Product } from '@/types/inventory/product';
// import { Category } from '@/types/inventory/category';
// import { BreadcrumbItem } from '@/types';
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
//
//
// interface Props {
//     products: Product[];
//     categories: Category[];
//     selectedCategory: string;
// }
//
// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Home',
//         href: '/'
//     },
//     {
//         title: 'Dashboard',
//         href: '/dashboard',
//     },
//     {
//         title: 'Gestionar',
//         href: '/dashboard/manage',
//     },
//     {
//         title: 'Productos',
//         href: '/manage/products'
//     }
// ];
//
// export default function ManageProducts({ products, categories, selectedCategory }: Props) {
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//     const [editedProduct, setEditedProduct] = useState<Product | null>(null);
//     const [filterCategory, setFilterCategory] = useState<string>(selectedCategory || '');
//     // const filteredProducts = filterCategory
//     //     ? products.filter((product) => product.category.id.toString() === filterCategory)
//     //     : products;
//     const filteredProducts = filterCategory === 'all' || !filterCategory
//         ? products
//         : products.filter((product) => product.category.id.toString() === filterCategory);
//
//     const handleOpenModal = (product: Product) => {
//         setSelectedProduct(product);
//         setEditedProduct({ ...product });
//     };
//
//     const { data, setData, put, processing } = useForm({
//         id: selectedProduct?.id || "",
//         name: selectedProduct?.name || "",
//         price: selectedProduct?.price || "",
//         category_id: selectedProduct?.category?.id || ""
//     });
//
//     const handleUpdateProduct = () => {
//         put(`/manage/products/${data.id}/update`, {
//             preserveScroll: true,
//             onSuccess: () => setSelectedProduct(null),
//             onError: (errors) => console.error("Errores:", errors)
//         });
//     };
//
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Gestionar Productos" />
//             <div className="p-6">
//                 <div className="flex items-center gap-4">
//                     <Link href="/dashboard/manage">
//                         <ArrowLeft size={32} className="text-gray-600 hover:text-gray-800" />
//                     </Link>
//                     <h1 className="text-3xl font-bold">Gestionar Productos</h1>
//                 </div>
//
//                 {/* Filtro por Categoría */}
//                 <div className="flex items-center gap-4 mt-6">
//                     <span className="text-gray-700">Filtrar por Categoría:</span>
//                     <Select value={filterCategory ?? "all"} onValueChange={setFilterCategory}>
//                         <SelectTrigger className="w-60">
//                             <SelectValue placeholder="Todas las categorías" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">Todas las categorías</SelectItem>
//                             {categories.map((category) => (
//                                 <SelectItem key={category.id} value={category.id.toString()}>
//                                     {category.name}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>
//
//                 {/* Tabla de Productos */}
//                 <div className="overflow-x-auto mt-6">
//                     <Button className="mb-4 flex items-center gap-2 md:w-1/5 lg:w-1/5" asChild>
//                         <Link href="/manage/products/create">
//                             <CirclePlus size={20} />
//                             Crear Producto
//                         </Link>
//                     </Button>
//                     <Table className="mt-4">
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>ID</TableHead>
//                                 <TableHead>Nombre</TableHead>
//                                 <TableHead>Categoría</TableHead>
//                                 <TableHead>Precio</TableHead>
//                                 <TableHead>Acciones</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {filteredProducts.map((product) => (
//                                 <TableRow key={product.id} className="cursor-pointer" onClick={() => handleOpenModal(product)}>
//                                     <TableCell>{product.id}</TableCell>
//                                     <TableCell>{product.name}</TableCell>
//                                     <TableCell>{product.category.name}</TableCell>
//                                     <TableCell>${product.price}</TableCell>
//                                     <TableCell className="flex gap-2">
//                                         <Button variant="outline" size="icon" onClick={() => handleOpenModal(product)}>
//                                             <Pencil size={16} />
//                                         </Button>
//                                         <Button variant="destructive" size="icon">
//                                             <Trash size={16} />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>
//             </div>
//
//             {/* Modal de Edición */}
//             {selectedProduct && (
//                 <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Editar Producto</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                             <label className="block">
//                                 <span className="text-gray-700">Nombre</span>
//                                 <Input
//                                     type="text"
//                                     value={selectedProduct.name}
//                                     onChange={(e) => setEditedProduct({
//                                         ...editedProduct,
//                                         name: e.target.value
//                                     } as Product)}
//                                 />
//                             </label>
//                             <label className="block">
//                                 <span className="text-gray-700">Precio</span>
//                                 <Input
//                                     type="number"
//                                     value={selectedProduct.price}
//                                     onChange={(e) => setEditedProduct({
//                                         ...editedProduct,
//                                         price: parseFloat(e.target.value) || 0
//                                     } as Product)}
//                                 />
//                             </label>
//                             <label className="block">
//                                 <span className="text-gray-700">Categoría</span>
//                                 <div className="flex items-center gap-2">
//                                     <Select
//                                         value={editedProduct?.category.id.toString()}
//                                         onValueChange={(value) =>
//                                             setEditedProduct({
//                                                 ...editedProduct,
//                                                 category: { ...editedProduct?.category, id: parseInt(value) }
//                                             } as Product)
//                                         }
//                                     >
//                                     {/*<Select defaultValue={selectedProduct?.category?.id.toString() ? selectedProduct.category.id.toString() : ""}>*/}
//                                         <SelectTrigger className="w-full">
//                                             <SelectValue placeholder="Selecciona una categoría" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {/*<SelectItem value="">Selecciona una categoría</SelectItem>*/}
//                                             {/*{categories.map((category) => (*/}
//                                             {/*    <SelectItem key={category.id} value={category.id.toString()}>*/}
//                                             {/*        {category.name}*/}
//                                             {/*    </SelectItem>*/}
//                                             {/*))}*/}
//
//                                             {categories?.length > 0 ? (
//                                                 categories.map((category) => (
//                                                     <SelectItem key={category.id} value={category.id.toString()}>
//                                                         {category.name}
//                                                     </SelectItem>
//                                                 ))
//                                             ) : (
//                                                 <SelectItem disabled value="">
//                                                     No hay categorías disponibles
//                                                 </SelectItem>
//                                             )}
//                                         </SelectContent>
//                                     </Select>
//                                     <Button variant="outline" size="icon" className="ml-2">
//                                         <PlusCircle size={20} />
//                                     </Button>
//                                 </div>
//                             </label>
//                         </div>
//                         <DialogFooter>
//                             <Button onClick={() => setSelectedProduct(null)}>Guardar</Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </AppLayout>
//     );
// }
//



import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CirclePlus, Pencil, PlusCircle, Trash } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/inventory/product';
import { Category } from '@/types/inventory/category';
import { BreadcrumbItem } from '@/types';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';


interface Props {
    products: Product[];
    categories: Category[];
    selectedCategory: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestionar',
        href: '/dashboard/manage',
    },
    {
        title: 'Productos',
        href: '/manage/products'
    }
];

export default function ManageProducts({ products, categories, selectedCategory }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>(selectedCategory || '');

    const filteredProducts = filterCategory === 'all' || !filterCategory
        ? products
        : products.filter((product) => product.category.id.toString() === filterCategory);

    const { data, setData, put, processing } = useForm({
        id: selectedProduct?.id || "",
        name: selectedProduct?.name || "",
        price: selectedProduct?.price || "",
        category_id: selectedProduct?.category?.id || ""
    });

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        // setEditedProduct({ ...product });
        setData({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            category_id: product.category.id.toString(),
        })
    };

    const handleUpdateProduct = () => {
        put(`/manage/products/${data.id}`, {
            preserveScroll: true,
            onSuccess: () => setSelectedProduct(null),
            onError: (errors) => console.error("Errores:", errors)
        });
    };

    // Nuevo codigo

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const { delete: destroy } = useForm();

    const handleOpenDeleteDialog = (product: Product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const handleDeleteProduct = () => {
        if (!productToDelete) return;

        if (selectedProduct) {

            setSelectedProduct(null);

            destroy(`/manage/products/${productToDelete.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setProductToDelete(null);
                },
                onError: (errors) => console.error("Error al eliminar:", errors)
            });
        }

    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestionar Productos" />
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/manage">
                        <ArrowLeft size={32} className="text-gray-600 hover:text-gray-800" />
                    </Link>
                    <h1 className="text-3xl font-bold">Gestionar Productos</h1>
                </div>

                {/* Filtro por Categoría */}
                <div className="flex items-center gap-4 mt-6">
                    <span className="text-gray-700">Filtrar por Categoría:</span>
                    <Select value={filterCategory ?? "all"} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las categorías</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tabla de Productos */}
                <div className="overflow-x-auto mt-6">
                    <Button className="mb-4 flex items-center gap-2 md:w-1/5 lg:w-1/5" asChild>
                        <Link href="/manage/products/create">
                            <CirclePlus size={20} />
                            Crear Producto
                        </Link>
                    </Button>
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id} className="cursor-pointer" onClick={() => handleOpenModal(product)}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category.name}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleOpenModal(product)}>
                                            <Pencil size={16} />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleOpenDeleteDialog(product)}>
                                            <Trash size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Modal de Edición */}
            {selectedProduct && (
                <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Producto</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-gray-700">Nombre</span>
                                <Input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Precio</span>
                                <Input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Categoría</span>
                                <div className="flex items-center gap-2">
                                    <Select
                                        value={data.category_id.toString()}
                                        onValueChange={(value) => setData("category_id", value)}
                                    >
                                        {/*<Select defaultValue={selectedProduct?.category?.id.toString() ? selectedProduct.category.id.toString() : ""}>*/}
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona una categoría" />
                                        </SelectTrigger>
                                        <SelectContent>

                                            {categories?.length > 0 ? (
                                                categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem disabled value="">
                                                    No hay categorías disponibles
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" size="icon" className="ml-2">
                                        <PlusCircle size={20} />
                                    </Button>
                                </div>
                            </label>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleUpdateProduct} disabled={processing}>
                                {processing ? "Guardando..." : "Guardar"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Nuevo dialogo */}

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminar Producto</DialogTitle>
                    </DialogHeader>
                    <p>¿Estás seguro de que deseas eliminar <strong>{productToDelete?.name}</strong>?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
                        <Button variant="destructive" onClick={handleDeleteProduct}>Eliminar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </AppLayout>
    );
}

