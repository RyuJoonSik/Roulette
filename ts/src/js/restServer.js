const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile('src/html/restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  })
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
