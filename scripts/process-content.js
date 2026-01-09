const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../src/content');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

const TAG_KEYWORDS = [
    // Brands
    'Leica', 'Topcon', 'David White', 'Sokkia', 'Nikon', 'Spectra', 'Trimble', 'Geomax', 'SitePro', 'CST/Berger', 'Schonstedt', 'Magna-Trak',
    // Types
    'Level', 'Laser', 'Theodolite', 'Transit', 'Station', 'GPS', 'Receiver', 'Controller', 'Data Collector', 'Tripod', 'Rod', 'Prism', 'Pole', 'Locator', 'Detector', 'Disto', 'Grade',
    // Features
    'Digital', 'Automatic', 'Rotary', 'Line', 'Point', 'Pipe', 'Plummet', 'Optical', 'Bluetooth', 'Wireless', 'Rechargeable', 'Green Beam', 'Red Beam', 'Android', 'Windows',
    // Usage
    'Repair', 'Service', 'Calibration', 'Construction', 'Surveying', 'Excavating', 'Grading', 'Measuring'
];

// Regex to match the contact block.
// Example:
// A.N. SURVEY INSTRUMENT REPAIR  
// 109 Crawford Rose Drive, Aurora ON L4G 4S1 CANADA      PH:905-841-0119    [Email](contact)
const CONTACT_REGEX = /A\.N\.\s+SURVEY\s+INSTRUMENT\s+REPAIR[\s\S]*?109\s+Crawford\s+Rose\s+Drive[\s\S]*?PH:905-841-0119[\s\S]*?\[Email\]\(contact\)/ig;
const REPLACEMENT_LINK = '\n\n**[Contact us for pricing and availability](/contact)**\n\n';

let processedCount = 0;
let tagCount = 0;

files.forEach(file => {
    try {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        let changed = false;

        // 1. Remove original_file
        if (data.original_file) {
            delete data.original_file;
            changed = true;
        }

        // 2. Scan content for tags
        const contentLower = content.toLowerCase();
        const currentTags = new Set(data.tags || []);

        // Add Brand and Type to tags if they exist
        if (data.brand && data.brand !== 'Other') currentTags.add(data.brand);
        if (data.type && data.type !== 'Page') currentTags.add(data.type);

        TAG_KEYWORDS.forEach(keyword => {
            // Check if keyword is in content (case-insensitive)
            // Use regex for whole word match to avoid partials (e.g. 'Leica' in 'LeicaGeosystems' is fine, but maybe 'Use' in 'User')
            // Actually, for these keywords, simple includes is probably okay, but let's be slightly safer
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            if (regex.test(content)) {
                currentTags.add(keyword);
            }
        });

        // Convert Set back to array and sort
        const newTags = Array.from(currentTags).sort();

        // Check if tags changed
        const originalTagsJson = JSON.stringify((data.tags || []).sort());
        const newTagsJson = JSON.stringify(newTags);

        if (originalTagsJson !== newTagsJson) {
            data.tags = newTags;
            changed = true;
            tagCount += newTags.length;
        }

        // 3. Remove/Replace contact info
        // We do this on the content string
        let newContentString = content;
        if (CONTACT_REGEX.test(content)) {
            newContentString = content.replace(CONTACT_REGEX, REPLACEMENT_LINK);
            // Also trim leading newlines if we created too many
            // newContentString = newContentString.replace(/^\s+/, '');
        } else if (content.includes("109 Crawford Rose Drive") && content.includes("PH:905-841-0119")) {
            console.log(`[WARN] Regex didn't match contact info in ${file}, trying simpler fallback`);
            const FALLBACK_REGEX = /109\s+Crawford\s+Rose\s+Drive[\s\S]*?PH:905-841-0119[\s\S]*?\[Email\]\(contact\)/ig;
            if (FALLBACK_REGEX.test(content)) {
                newContentString = content.replace(FALLBACK_REGEX, REPLACEMENT_LINK);
                // Need to remove the preceding "A.N. SURVEY INSTRUMENT REPAIR" if it exists separately
                newContentString = newContentString.replace(/A\.N\.\s+SURVEY\s+INSTRUMENT\s+REPAIR\s*/ig, '');
            }
        }

        if (newContentString !== content) {
            changed = true;
        }

        if (changed) {
            const newFileContent = matter.stringify(newContentString, data);
            fs.writeFileSync(filePath, newFileContent);
            console.log(`Processed ${file}: Updated tags and content`);
            processedCount++;
        } else {
            console.log(`Skipped ${file}: No changes needed`);
        }

    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log(`\nFinished! Processed ${processedCount} files.`);
