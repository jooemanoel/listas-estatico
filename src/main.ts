import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('custom-sw.js') // use o mesmo nome do arquivo acima
    .then((registration) => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch((err) => {
      console.error('Erro ao registrar o Service Worker:', err);
    });
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
