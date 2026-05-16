const fs = require('fs');
const path = require('path');

const dirsToSearch = ['app', 'components'];

const replacements = {
  'brand-bg': '[#050505]',
  'brand-text': '[#f0ece4]',
  'brand-accent': '[#295dff]'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const [key, value] of Object.entries(replacements)) {
        // Find Tailwind classes that use these keys, e.g. bg-brand-bg, text-brand-accent/50, border-brand-accent
        // Regex matches prefix-key or prefix-key/opacity
        const regex = new RegExp(`([a-z]+)-${key}`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, `$1-${value}`);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirsToSearch.forEach(processDir);
