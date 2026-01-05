"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, SlidersHorizontal, ArrowRight, Package, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SearchItem {
    slug: string;
    title: string;
    brand: string;
    type: string;
    [key: string]: any;
}

interface SearchCommandProps {
    items: SearchItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ items, open, onOpenChange }: SearchCommandProps) {
    const router = useRouter();
    const [query, setQuery] = React.useState("");
    const [activeFilter, setActiveFilter] = React.useState<"all" | "brand" | "type">("all");
    const [filterValue, setFilterValue] = React.useState<string | null>(null);

    // Extract unique brands and types
    const brands = Array.from(new Set(items.map((item) => item.brand || "Other"))).filter(Boolean);
    const types = Array.from(new Set(items.map((item) => item.type || "Other"))).filter(Boolean);

    const filteredItems = React.useMemo(() => {
        let result = items;
        if (activeFilter === "brand" && filterValue) {
            result = items.filter((item) => item.brand === filterValue);
        } else if (activeFilter === "type" && filterValue) {
            result = items.filter((item) => item.type === filterValue);
        }

        if (query) {
            const lowerQuery = query.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(lowerQuery) ||
                item.brand.toLowerCase().includes(lowerQuery) ||
                item.type.toLowerCase().includes(lowerQuery) ||
                (item.tags && Array.isArray(item.tags) && item.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery)))
            );
        }
        return result;
    }, [items, activeFilter, filterValue, query]);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onOpenChange]);

    const resetFilters = () => {
        setActiveFilter("all");
        setFilterValue(null);
        setQuery("");
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-white/80 dark:bg-zinc-900/80 shadow-2xl backdrop-blur-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Command
                            className="w-full"
                            label="Global Search"
                            shouldFilter={false} // We handle filtering manually
                        >
                            <div className="flex items-center border-b border-black/5 px-4" cmdk-input-wrapper="">
                                <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
                                <Command.Input
                                    value={query}
                                    onValueChange={setQuery}
                                    placeholder={
                                        activeFilter !== "all"
                                            ? `Searching in ${filterValue}...`
                                            : "Search equipment, brands..."
                                    }
                                    className="flex h-12 w-full bg-transparent py-3 text-lg outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {activeFilter !== "all" && (
                                    <button
                                        onClick={resetFilters}
                                        className="text-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-2 py-1 rounded transition-colors"
                                    >
                                        Clear Filter
                                    </button>
                                )}
                            </div>

                            <div className="flex space-x-2 p-2 border-b border-black/5 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <span className="text-xs font-medium text-zinc-500 flex items-center px-2">
                                    <SlidersHorizontal className="w-3 h-3 mr-1" /> Filters:
                                </span>
                                {brands.slice(0, 4).map(brand => (
                                    <button
                                        key={brand}
                                        onClick={() => { setActiveFilter("brand"); setFilterValue(brand); }}
                                        className={cn(
                                            "text-xs px-2 py-1 rounded-full border transition-all",
                                            activeFilter === "brand" && filterValue === brand
                                                ? "bg-black text-white border-black"
                                                : "bg-white border-zinc-200 hover:border-zinc-400"
                                        )}
                                    >
                                        {brand}
                                    </button>
                                ))}
                                {types.slice(0, 3).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => { setActiveFilter("type"); setFilterValue(type); }}
                                        className={cn(
                                            "text-xs px-2 py-1 rounded-full border transition-all",
                                            activeFilter === "type" && filterValue === type
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white border-zinc-200 hover:border-zinc-400"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <Command.List className="max-h-[60vh] overflow-y-auto p-2 scroll-py-2">
                                <Command.Empty className="py-6 text-center text-sm text-zinc-500">
                                    No results found.
                                </Command.Empty>

                                {filteredItems.map((item) => (
                                    <Command.Item
                                        key={item.slug}
                                        onSelect={() => {
                                            onOpenChange(false);
                                            router.push(`/content/${item.slug}`);
                                        }}
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800 cursor-pointer transition-colors group"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 group-aria-selected:bg-white border border-zinc-200">
                                            {item.type === "Laser Level" ? <Tag className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</span>
                                            <div className="flex gap-2 text-xs text-zinc-500">
                                                <span className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{item.brand}</span>
                                                <span>•</span>
                                                <span>{item.type}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-aria-selected:opacity-100 group-aria-selected:translate-x-0 transition-all duration-200" />
                                    </Command.Item>
                                ))}
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
