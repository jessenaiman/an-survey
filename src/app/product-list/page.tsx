import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getMarkdownContent } from "@/lib/markdown";
const ProductListContent = dynamic(() => import("@/content/product-list.mdx"));

export default async function ProductListPage() {
    const productCategories = siteConfig.mainNav.find(item => item.title === "Product List")?.items || [];

    // Check if we have a markdown file for the main product-list page itself (e.g., intro text)
    const mdData = await getMarkdownContent('product-list');

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
            <div className="max-w-6xl w-full bg-card border rounded-xl shadow-xl p-8 md:p-12 relative overflow-hidden">
                {/* Visual paper texture effect */}
                <div className="absolute inset-0 bg-zinc-50/50 dark:bg-zinc-900/50 pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="text-4xl font-heading font-bold mb-8">{mdData?.frontmatter?.title || "Product List"}</h1>

                    {mdData ? (
                        <div className="mb-12 prose prose-zinc dark:prose-invert max-w-none">
                            <ProductListContent />
                        </div>
                    ) : (
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                            Explore our wide range of surveying instruments and supplies.
                            Select a category below to view specific models.
                        </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productCategories.map((category) => (
                            <Link href={category.href} key={category.title} className="group">
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="group-hover:text-blue-600 transition-colors">{category.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {category.items ? (
                                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                                {category.items.slice(0, 3).map((sub: any) => (
                                                    <li key={sub.title}>{sub.title}</li>
                                                ))}
                                                {category.items.length > 3 && <li>and more...</li>}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">View details &rarr;</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
