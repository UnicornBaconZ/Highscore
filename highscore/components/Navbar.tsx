"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


type NavLink = {
    href: string;
    label: string;
};

const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-sm font-bold text-slate-950">
                        ZV
                    </div>
                    <span className="hidden text-sm font-semibold tracking-tight text-slate-100 sm:inline">
            Zarin Vansteelandt
          </span>
                </Link>
                <ul className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname?.startsWith(link.href);

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={[
                                        "transition-colors hover:text-sky-400",
                                        isActive ? "text-sky-400" : "text-slate-300",
                                    ].join(" ")}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-slate-700 px-2 py-1 text-slate-200 hover:bg-slate-800 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span className="sr-only">Open main menu</span>
                    <div className="space-y-1">
                        <span
                            className={`block h-1 w-5 bg-current transition-transform bg-yellow-600 rounded-t-lg ${
                                isOpen ? "translate-y-1.5 rotate-45" : ""
                            }`}
                        />
                        <span
                            className={`block h-1 w-5 bg-current transition-opacity bg-rose-700 rounded-lg ${
                                isOpen ? "opacity-0" : "opacity-100"
                            }`}
                        />
                        <span
                            className={`block h-1 w-5 bg-current transition-transform bg-yellow-600 rounded-b-sm ${
                                isOpen ? "-translate-y-1.5 -rotate-45" : ""
                            }`}
                        />
                    </div>
                </button>
            </nav>

            {isOpen && (
                <div className="border-t border-slate-800 bg-slate-950 md:hidden">
                    <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-2 text-sm font-medium text-slate-200">
                        {navLinks.map((link) => {
                            const isActive =
                                link.href === "/"
                                    ? pathname === "/"
                                    : pathname?.startsWith(link.href);

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={[
                                            "block rounded-md px-2 py-2 transition-colors",
                                            isActive
                                                ? "bg-slate-800 text-sky-400"
                                                : "hover:bg-slate-900",
                                        ].join(" ")}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </header>
    );
}