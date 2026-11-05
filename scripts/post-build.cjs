const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const rootPath = path.resolve(__dirname, '..');

const distHtmlPath = path.join(distPath, 'index.html');
if (!fs.existsSync(distHtmlPath)) {
  console.error('Build output not found at', distHtmlPath);
  process.exit(1);
}

let html = fs.readFileSync(distHtmlPath, 'utf8');

// 1. Remove type="module" and add defer so script executes after DOM parse
html = html.replace(/<script\s+type="module"\s+crossorigin>/gi, '<script defer>');
html = html.replace(/<script\s+type="module">/gi, '<script defer>');
html = html.replace(/<script>/gi, '<script defer>');

// 2. Remove modulepreload links
html = html.replace(/<link\s+rel="modulepreload"[^>]*>/gi, '');

// 3. Remove Vite modulepreload polyfill
html = html.replace(/\(function\(\)\{let e=document\.createElement\([`'"]link[`'"]\)\.relList;[\s\S]*?fetch\(e\.href,n\)\}\}\)\(\);/gi, '');

// Write clean version back to dist/index.html for Vercel / Web
fs.writeFileSync(distHtmlPath, html, 'utf8');
console.log('✓ Updated dist/index.html for Vercel & Web');

// Write FisioPocket_App.html in root for local offline double-click
fs.writeFileSync(path.join(rootPath, 'FisioPocket_App.html'), html, 'utf8');
console.log('✓ Updated FisioPocket_App.html for local double-click execution');
