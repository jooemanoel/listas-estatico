import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { ControleService } from '../../services/controle-service';
import { FirebaseService } from '../../services/firebase-service';
import { Lista } from '../../shared/models/interfaces/Lista';
import { Registro } from '../../shared/models/interfaces/registro';

@Component({
  standalone: true,
  selector: 'app-tabela',
  imports: [
    Cabecalho,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tabela.html',
  styleUrl: './tabela.css',
})
export class Tabela {
  titulo = '';
  colunas: string[] = ['ver', 'nome', 'excluir'];
  dataSource = new MatTableDataSource<Registro<Lista>>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private firebase: FirebaseService,
    private controleService: ControleService
  ) {}
  get carregando() {
    return this.controleService.carregando;
  }
  get usuario() {
    return this.firebase.usuarioAtual;
  }
  ngOnInit() {
    this.carregarListas();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  async carregarListas() {
    if (!this.firebase.listas().length) {
      const listas: Registro<Lista>[] = await this.firebase.listar<Lista>(
        this.usuario.data.nome
      );
      this.firebase.listas.set(listas);
    }
    this.dataSource.data = this.firebase.listas();
    this.titulo = this.dataSource.data.length
      ? 'MINHAS LISTAS'
      : 'NÃO HÁ NENHUMA LISTA';
  }
  criarLista() {
    this.controleService.changePage('formulario');
  }
  acessarLista(element: Registro<Lista>) {
    this.firebase.listaAtual = element;
    this.controleService.changePage('lista');
  }
  async excluirLista(id: string) {
    await this.firebase.excluir(this.usuario.data.nome, id);
    // Força o recarregamento das listas
    this.firebase.listas.set([]);
    this.carregarListas();
  }
}
