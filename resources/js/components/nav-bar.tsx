
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppearanceToggleTab from '@/components/appearance-tabs';

export function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const auth = usePage().props.auth;

    return (
        <header className="shadow-md py-4 px-6">
            <nav className="flex items-center justify-between max-w-screen-xl mx-auto">
                {/* Logo */}
                <div className="text-2xl font-semibold ">
                    <Link href="/">Inventory</Link>
                </div>

                {/* Botón de menú en dispositivos pequeños */}
                <button
                    className="lg:hidden focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Enlaces de navegación */}
                <div
                    className={`flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-black lg:flex lg:space-x-8 flex-col lg:flex-row absolute lg:relative w-full lg:w-auto top-16 left-0 lg:top-0 shadow-lg lg:shadow-none`}
                >
                    <Link
                        href="/"
                        className="transition duration-300 py-2 px-4"
                    >
                        Home
                    </Link>

                    {/* Condición para mostrar enlaces según autenticación */}
                    {!auth.user ? (
                        <>
                            <Link
                                href={route('login')}
                                className="transition duration-300 py-2 px-4"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="transition duration-300 py-2 px-4"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={route('dashboard')}
                                className="transition duration-300 py-2 px-4"
                            >
                                Dashboard
                            </Link>
                        </>
                    )}
                    {/*<AppearanceToggleDropdown className="py-2 px-4" />*/}
                    <AppearanceToggleTab className="py-2 px-4" />
                </div>
            </nav>
        </header>
    );
}

