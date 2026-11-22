/* 花千树 PWA service worker
 * 策略：
 * - 页面导航：网络优先，断网回退缓存的 index.html
 * - 静态资源：缓存优先，后台更新
 * - /api/* 一律不缓存，避免把同步/AI 响应固化
 * 更新前端后把 CACHE 版本号 +1 即可让旧缓存失效。
 */
const CACHE = 'hqs-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/pdf.min.js',
  '/pdf.worker.min.js',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api/')) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((r) => {
          /* 只缓存真正的首页：404 页也是 text/html，不能覆盖离线入口 */
          if (r.ok && (r.headers.get('content-type') || '').includes('text/html')) {
            const copy = r.clone();
            caches.open(CACHE).then((c) => c.put('/index.html', copy)).catch(() => {});
          }
          return r;
        })
        .catch(() => caches.match('/index.html').then((hit) => hit || caches.match('/')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((r) => {
        if (r.ok) {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return r;
      });
    })
  );
});
