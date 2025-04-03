import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, ArrowLeft, CirclePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Category } from '@/types/inventory/category';
import type { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    categories: Category[];
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
        title: 'Categorías',
        href: '/manage/categories'
    }
];

export default function ManageCategories({ categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal de confirmación de eliminación
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null); // ID de la categoría a eliminar

    // useForm hook para manejar el formulario
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
    });

    // Función para manejar la creación de la categoría
    const handleCreateCategory = () => {
        // Usamos post de inertia para enviar la solicitud
        post(route('categories.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false); // Cierra el modal
                reset(); // Limpia el formulario
            },
            onError: (errors) => {
                console.log(errors); // Si ocurre un error, se logean los errores
            }
        });
    };

    // Función para manejar la actualización de la categoría
    const handleUpdateCategory = () => {
        put(route('categories.update', selectedCategory?.id), {
            onSuccess: () => {
                setIsEditModalOpen(false); // Cierra el modal
                reset(); // Limpia el formulario
                setSelectedCategory(null); // Resetea la categoría seleccionada
            },
            onError: (errors) => {
                console.log(errors); // Si ocurre un error, se logean los errores
            }
        });
    };

    // Función para manejar la eliminación de la categoría
    const handleDeleteCategory = () => {
        if (categoryToDelete) {
            destroy(route('categories.destroy', categoryToDelete), {
                onSuccess: () => {
                    setIsDeleteModalOpen(false); // Cierra el modal de eliminación
                    setCategoryToDelete(null); // Resetea la categoría a eliminar
                },
                onError: (errors) => {
                    console.log(errors); // Si ocurre un error, se logean los errores
                }
            });
        }
    };

    // Cargar los datos de la categoría seleccionada cuando se abre el modal de edición
    useEffect(() => {
        if (selectedCategory) {
            setData('name', selectedCategory.name);
        }
    }, [selectedCategory]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestionar Categorías" />
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/manage">
                        <ArrowLeft size={32} className="text-gray-600 hover:text-gray-800" />
                    </Link>
                    <h1 className="text-3xl font-bold">Gestionar Categorías</h1>
                </div>
                <div className="overflow-x-auto mt-6">
                    <Button
                        className="mb-4"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                       <CirclePlus /> Crear Categoría
                    </Button>
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map(category => (
                                <TableRow key={category.id} className="cursor-pointer" onClick={() => {
                                    setSelectedCategory(category)
                                    setIsEditModalOpen(true)
                                }}>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => setSelectedCategory(category)}>
                                            <Pencil size={16} />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEditModalOpen(false);
                                                setCategoryToDelete(category.id);
                                                setIsDeleteModalOpen(true);  // Abre el modal de confirmación
                                            }}
                                        >
                                            <Trash size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Modal de Creación */}
            <Dialog open={isCreateModalOpen} onOpenChange={() => setIsCreateModalOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Categoría</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Label >
                            <span className="text-gray-700">Nombre</span>
                            <Input
                                type="text"
                                value={data.name}
                                name="name"
                                onChange={(e) => setData('name', e.target.value)} // Usamos setData para manejar el estado
                                placeholder="Nombre de la categoría"

                            />
                        </Label>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsCreateModalOpen(false)}>Cancelar</Button>
                        <Button
                            onClick={handleCreateCategory}
                            disabled={processing}
                        >
                            {processing ? 'Creando...' : 'Crear'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal de Edición */}
            {selectedCategory && (
                <Dialog open={isEditModalOpen} onOpenChange={() => setIsEditModalOpen(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Categoría</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Label className="block">
                                <span className="text-gray-700">Nombre</span>
                                <Input
                                    type="text"
                                    value={data.name}
                                    name="name"
                                    onChange={(e) => setData('name', e.target.value)} // Usamos setData para manejar el estado
                                    placeholder="Nombre de la categoría"
                                />
                            </Label>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
                            <Button
                                onClick={handleUpdateCategory}
                                disabled={processing}
                            >
                                {processing ? 'Actualizando...' : 'Actualizar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Modal de Confirmación de Eliminación */}
            {categoryToDelete && (
                <Dialog open={isDeleteModalOpen} onOpenChange={() => setIsDeleteModalOpen(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>¿Estás seguro de que quieres eliminar esta categoría?</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteCategory}
                                disabled={processing}
                            >
                                {processing ? 'Eliminando...' : 'Eliminar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

        </AppLayout>
    );
}

