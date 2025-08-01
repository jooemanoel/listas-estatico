import { Component, EventEmitter, Output } from '@angular/core';
import { Lista } from '../../shared/models/interfaces/Lista';
import { FirebaseService } from '../../services/firebase-service';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ControleService } from '../../services/controle-service';

@Component({
  standalone: true,
  selector: 'app-formulario',
  imports: [Cabecalho, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {
  value = '';
  constructor(private firebase: FirebaseService, private controleService: ControleService) {}
  async adicionar() {
    this.value = this.value.trim().toUpperCase();
    if (!this.value) return;
    const lista: Lista = { nome: this.value, itens: [] };
    await this.firebase.adicionar<Lista>(
      this.firebase.usuarioAtual.data.nome,
      lista,
    );
    // Força o recarregamento das listas ao mudar de página
    this.firebase.listas.set([]);
    this.controleService.changePage('tabela');
  }
  homeClick() {
    this.controleService.changePage('tabela');
  }
}
