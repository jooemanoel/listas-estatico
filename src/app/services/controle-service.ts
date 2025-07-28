import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  page = signal('login');
  closeMenu = new Subject<void>();
  toggleMenu = new Subject<void>();
  changePage(page: string){
    this.page.set(page);
  }
}
