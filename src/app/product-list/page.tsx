import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function ProductListPage() {
    const productCategories = siteConfig.mainNav.find(item => item.title === "Product List")?.items || [];

    return (
        <div className="container py-10 px-4">
            <h1 className="text-4xl font-heading font-bold mb-8">Product List</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                Explore our wide range of surveying instruments and supplies.
                Select a category below to view specific models.
            </p>

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
