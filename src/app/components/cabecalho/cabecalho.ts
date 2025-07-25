import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { FirebaseService } from '../../services/firebase-service';

@Component({
  standalone: true,
  selector: 'app-cabecalho',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  @Input() titulo = 'Lista de Compras';
  @Output() btnClick = new EventEmitter();
  @Output() menuClick = new EventEmitter();
  constructor(private firebase: FirebaseService) {}
  get atual() {
    return this.firebase.listaAtual.data.nome;
  }
  get usuarioAtual() {
    return this.firebase.usuarioAtual;
  }
  evento() {
    this.btnClick.emit();
  }
  menu() {
    this.menuClick.emit();
  }
}
