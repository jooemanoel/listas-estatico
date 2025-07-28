import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service';
import { Registro } from '../../shared/models/interfaces/registro';
import { Usuario } from '../../shared/models/interfaces/usuario';
import { Formulario } from '../formulario/formulario';
import { ListaComponent } from '../lista/lista';
import { Login } from '../login/login';
import { Tabela } from '../tabela/tabela';
import { ControleService } from '../../services/controle-service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [Tabela, ListaComponent, Formulario, Login],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(
    private firebaseService: FirebaseService,
    private controleService: ControleService
  ) {}
  get page(){
    return this.controleService.page;
  }
  ngOnInit(): void {
    const str = localStorage.getItem('usuarioAtual');
    if (!str) return;
    const usuarioAtual: Registro<Usuario> = JSON.parse(
      str
    ) as Registro<Usuario>;
    this.firebaseService.usuarioAtual = usuarioAtual;
    this.controleService.page.set('tabela');
  }
}
