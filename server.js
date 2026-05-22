const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.css':  'text/css',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

function saveJSON(filename, body, res) {
  try {
    JSON.parse(body);
    fs.writeFileSync(path.join(DIR, filename), body, 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"ok":true}');
  } catch(e) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end('{"ok":false,"error":"JSON invalido"}');
  }
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => saveJSON('accounts.json', body, res));
    return;
  }

  if (req.method === 'POST' && req.url === '/save-projects') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => saveJSON('projects.json', body, res));
    return;
  }

  if (req.method === 'POST' && req.url === '/save-providers') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => saveJSON('providers.json', body, res));
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(DIR, decodeURIComponent(filePath));

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('No encontrado'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  OrbIAt funcionando');
  console.log('  Abre tu navegador en: http://localhost:' + PORT);
  console.log('');
  console.log('  Para cerrar el servidor pulsa Ctrl+C');
  console.log('');
});
