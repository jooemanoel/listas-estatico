import { Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { FirebaseService } from '../../services/firebase-service';
import { Item } from '../../shared/models/interfaces/item';
import { Lista } from '../../shared/models/interfaces/Lista';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-lista',
  imports: [
    Cabecalho,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
  encapsulation: ViewEncapsulation.None
})
export class ListaComponent {
  novo = '';
  colunas: string[] = ['checked', 'nome', 'delete'];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private firebase: FirebaseService) {}
  get lista() {
    return this.firebase.listaAtual;
  }
  ngOnInit() {
    this.carregarLista();
  }
  carregarLista() {
    this.dataSource.data = this.lista.data.itens;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  async atualizarLista() {
    await this.firebase.atualizar<Lista>(
      this.firebase.usuarioAtual.data.nome,
      this.lista.id,
      this.lista.data
    );
  }
  async adicionar() {
    const item: Item = { nome: this.novo.toUpperCase(), checked: false };
    this.lista.data.itens = [...this.lista.data.itens, item];
    await this.atualizarLista();
    this.carregarLista();
    this.novo = '';
  }
  async excluir(nome: string) {
    this.lista.data.itens = this.lista.data.itens.filter(
      (x) => x.nome !== nome
    );
    await this.atualizarLista();
    this.carregarLista();
  }
  async check(checked: boolean, nome: string) {
    console.log(checked, nome);
    const item = this.lista.data.itens.find((x) => x.nome === nome);
    if (!item) return;
    item.checked = checked;
    await this.atualizarLista();
    this.carregarLista();
  }
}
