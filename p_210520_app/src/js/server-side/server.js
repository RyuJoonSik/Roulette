const HTTP = require(`http`);
const FS = require(`fs`);
const PATH = require(`path`);
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain',
};

HTTP.createServer((req, res) => {
  console.log(req.url);
  const EXTENSION = PATH.extname(req.url);

  if (req.method === `GET`) {
    if (req.url === `/`) {
      FS.readFile(`./public/index.html`, `utf-8`, (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end(`Not Found `);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    } else if (req.url === '/favicon.ico') {
      FS.readFile(`./src/assets/icon${req.url}`, (err, data) => {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end(data);
      });
    } else if (MIME[EXTENSION]) {
      FS.readFile(`.${req.url}`, `utf-8`, (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end(`Not Found `);
          return;
        }

        res.writeHead(200, {
          'Content-Type': MIME[EXTENSION] + '; charset=utf-8',
        });
        res.end(data);
      });
    } else {
      res.writeHead(404);
      res.end(`Not Found `);
    }
  }
}).listen(8080, () => {
  console.log(`8080번 포트에서 서버 대기 중입니다.`);
});
