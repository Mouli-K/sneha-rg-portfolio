const { execSync } = require('child_process');
const fs = require('fs');

console.log('1. Compiling production Tailwind CSS...');
try {
  execSync('npx tailwindcss -i src/input.css -o assets/css/tailwind.css --minify', { stdio: 'inherit' });
} catch (err) {
  console.warn('Tailwind build skipped or already prebuilt:', err.message);
}

const pages = ['experience', 'projects', 'skills', 'education', 'contact'];

// 2. Ensure directory index files exist in root
pages.forEach(p => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  fs.copyFileSync(p + '.html', p + '/index.html');
});

// 3. Ensure dist directory has all files in case Cloudflare output directory is set to dist
if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });
const rootFiles = ['index.html', '404.html', '_headers', 'package.json', 'Sneha RG.pdf'];
pages.forEach(p => rootFiles.push(p + '.html'));

rootFiles.forEach(f => {
  if (fs.existsSync(f)) fs.copyFileSync(f, 'dist/' + f);
});

pages.forEach(p => {
  if (!fs.existsSync('dist/' + p)) fs.mkdirSync('dist/' + p, { recursive: true });
  fs.copyFileSync(p + '.html', 'dist/' + p + '/index.html');
});

fs.cpSync('assets', 'dist/assets', { recursive: true });

console.log('Build complete: Production Tailwind CSS compiled and directories ready for Cloudflare Pages.');
