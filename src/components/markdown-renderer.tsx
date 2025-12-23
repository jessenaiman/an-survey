import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-a:text-blue-600 prose-img:rounded-lg">
            <ReactMarkdown
                components={{
                    a: ({ node, href, children, ...props }) => {
                        let targetHref = href || "";

                        // Basic link rewriting legacy HTML -> Next.js routes
                        if (targetHref.endsWith(".html")) {
                            const base = targetHref.replace(".html", "");

                            // Map known top-level pages
                            if (['contact', 'service', 'index', 'leica-lasers', 'site-pro-lasers', 'topcon-lasers'].includes(base)) {
                                targetHref = base === 'index' ? '/' : `/${base}`;
                            } else {
                                // Assume product list items
                                // We might need to correct this if it points to a top level page I missed, 
                                // but for now defaulting to product-list sub-routes is a safe bet for this catalog site.
                                targetHref = `/product-list/${base}`;
                            }
                        }

                        // If internal link, use Next.js Link
                        if (targetHref.startsWith("/")) {
                            return <Link href={targetHref} className="text-blue-600 hover:underline" {...props}>{children}</Link>;
                        }

                        return <a href={targetHref} className="text-blue-600 hover:underline" {...props}>{children}</a>;
                    },
                    img: ({ node, ...props }) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            {...props}
                            className="max-w-full h-auto rounded border my-4"
                            style={{ maxHeight: "400px" }}
                            alt={props.alt || ""}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
