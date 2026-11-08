// 홈 화면 설치용 최소 서비스 워커. 화면 파일만 캐시하고, 서버 요청(/ask)은 캐시하지 않음.
const CACHE = 'silver-proto-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.pathname.endsWith('/ask')) return;
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
