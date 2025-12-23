"use client";

import Link from "next/link";
import * as React from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface NavItem {
    title: string;
    href: string;
    items?: NavItem[];
}

export function Navbar() {
    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-bold">
                        <span className="hidden font-bold sm:inline-block font-heading text-xl">
                            {siteConfig.name}
                        </span>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {siteConfig.mainNav.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.items ? (
                                        <>
                                            <NavigationMenuTrigger className="font-medium bg-transparent">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                    <div className="row-span-3">
                                                        <Link
                                                            href={item.href}
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        >
                                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                                {item.title}
                                                            </div>
                                                            <p className="text-sm leading-tight text-muted-foreground">
                                                                Browse our extensive collection of {item.title}.
                                                            </p>
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {item.items.map((subItem) => (
                                                            <ListItem
                                                                key={subItem.title}
                                                                title={subItem.title}
                                                                href={subItem.href}
                                                                items={subItem.items}
                                                            />
                                                        ))}
                                                    </div>
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <Link href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                                                {item.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    {/* Add Mobile Menu Toggle Here if needed */}
                </div>
            </div>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { items?: NavItem[] }
>(({ className, title, children, items, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref as any}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                    href={props.href!}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                    {items && (
                        <div className="mt-2 ml-2 border-l pl-2 flex flex-col gap-1">
                            {items.map((sub) => (
                                <span key={sub.title} className="text-xs text-muted-foreground hover:text-foreground">
                                    {sub.title}
                                </span>
                            ))}
                        </div>
                    )}
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
