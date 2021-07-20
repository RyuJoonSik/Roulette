const HTTP = require(`http`);
const FS = require(`fs`).promises;

HTTP.createServer(async (req, res) => {
  // 요청이 들어올때 응답
  try {
    const DATA = await FS.readFile(`src/html/index.html`);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // res.write(`<h1>Hello Node!</h1>`);
    res.end(DATA);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(err.message);
  }
}).listen(8081, () => {
  console.log(`8080번 포트에서 서버 대기 중입니다!`);
});
