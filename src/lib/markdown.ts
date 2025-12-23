import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getMarkdownContent(slug: string) {
    const contentDir = path.join(process.cwd(), "src", "content");

    // Try exact match first
    let targetFile = path.join(contentDir, `${slug}.md`);

    if (!fs.existsSync(targetFile)) {
        // Try with '1' suffix as seen in some legacy files (e.g. topcon-laser-levels1.html)
        const suffixFile = path.join(contentDir, `${slug}1.md`);
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
