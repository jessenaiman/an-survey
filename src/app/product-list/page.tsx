import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownRenderer } from "@/components/markdown-renderer";

export default async function ProductListPage() {
    const productCategories = siteConfig.mainNav.find(item => item.title === "Product List")?.items || [];

    // Check if we have a markdown file for the main product-list page itself (e.g., intro text)
    const mdData = await getMarkdownContent('product-list');

    return (
        <div className="container py-10 px-4">
            <h1 className="text-4xl font-heading font-bold mb-8">{mdData?.frontmatter?.title || "Product List"}</h1>

            {mdData ? (
                <div className="mb-12 prose prose-slate max-w-none prose-img:rounded-lg prose-headings:font-heading">
                    <ReactMarkdown
                        components={{
                            a: ({ node, ...props }) => <a {...props} className="text-blue-600 hover:underline" />,
                        }}
                    >
                        {mdData.content}
                    </ReactMarkdown>
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
    );
}
