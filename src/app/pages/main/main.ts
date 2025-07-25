import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service';
import { Registro } from '../../shared/models/interfaces/registro';
import { Usuario } from '../../shared/models/interfaces/usuario';
import { Formulario } from '../formulario/formulario';
import { ListaComponent } from '../lista/lista';
import { Login } from '../login/login';
import { Tabela } from '../tabela/tabela';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [Tabela, ListaComponent, Formulario, Login],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  page = 4;
  mudarPagina(x: number) {
    this.page = x;
    if (x === 4) localStorage.removeItem('usuarioAtual');
  }
  constructor(private firebase: FirebaseService) {}
  ngOnInit(): void {
    const str = localStorage.getItem('usuarioAtual');
    if (!str) return;
    const usuarioAtual: Registro<Usuario> = JSON.parse(
      str
    ) as Registro<Usuario>;
    this.firebase.usuarioAtual = usuarioAtual;
    this.page = 1;
  }
}
