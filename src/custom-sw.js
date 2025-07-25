// src/custom-sw.js

self.addEventListener('push', function (event) {
  const data = event.data?.json() || {};

  const title = data.title || 'Notificação';
  const options = {
    body: data.body || 'Você tem uma nova notificação.',
    icon: 'assets/icons/icon-72x72.png', // Ajuste se quiser
    badge: 'assets/icons/badge.png',     // Opcional
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
