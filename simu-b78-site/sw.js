// Simu B78 : mise en cache pour jouer hors connexion (la manette sur téléphone, elle, demande internet)
const CACHE='simub78-v9';
const FILES=['./','./index.html','./three.min.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  if(u.origin===location.origin){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(k=>k.put(e.request,c));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));}
  else if(/fonts\.(googleapis|gstatic)\.com/.test(u.hostname)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const c=res.clone();caches.open(CACHE).then(k=>k.put(e.request,c));return res;})));}});
