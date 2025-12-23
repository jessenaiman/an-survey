import { getMarkdownContent } from "@/lib/markdown";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface ProductPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params;
    const slugPath = `/product-list/${resolvedParams.slug.join("/")}`;
    const slugKey = resolvedParams.slug[resolvedParams.slug.length - 1];

    const mdData = await getMarkdownContent(slugKey);

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
        <div className="container py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-heading font-bold mb-6">{title}</h1>

                {mdData ? (
                    <div className="mb-8 prose prose-slate max-w-none prose-img:rounded-lg prose-headings:font-heading">
                        <ReactMarkdown
                            components={{
                                // Custom renderer for links to keep them internal if possible
                                a: ({ node, ...props }) => {
                                    return <a {...props} className="text-blue-600 hover:underline" />
                                },
                                img: ({ node, ...props }) => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img {...props} className="max-w-full h-auto rounded border my-4" style={{ maxHeight: '400px' }} alt={props.alt || ''} />
                                )
                            }}
                        >
                            {mdData.content}
                        </ReactMarkdown>
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
    );
}
