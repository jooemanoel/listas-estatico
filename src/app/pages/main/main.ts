import { Component } from '@angular/core';
import { Firebase } from '../../services/firebase';
import { Registro } from '../../shared/models/interfaces/registro';
import { Usuario } from '../../shared/models/interfaces/usuario';
import { Formulario } from '../formulario/formulario';
import { Lista } from '../lista/lista';
import { Login } from '../login/login';
import { Tabela } from '../tabela/tabela';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [Tabela, Lista, Formulario, Login],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  page = 4;
  mudarPagina(x: number) {
    this.page = x;
    if (x === 4) localStorage.removeItem('usuarioAtual');
  }
  constructor(private firebase: Firebase) {}
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
