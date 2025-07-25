import { Component, EventEmitter, Output } from '@angular/core';
import { Lista } from '../../shared/models/interfaces/Lista';
import { FirebaseService } from '../../services/firebase-service';
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
  constructor(private firebase: FirebaseService) {}
  async adicionar() {
    this.value = this.value.trim().toUpperCase();
    if (!this.value) return;
    const lista: Lista = { nome: this.value, itens: [] };
    await this.firebase.adicionar<Lista>(
      this.firebase.usuarioAtual.data.nome,
      lista,
    );
    this.pageChange.emit(1);
  }
  homeClick() {
    this.pageChange.emit(1);
  }
}
