// src/components/ManageCard.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react'; // Usando Link de InertiaJS para la navegación

interface ManageCardProps {
    title: string;
    link: string;
    icon: React.ReactNode;
}

const ManageCard: React.FC<ManageCardProps> = ({ title, link, icon }) => {
    return (
        <div className="max-w-sm w-full p-4">
            <Link
                href={link}
                className="block w-full  rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
                <Card className="w-full rounded-lg">
                    {/* Icono */}
                    <CardHeader className="flex justify-center">
                        {icon}
                    </CardHeader>

                    {/* Título */}
                    <CardContent className="flex flex-col items-center justify-center">
                        <span className="text-xl font-semibold">{title}</span>
                    </CardContent>

                </Card>
            </Link>
        </div>
    );
}

export default ManageCard;
