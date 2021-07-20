const STATIC_ASSETS = ['/', '/public/main.js', '/src/assets/json/district.json'];

async function cacheFirst(req) {
  const CACHED_RES = await caches.match(req);

  /* 아무것도 없을 경우 undefined를 반환하거나 캐시 요청 자체를 반환 */
  return CACHED_RES || (await fetch(req));
}

async function networkFirst(req) {
  const CACHE = await caches.open('dynamic-cache');

  /* 패치가 진행되고 불가능한 경우 정적 캐시가 반환 */
  try {
    const RES = await fetch(req);

    CACHE.put(req, RES.clone());

    return RES;
  } catch (error) {
    return await CACHE.match(req);
  }
}

/* install 이벤트는 브라우저가 새로운 서비스 워커를 감지할 때마다 호출 */
self.addEventListener('install', async (event) => {
  /* 
    캐시 저장소에 'static-cache' 이름의 캐시를 만들어 캐싱할 자원들의 URL 배열을 추가
   */
  const CACHE = await caches.open('static-cache');

  CACHE.addAll(STATIC_ASSETS);
});

/* 캐싱된 자원 가져오기 */
self.addEventListener('fetch', (event) => {
  const REQ = event.request;
  const MY_URL = new URL(REQ.url);
  /* 캐시가 처음 생성된 것인지 */
  if (MY_URL.origin === location.url) {
    event.respondWith(cacheFirst(REQ));
  } else {
    event.respondWith(networkFirst(REQ));
  }
});
