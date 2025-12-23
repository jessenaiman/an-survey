import { getMarkdownContent } from "@/lib/markdown";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const mdData = await getMarkdownContent(slug);

    // Find nav item for breadcrumbs/title context if available
    const findItemByHref = (items: any[], href: string): any => {
        for (const item of items) {
            // Check for exact match or match with leading slash
            if (item.href === href || item.href === `/${href}`) return item;
            if (item.items) {
                const found = findItemByHref(item.items, href);
                if (found) return found;
            }
        }
        return null;
    };

    const navItem = findItemByHref(siteConfig.mainNav, `/${slug}`);
    const title = mdData?.frontmatter?.title || navItem?.title || slug;

    if (!mdData && !navItem) {
        notFound();
    }

    return (
        <div className="container py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-heading font-bold mb-6">{title}</h1>

                {mdData ? (
                    <div className="mb-8">
                        <MarkdownRenderer content={mdData.content} />
                    </div>
                ) : (
                    <Card className="mb-8 bg-muted/20">
                        <CardHeader>
                            <CardTitle>Content Under Construction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                We are currently migrating the content for this page.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* If we found a nav item and it has children, render them */}
                {navItem?.items && (
                    <div className="mt-12 pt-8 border-t">
                        <h2 className="text-2xl font-bold mb-6">Related Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {navItem.items.map((sub: any) => (
                                <Button key={sub.href} variant="outline" className="h-auto py-4 px-6 justify-start" asChild>
                                    <Link href={sub.href}>
                                        <div className="text-left">
                                            <div className="font-semibold">{sub.title}</div>
                                        </div>
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
