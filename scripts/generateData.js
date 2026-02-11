import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'projects.json');
const statuses = ['Active', 'Pending', 'Completed', 'Archived'];
const projects = [];

for (let i = 1; i <= 5000; i++) {
  projects.push({
    id: i,
    projectName: `Project ${String(i).padStart(4, '0')}`,
    lat: parseFloat((Math.random() * (49 - 24) + 24).toFixed(6)),
    lng: parseFloat((Math.random() * (-66 - -124) + -124).toFixed(6)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
  });
}

try {
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`✅ Success! 5,000 records saved to: ${outputPath}`);
} catch (err) {
  console.error('❌ Error writing file:', err);
}