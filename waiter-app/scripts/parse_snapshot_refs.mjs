
import fs from 'fs';
import path from 'path';

// Path to the snapshot file (adjust if needed based on the previous tool output)
const snapshotPath = 'C:\\Users\\apoma\\.cursor\\browser-logs\\snapshot-2025-12-15T00-28-25-644Z.log';

try {
  const content = fs.readFileSync(snapshotPath, 'utf8');
  const lines = content.split('\n');
  const items = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '- role: img') {
      // Check next lines for name and ref
      let name = null;
      let ref = null;
      
      // Look ahead a few lines
      for (let j = 1; j <= 5; j++) {
        if (i + j >= lines.length) break;
        const nextLine = lines[i + j];
        if (nextLine.includes('name: ')) {
          name = nextLine.split('name: ')[1].trim();
        }
        if (nextLine.includes('ref: ')) {
          ref = nextLine.split('ref: ')[1].trim();
        }
        // If we hit another role, stop
        if (nextLine.trim().startsWith('- role:')) break;
      }

      if (name && ref) {
        // Filter out irrelevant images (like "Москва", "Войти")
        // We assume menu items have specific names or we filter later
        if (!['Москва', 'Войти', 'Basket', 'Search'].includes(name)) {
            items.push({ name, ref });
        }
      }
    }
  }

  console.log(JSON.stringify(items, null, 2));
} catch (err) {
  console.error('Error reading snapshot:', err);
}


