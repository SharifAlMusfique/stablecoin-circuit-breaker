// Tiny local web server so Phantom can connect (wallets do not work on double-clicked file:// pages).
// Run from this folder:   node serve.js      then open  http://localhost:5173
// No installs needed. Only page files are served: keypair .json files and hidden files are never sent.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 5173;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/circuit-breaker.html';
  const file = path.normalize(path.join(ROOT, url));
  const ext = path.extname(file).toLowerCase();
  const hidden = url.split('/').some(part => part.startsWith('.'));
  if (!file.startsWith(ROOT + path.sep) || !TYPES[ext] || hidden) {
    res.writeHead(404);
    return res.end('Not found');
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[ext], 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Circuit Breaker running at http://localhost:${PORT}   (press Ctrl+C to stop)`);
});
