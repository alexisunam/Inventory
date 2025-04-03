import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import CategoriesTable from '@/components/categories-table';
import { Button } from '@/components/ui/button';

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
        title: 'Gestionar Categorías y Productos',
        href: '/dashboard/manage',
    },
];

// ⚡ Simulando categorías y productos para pruebas
const mockCategories = [
    {
        id: 1,
        name: 'Tecnología',
        products: [
            { id: 1, name: 'Laptop', price: 1200 },
            { id: 2, name: 'Teclado', price: 50 },
        ],
    },
    {
        id: 2,
        name: 'Ropa',
        products: [
            { id: 3, name: 'Camisa', price: 25 },
            { id: 4, name: 'Pantalón', price: 40 },
        ],
    },
    {
        id: 3,
        name: 'Libros',
        products: [],
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                {/*<div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">*/}
                {/*    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
                {/*</div>*/}

                {/* Sección para Gestionar */}
                {/*<div className="flex justify-between items-center mb-4">*/}
                {/*    <h2 className="text-2xl font-bold">Categorías y Productos</h2>*/}
                {/*    <Link href="/dashboard/manage" as="button">*/}
                {/*        <Button variant="default">Gestionar Categorías y Productos</Button>*/}
                {/*    </Link>*/}
                {/*</div>*/}

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <CategoriesTable categories={mockCategories} />
                </div>
            </div>
        </AppLayout>
    );
}
