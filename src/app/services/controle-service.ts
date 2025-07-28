import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  page = signal('login');
  menu = signal(false);
  changePage(page: string){
    this.page.set(page);
  }
}
