import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Category } from '@/types/inventory/category';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout'; // Inertia.js hook para manejar el formulario
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle  } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CircleCheckBig } from 'lucide-react';

interface Props {
    categories: Category[];
    successMessage?: string | undefined;
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
    },
    {
        title: 'Crear Producto',
        href: '/manage/products/create'
    }
];


export default function CreateProduct({ categories, successMessage }: Props) {
    // Estado del formulario
    const { data, setData, processing, errors } = useForm({
        name: '',
        price: '',
        category_id: ''
    });

    const [showSuccess, setShowSuccess] = useState(true);
    const [message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    // Manejo de cambios en los inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'name' || name === 'price' || name === 'category_id'){
            setData(name, value);
        }

    };

    // Enviar el formulario
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // post('products.store', data);
        router.post(route('products.store'), data, {
            onSuccess: () => {
                setMessage('Producto creado exitosamente.');
                setData({ name: '', price: '', category_id: '' });
            },
        });
    };

    // Enviar el formulario
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //
    //     post(route('products.store'), {
    //         name,
    //         price,
    //         category_id,
    //     });
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                <h1 className="text-3xl font-bold">Crear Producto</h1>

                {showSuccess && successMessage && (
                    // <div className="text-green-500 mb-4">{successMessage}</div> // Mensaje de éxito
                    <Alert className="text-green-500 border-green-500">
                        <CircleCheckBig />
                        <AlertTitle>Producto!</AlertTitle>
                        <AlertDescription className="text-green-500">
                            {message}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* Nombre del producto */}
                    <div>
                        <Label>Nombre</Label>
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    value={data.name}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    className="w-full px-3 py-2 border rounded"*/}
                        {/*/>*/}
                        <Input
                            type="text"
                            value={data.name}
                            onChange={handleChange}
                            id="email"
                            placeholder="Nombre"
                            name="name"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>

                    {/* Precio */}
                    <div>
                        <Label>Precio</Label>
                        <Input
                            type="number"
                            value={data.price}
                            onChange={handleChange}
                            id="Precio"
                            placeholder="0.0"
                            name="price"
                        />
                        {errors.price && <div className="text-red-500">{errors.price}</div>}
                    </div>

                    {/* Categoría */}
                    <div>
                        <Label>Categoría</Label>
                        <Select value={data.category_id ?? "unassign"} onValueChange={(value) => setData('category_id', value)}>
                            <SelectTrigger className="w-full px-3 py-2 border rounded">
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unassign">Selecciona una categoría</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category_id && <div className="text-red-500">{errors.category_id}</div>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded disabled:bg-gray-400"
                        disabled={processing}
                    >
                        {processing ? 'Creando...' : 'Confirmar'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
