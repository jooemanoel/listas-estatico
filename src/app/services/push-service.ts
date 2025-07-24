//push-service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class PushService {
  readonly VAPID_PUBLIC_KEY =
    'BDEfUo6MA3abDv4OaTslDo_AR0RplooBTVB6kADJwzSWGGytvXFFnMwM1fXFDP-3nVVESFiYjJbv7uoN1iG0bxk';

  constructor(private swPush: SwPush, private http: HttpClient) {}

  async subscribeToNotifications(): Promise<PushSubscription | null> {
    if (!this.swPush.isEnabled) {
      console.warn('Push notifications não estão disponíveis.');
      return null;
    }

    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });

      console.log('Inscrito para notificações:', sub);
      return sub;
    } catch (err) {
      console.error('Erro ao se inscrever para notificações:', err);
      return null;
    }
  }

  iniciarLeitura() {
    this.subscribeToNotifications().then((subscription) => {
      if (subscription) {
        this.http
          .post(
            'https://treino-express-psi.vercel.app/subscrever',
            subscription.toJSON(),
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .subscribe({
            next: () => console.log('Inscrição enviada ao servidor.'),
            error: (err) => console.error('Erro ao enviar inscrição:', err),
          });
      }
    });
  }
}
