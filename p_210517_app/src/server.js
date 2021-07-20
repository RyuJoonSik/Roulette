const HTTP = require(`http`);
const FS = require(`fs`);

HTTP.createServer((req, res) => {
  console.log(req.url);
  if (req.method === `GET`) {
    if (req.url === `/`) {
      FS.readFile(`./src/html/index.html`, `utf-8`, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        res.end(data);
      });
    } else if (req.url.includes(`.html`)) {
      FS.readFile(`./src/html${req.url}`, `utf-8`, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        res.end(data);
      });
    } else if (req.url.includes(`.css`)) {
      FS.readFile(`.${req.url}`, `utf-8`, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });

        res.end(data);
      });
    } else if (req.url.includes(`.js`)) {
      FS.readFile(`.${req.url}`, `utf-8`, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        res.writeHead(200, {
          'Content-Type': 'application/javascript; charset=utf-8',
        });

        res.end(data);
      });
    } else if (req.url.includes(`.json`)) {
      FS.readFile(`.${req.url}`, `utf-8`, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        res.end(data);
      });
    }
  }
}).listen(8080, () => {
  console.log(`8080번 포트에서 서버 대기 중입니다.`);
});
