import { Component, EventEmitter, Output } from '@angular/core';
import { ListaFire } from '../../shared/models/interfaces/ListaFire';
import { Firebase } from '../../services/firebase';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-formulario',
  imports: [Cabecalho, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {
@Output() pageChange = new EventEmitter();
  value = '';
  constructor(private firebase: Firebase) {}
  async adicionar() {
    if (!this.value || !this.value.trim()) return;
    const lista: ListaFire = { nome: this.value.toUpperCase(), itens: [] };
    await this.firebase.adicionar<ListaFire>(
      this.firebase.usuarioAtual.data.nome,
      lista,
    );
    this.pageChange.emit(1);
  }
  homeClick() {
    this.pageChange.emit(1);
  }
}
