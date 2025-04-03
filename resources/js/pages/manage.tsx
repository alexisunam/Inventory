import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ManageCard from '@/components/manage-card';
import { ShoppingCart, Tag } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gestionar Categorías y Productos',
        href: '/manage',
    },
];

export default function Manage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-3xl font-bold">Gestionar</h1>
                <p className="text-neutral-600 dark:text-neutral-300">Aquí puedes agregar, editar o eliminar categorías y productos.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <ManageCard title="Categorias" link="/manage/categories" icon={<Tag size={24}/>} />

                    <ManageCard title="Productos" link="/manage/products" icon={<ShoppingCart size={24}/>} />
                </div>

            </div>
        </AppLayout>
    );
}
