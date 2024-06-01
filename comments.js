// Create web server
// 1. Load modules
// 2. Create server
// 3. Start server
// 4. Process request
// 5. Send response

// 1. Load modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// 2. Create server
const app = http.createServer((req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', (err, files) => {
        const title = 'Welcome';
        const description = 'Hello, Node.js';
        const list = templateList(files);
        const template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
        res.writeHead(200);
        res.end(template);
      });
    } else {
      fs.readdir('./data', (err, files) => {
        fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
          const title = queryData.id;
          const list = templateList(files);
          const template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
          res.writeHead(200);
          res.end(template);
        });
      });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', (err, files) => {
      const title = 'WEB - create';
      const list = templateList(files);
      const template = templateHTML(title, list, `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `);
      res.writeHead(200);
      res.end(template);
    });
  } else if (pathname === '/create_process') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
