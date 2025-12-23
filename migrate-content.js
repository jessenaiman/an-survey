const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const SOURCE_DIR = 'C:\\My Web Sites\\A.N. Survey Instrument\\www.ansurveyinstrument.com';
const DEST_DIR = path.join(__dirname, 'src', 'content');
const turndownService = new TurndownService();

// Simplify image handling
turndownService.addRule('images', {
    filter: 'img',
    replacement: function (content, node) {
        const alt = node.getAttribute('alt') || '';
        let src = node.getAttribute('src') || '';

        // Fix relative upload paths
        if (src.startsWith('uploads/')) {
            src = '/' + src;
        }
        // Remove query strings from src
        if (src.includes('?')) {
            src = src.split('?')[0];
        }

        return `![${alt}](${src})`;
    }
});

// Remove script tags and styles
turndownService.remove(['script', 'style', 'iframe', 'form']);

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

const files = fs.readdirSync(SOURCE_DIR);

files.forEach(file => {
    if (path.extname(file) === '.html') {
        try {
            const filePath = path.join(SOURCE_DIR, file);
            const html = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(html);

            // Extract Title
            let title = $('title').text() || path.basename(file, '.html');
            title = title.replace(' - AN Survey Instrument Repair', '').replace('&nbsp;', '').trim();

            // Extract Content
            // The content seems to be in #wsite-content
            const contentDiv = $('#wsite-content');

            // If main content is empty/missing, might be just navigation or footer, but we'll try to get what we can.
            let contentHtml = contentDiv.html() || '';

            if (!contentHtml) {
                console.log(`Skipping ${file} - Empty content (might be redirect or frame)`);
                return;
            }

            // Convert to Markdown
            let markdown = turndownService.turndown(contentHtml);

            // Construct File Content with Frontmatter
            const fileContent = `---
title: "${title}"
original_file: "${file}"
---

${markdown}
`;

            const destPath = path.join(DEST_DIR, file.replace('.html', '.md'));
            fs.writeFileSync(destPath, fileContent);
            console.log(`Converted ${file} -> ${path.basename(destPath)}`);

        } catch (e) {
            console.error(`Error processing ${file}:`, e);
        }
    }
});
