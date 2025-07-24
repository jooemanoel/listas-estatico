import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Firebase } from '../../services/firebase';
import { ListaFire } from '../../shared/models/interfaces/ListaFire';
import { Registro } from '../../shared/models/interfaces/registro';
import { Usuario } from '../../shared/models/interfaces/usuario';

@Component({
  standalone: true,
  selector: 'app-tabela',
  imports: [
    Cabecalho,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './tabela.html',
  styleUrl: './tabela.css',
})
export class Tabela {
  @Output() pageChange = new EventEmitter();
  titulo = 'CARREGANDO...';
  usuario!: Registro<Usuario>;
  colunas: string[] = ['ver', 'nome', 'excluir'];
  dataSource = new MatTableDataSource<Registro<ListaFire>>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private firebase: Firebase) {}
  ngOnInit() {
    this.usuario = this.firebase.usuarioAtual;
    this.carregarListas();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  async carregarListas() {
    const listas: Registro<ListaFire>[] = await this.firebase.listar<ListaFire>(
      this.usuario.data.nome
    );
    this.dataSource.data = listas;
    this.titulo = this.dataSource.data.length
      ? 'MINHAS LISTAS'
      : 'NÃO HÁ NENHUMA LISTA';
  }
  criarLista() {
    this.pageChange.emit(3);
  }
  acessar(element: Registro<ListaFire>) {
    this.firebase.listaAtual = element;
    this.pageChange.emit(2);
  }
  async excluir(id: string) {
    await this.firebase.excluir(this.usuario.data.nome, id);
    this.carregarListas();
  }
}
