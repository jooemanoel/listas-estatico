import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ControleService } from '../../services/controle-service';
import { FirebaseService } from '../../services/firebase-service';

@Component({
  selector: 'app-side-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  constructor(
    private controleService: ControleService,
    private firebaseService: FirebaseService
  ) {}
  close() {
    this.controleService.closeMenu.next();
  }
  criarLista() {
    this.controleService.page.set('formulario');
    this.close();
  }
  verListas() {
    this.controleService.page.set('tabela');
    this.close();
  }
  logout() {
    this.firebaseService.listas.set([]);
    localStorage.removeItem('usuarioAtual');
    this.controleService.page.set('login');
    this.close();
  }
}
