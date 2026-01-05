import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        a: ({ href, children, ...props }) => {
            const isInternal = href?.startsWith('/') || href?.startsWith('.') || href?.startsWith('#');
            if (isInternal) {
                return (
                    <Link href={href!} {...props}>
                        {children}
                    </Link>
                );
            }
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                </a>
            );
        },
        img: ({ src, alt, ...props }) => (
            <span className="my-8 block overflow-hidden rounded-lg border bg-zinc-100 dark:bg-zinc-900 text-center">
                <img
                    src={src}
                    alt={alt}
                    className="mx-auto max-w-full h-auto"
                    {...props}
                />
                {alt && <span className="text-sm text-zinc-500 mt-2 block px-4 pb-2">{alt}</span>}
            </span>
        ),
        ...components,
    }
}