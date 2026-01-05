import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getMarkdownContent(slug: string) {
    const contentDir = path.join(process.cwd(), "src", "content");

    // Try exact match first
    let targetFile = path.join(contentDir, `${slug}.mdx`);

    if (!fs.existsSync(targetFile)) {
        // Try with '1' suffix as seen in some legacy files (e.g. topcon-laser-levels1)
        const suffixFile = path.join(contentDir, `${slug}1.mdx`);
        if (fs.existsSync(suffixFile)) {
            targetFile = suffixFile;
        } else {
            // Try removing plural 's' or other simple heuristics if needed?
            return null;
        }
    }

    const fileContent = fs.readFileSync(targetFile, "utf-8");
    const { data, content } = matter(fileContent);
    return { frontmatter: data, content };
}

export async function getAllContent() {
    const contentDir = path.join(process.cwd(), "src", "content");
    // Get all mdx files
    const filenames = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

    const allContent = filenames.map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const filePath = path.join(contentDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
            slug,
            title: data.title || slug,
            brand: data.brand || "Other",
            type: data.type || "Page",
            ...data,
        };
    });

    return allContent;
}
