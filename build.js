const fs = require('fs');

const pages = ['experience', 'projects', 'skills', 'education', 'contact'];

// 1. Ensure directory index files exist in root
pages.forEach(p => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  fs.copyFileSync(p + '.html', p + '/index.html');
});

// 2. Ensure dist directory has all files in case Cloudflare output directory is set to dist
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

console.log('Build complete: All static files & directories ready for Cloudflare Pages (root & dist compatible).');
