import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { FirebaseService } from '../../services/firebase-service';
import { Registro } from '../../shared/models/interfaces/registro';
import { Usuario } from '../../shared/models/interfaces/usuario';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    Cabecalho,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  colecao = 'usuarios';
  hide = true;
  @Output() pageChange = new EventEmitter();
  usuario: Usuario = { nome: '', senha: '' };
  senha2 = '';
  registro = false;
  colunas: string[] = ['edit', 'nome', 'delete'];
  dataSource = new MatTableDataSource<Registro<Usuario>>([]);
  constructor(private firebase: FirebaseService, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.carregarUsuarios();
  }
  login() {
    this.usuario.nome = this.usuario.nome.toUpperCase();
    const user = this.firebase.buscarUsuario(this.usuario);
    if (user === undefined) {
      this._snackBar.open('Usuário não encontrado.', '', { duration: 5000 });
    } else if (!user) {
      this._snackBar.open('Senha incorreta.', '', { duration: 5000 });
    } else {
      this.firebase.usuarioAtual = user;
      localStorage.setItem('usuarioAtual', JSON.stringify(user));
      this.pageChange.emit(1);
    }
  }
  homeClick() {
    this.pageChange.emit(1);
  }
  async adicionar() {
    if (!this.registro) {
      this.registro = true;
      return;
    }
    if (this.usuario.senha !== this.senha2) {
      this._snackBar.open('As senhas devem ser iguais.', '', {
        duration: 5000,
      });
      return;
    }
    this.usuario.nome = this.usuario.nome.toUpperCase();
    if (this.firebase.usuarios.find((x) => x.data.nome === this.usuario.nome)) {
      this._snackBar.open('Este usuário já existe.', '', {
        duration: 5000,
      });
      return;
    }
    const idUser = await this.firebase.adicionar<Usuario>(
      this.colecao,
      this.usuario
    );
    this.usuario = { nome: '', senha: '' };
    this.senha2 = '';
    if (idUser) {
      this._snackBar.open('Cadastro realizado com sucesso.', '', {
        duration: 5000,
      });
      this.registro = false;
      this.carregarUsuarios();
    } else {
      this._snackBar.open('Houve um erro no cadastro.', '', {
        duration: 5000,
      });
    }
  }
  async carregarUsuarios() {
    const usuarios: Registro<Usuario>[] = await this.firebase.listar<Usuario>(
      this.colecao
    );
    this.firebase.usuarios = usuarios;
    this.dataSource.data = usuarios;
  }
  acessar(element: Registro<Usuario>) {
    this.firebase.usuarioAtual = element;
    this.pageChange.emit(1);
  }
}
