import { siteConfig } from "@/config/site";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by <a href="#" className="font-medium underline underline-offset-4">Antigravity</a>.
                    The source code is available on <a href="#" className="font-medium underline underline-offset-4">GitHub</a>.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/contact" className="hover:underline">Contact</Link>
                    <Link href="/service" className="hover:underline">Service</Link>
                    <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
                </div>
            </div>
        </footer>
    );
}
