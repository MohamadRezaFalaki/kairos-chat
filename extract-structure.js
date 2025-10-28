import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for __dirname / __filename equivalents in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories/files to ignore
const IGNORE_LIST = [
    'node_modules',
    '.next',
    '.git',
    '.idea',
    'dist',
    'build',
    '.env',
    '.env.local',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
];

function getDirectoryStructure(dirPath, prefix = '', isLast = true) {
    let result = '';
    const stats = fs.statSync(dirPath);
    const name = path.basename(dirPath);

    // Add current directory/file
    if (prefix) {
        const connector = isLast ? '└── ' : '├── ';
        result += prefix + connector + name + '\n';
    } else {
        result += name + '/ (root)\n';
    }

    // If it's a file, return
    if (stats.isFile()) return result;

    // If it's a directory, process its contents
    try {
        const items = fs.readdirSync(dirPath);
        const filteredItems = items.filter(item => !IGNORE_LIST.includes(item));

        filteredItems.forEach((item, index) => {
            const itemPath = path.join(dirPath, item);
            const isLastItem = index === filteredItems.length - 1;
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            result += getDirectoryStructure(itemPath, newPrefix, isLastItem);
        });
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error.message);
    }

    return result;
}

// Main execution
const projectPath = process.argv[2] || '.';
const outputFile = 'project-structure.txt';

console.log('\n📁 Extracting Project Structure...\n');

try {
    const structure = getDirectoryStructure(path.resolve(projectPath));

    const fileContent = `
${'='.repeat(60)}
              PROJECT STRUCTURE
${'='.repeat(60)}

${structure}
${'='.repeat(60)}
Generated on: ${new Date().toLocaleString()}
${'='.repeat(60)}
`;

    fs.writeFileSync(outputFile, fileContent, 'utf8');

    console.log(`✅ SUCCESS! Structure extracted to: ${outputFile}`);
    console.log(`📂 Total lines: ${structure.split('\n').length - 1}`);
    console.log(`\n💡 Now you can upload "${outputFile}" to share the structure!\n`);
} catch (error) {
    console.error('❌ Error:', error.message);
}
