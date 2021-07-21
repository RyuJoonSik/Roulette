const HTTP = require('http');
const FS = require('fs');
const PATH = require('path');
const TYPE = {
  '.ico': 'image/x-icon',
  '.png': 'image/x-icon',
  '.js': 'application/javascript',
  '.json': 'application/json',
};

HTTP.createServer((req, res) => {
  try {
    // 서버 자원을 가져오고자 할 때 사용
    if (req.method === 'GET') {
      /* 
        200(성공)
        404(Not Found, 찾을 수 없음)
        500(내부 서버 오류)
      */
      console.log(req.url);

      const EXTENSION = PATH.extname(req.url);
      let data = null;

      try {
        if (req.url === '/') {
          data = FS.readFileSync('./public/index.html');

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

          return res.end(data);
        } else if (EXTENSION === '.ico') {
          data = FS.readFileSync(`.${req.url}`);
        } else if (EXTENSION === '.js') {
          data = FS.readFileSync(`.${req.url}`, 'utf-8');
        } else if (EXTENSION === '.json') {
          data = FS.readFileSync(`.${req.url}`, 'utf-8');
        } else if (req.url === '/src/assets/icon/android-chrome-512x512.png') {
          data = FS.readFileSync(`.${req.url}`);
        } else {
          res.writeHead(404);

          return res.end("CAN'T FIND FILE EXTENSION '" + EXTENSION + "'");
        }
      } catch (e) {
        res.writeHead(404);

        return res.end("CAN'T FIND URL '" + req.url + "'");
      }

      res.writeHead(200, { 'Content-Type': TYPE[EXTENSION] + '; charset=utf-8' });

      return res.end(data);
    }
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end(e);
  }
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기 중입니다.');
});
