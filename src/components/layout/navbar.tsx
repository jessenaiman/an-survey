"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchCommand } from "@/components/ui/SearchCommand";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

interface NavbarProps {
    searchItems: any[];
}

export function Navbar({ searchItems }: NavbarProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/product-list" },
        { name: "Services", href: "/service" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out border-b",
                    isScrolled
                        ? "bg-background/95 backdrop-blur-md py-3 shadow-sm border-border"
                        : "bg-background/80 backdrop-blur-md py-5 border-transparent"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg shadow-lg group-hover:shadow-blue-500/25 transition-all">
                            <Image
                                src="/logo.png"
                                alt="A.N. Survey Logo"
                                fill
                                className="object-cover bg-white p-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg leading-tight tracking-tight text-foreground transition-colors">
                                Survey Instrument
                            </span>
                            <span className="text-[10px] tracking-wider uppercase font-medium text-muted-foreground transition-colors">
                                Sales & Repair
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border backdrop-blur-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-5 py-2 text-sm font-medium rounded-full transition-all",
                                    "px-5 py-2 text-sm font-medium rounded-full transition-all text-muted-foreground hover:text-primary hover:bg-background"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-4 mr-4 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <a href="tel:905-841-0119" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                                <Phone className="w-3.5 h-3.5" /> 905-841-0119
                            </a>
                            <Link href="/contact" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                                <Mail className="w-3.5 h-3.5" /> Email Us
                            </Link>
                        </div>

                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors border text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 border-border"
                        >
                            <Search className="w-4 h-4" />
                            <span className="hidden sm:inline">Search...</span>
                            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </button>

                        <button
                            className="md:hidden p-2 transition-colors text-foreground"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                    <AnimatedThemeToggler />
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-3 text-base font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.header>

            <SearchCommand
                items={searchItems}
                open={searchOpen}
                onOpenChange={setSearchOpen}
            />
        </>
    );
}
