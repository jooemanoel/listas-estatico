//firebase-service.ts

import { Injectable, signal } from '@angular/core';

import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { Lista } from '../shared/models/interfaces/Lista';
import { Registro } from '../shared/models/interfaces/registro';
import { Usuario } from '../shared/models/interfaces/usuario';
import { ControleService } from './controle-service';

const firebaseConfig = {
  apiKey: 'AIzaSyB6D-EiO-Bi6wb7fePa-FLnIE3NqY62BjM',
  authDomain: 'testebd-80d9e.firebaseapp.com',
  databaseURL: 'https://testebd-80d9e.firebaseio.com',
  projectId: 'testebd-80d9e',
  storageBucket: 'testebd-80d9e.firebasestorage.app',
  messagingSenderId: '33530023257',
  appId: '1:33530023257:web:d9c421b634ce9e510c5048',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  usuarios: Registro<Usuario>[] = [];
  usuarioAtual!: Registro<Usuario>;
  listas = signal<Registro<Lista>[]>([]);
  listaAtual!: Registro<Lista>;
  constructor(private controleService: ControleService){}
  async listar<T>(colecao: string): Promise<Registro<T>[]> {
    this.controleService.carregando.set(true);
    const colecaoRef = collection(db, colecao);
    const snapshot = await getDocs(colecaoRef);
    this.controleService.carregando.set(false);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as T,
    }));
  }
  async adicionar<T extends Record<string, unknown>>(
    colecao: string,
    dado: T
  ): Promise<string> {
    this.controleService.carregando.set(true);
    try {
      const docRef = await addDoc(collection(db, colecao), dado);
      console.log('Documento adicionado com ID:', docRef.id);
      this.controleService.carregando.set(false);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
      return '';
    }
  }
  async excluir(colecao: string, id: string): Promise<void> {
    this.controleService.carregando.set(true);
    try {
      await deleteDoc(doc(db, colecao, id));
      this.controleService.carregando.set(false);
      console.log(
        `Documento com ID ${id} excluído com sucesso da coleção ${colecao}.`
      );
    } catch (error) {
      console.error(
        `Erro ao excluir documento ${id} da coleção ${colecao}:`,
        error
      );
    }
  }
  async atualizar<T>(
    colecao: string,
    id: string,
    novosDados: Partial<T>
  ): Promise<void> {
    this.controleService.carregando.set(true);
    try {
      const usuarioRef = doc(db, colecao, id);
      await updateDoc(usuarioRef, novosDados);
      this.controleService.carregando.set(false);
      console.log(`Usuário com ID ${id} atualizado com sucesso.`);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }
  buscarUsuario(input: Usuario): Registro<Usuario> | null | undefined {
    const search = this.usuarios.find((x) => x.data.nome === input.nome);
    if (!search) return undefined;
    if (search.data.senha !== input.senha) return null;
    return search;
  }
}
