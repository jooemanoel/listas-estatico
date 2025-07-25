// src/custom-sw.js

self.addEventListener('push', function (event) {
  console.log('Push recebido:', event);

  const data = event.data?.json() || {};
  console.log('Dados do push:', data);

  const title = data.title || 'Notificação';
  const options = {
    body: data.body || 'Você tem uma nova notificação.',
    icon: 'assets/icons/icon-72x72.png',
    badge: 'assets/icons/badge.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
