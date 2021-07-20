const HTTP = require(`http`);
const FS = require(`fs`);
const PATH = require(`path`);
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain'
};

HTTP.createServer((req, res) => {
  console.log(req.url);
  const EXTENSION = PATH.extname(req.url); // 요청 URL의 리소스 확장자를 추출

  try {
    // 서버 자원을 가져오고자 할 때 사용
    if (req.method === `GET`) {
      let data = null;
      /* 
        200(성공)
        404(Not Found, 찾을 수 없음)
        500(내부 서버 오류)
      */
      if (req.url === `/`) {
        data = FS.readFileSync(`public/index.html`);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      } else if (req.url === '/favicon.ico') {
        data = FS.readFileSync(`src/assets/icon${req.url}`, `utf-8`);

        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      } else if (MIME[EXTENSION]) {
        data = FS.readFileSync(`.${req.url}`, `utf-8`);

        res.writeHead(200, { 'Content-Type': MIME[EXTENSION] + '; charset=utf-8' });
      }

      if (data !== null) {
        return res.end(data);
      } else {
        res.writeHead(404);
        return res.end('NOT FOUND');
      }
    }
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end(e);
  }
}).listen(8080, () => {
  console.log(`8080번 포트에서 서버 대기 중입니다.`);
});
