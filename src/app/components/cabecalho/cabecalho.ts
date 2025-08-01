import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ControleService } from '../../services/controle-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-cabecalho',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  @Input() titulo = 'Lista de Compras';
  constructor(private controleService: ControleService) {}
  get page() {
    return this.controleService.page;
  }
  get carregando() {
    return this.controleService.carregando;
  }
  toggleMenu() {
    this.controleService.toggleMenu.next();
  }
  novaLista(){
    this.controleService.page.set('formulario');
  }
  voltar(){
    this.controleService.page.set('tabela');
  }
}
