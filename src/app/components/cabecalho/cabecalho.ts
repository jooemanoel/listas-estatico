import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ControleService } from '../../services/controle-service';

@Component({
  standalone: true,
  selector: 'app-cabecalho',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  @Input() titulo = 'Lista de Compras';
  constructor(private controleService: ControleService) {}
  get page() {
    return this.controleService.page;
  }
  toggleMenu() {
    this.controleService.menu.set(!this.controleService.menu());
  }
}
