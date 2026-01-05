import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getMarkdownContent } from "@/lib/markdown";

interface ProductPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params;
    const slugKey = resolvedParams.slug[resolvedParams.slug.length - 1];

    // We still need metadata from getMarkdownContent, but we won't use .content string anymore
    const mdData = await getMarkdownContent(slugKey);

    let Content;
    try {
        Content = dynamic(() => import(`@/content/${slugKey}.mdx`));
    } catch (e) {
        console.error(`Error loading MDX content for ${slugKey}`, e);
    }

    const slugPath = `/product-list/${resolvedParams.slug.join("/")}`;

    // Helper to find nav item for context (breadcrumbs, sub-items)
    const findItemByHref = (items: any[], href: string): any => {
        for (const item of items) {
            if (item.href === href) return item;
            if (item.items) {
                const found = findItemByHref(item.items, href);
                if (found) return found;
            }
        }
        return null;
    };

    const navItem = findItemByHref(siteConfig.mainNav, slugPath);
    const title = mdData?.frontmatter?.title || navItem?.title || "Product";

    if (!mdData && !navItem) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
            <div className="max-w-4xl w-full bg-background border rounded-xl shadow-xl p-8 md:p-12 relative overflow-hidden">
                {/* Visual paper texture effect */}
                <div className="absolute inset-0 bg-zinc-50/50 dark:bg-zinc-900/50 pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="text-4xl font-heading font-bold mb-6">{title}</h1>

                    {Content ? (
                        <div className="mb-8 prose prose-zinc dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-blue-600 prose-img:rounded-lg">
                            <Content />
                        </div>
                    ) : (
                        <Card className="mb-8 bg-muted/20">
                            <CardHeader>
                                <CardTitle>Content Under Construction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    We are currently migrating the content for <strong>{title}</strong>.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* If there are sub-items in our navigation config, list them at the bottom */}
                    {navItem?.items && (
                        <div className="mt-12 pt-8 border-t">
                            <h2 className="text-2xl font-bold mb-6">Available Models in this Category</h2>
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
        </div>
    );
}
