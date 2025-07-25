// src/custom-sw.js

self.addEventListener('push', function (event) {
  console.log('Push recebido:', event); // <-- ADICIONE ISSO

  const data = event.data?.json() || {};
  const title = data.title || 'Notificação';
  const options = {
    body: data.body || 'Você tem uma nova notificação.',
    icon: 'assets/icons/icon-72x72.png',
    badge: 'assets/icons/badge.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});