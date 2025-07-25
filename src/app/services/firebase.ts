//firebase.ts

import { Injectable } from '@angular/core';

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
import { ListaFire } from '../shared/models/interfaces/ListaFire';
import { Registro } from '../shared/models/interfaces/registro';
import { Usuario } from '../shared/models/interfaces/usuario';
import { HttpClient } from '@angular/common/http';

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
export class Firebase {
  usuarios: Registro<Usuario>[] = [];
  usuarioAtual!: Registro<Usuario>;
  listaAtual!: Registro<ListaFire>;
  constructor(private http: HttpClient) {}
  async listar<T>(colecao: string): Promise<Registro<T>[]> {
    const colecaoRef = collection(db, colecao);
    const snapshot = await getDocs(colecaoRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as T,
    }));
  }
  async adicionar<T extends Record<string, unknown>>(
    colecao: string,
    dado: T
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, colecao), dado);
      console.log('Documento adicionado com ID:', docRef.id);

      this.mostrarNotificacao('Novo item adicionado', `Coleção: ${colecao}`);
      this.notificarBackEnd('Novo item adicionado', `Coleção: ${colecao}`);

      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
      return '';
    }
  }
  async excluir(colecao: string, id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, colecao, id));
      console.log(
        `Documento com ID ${id} excluído com sucesso da coleção ${colecao}.`
      );
    } catch (error) {
      console.error(
        `Erro ao excluir documento ${id} da coleção ${colecao}:`,
        error
      );
      throw error;
    }
  }
  async atualizar<T>(
    colecao: string,
    id: string,
    novosDados: Partial<T>
  ): Promise<void> {
    try {
      const usuarioRef = doc(db, colecao, id);
      await updateDoc(usuarioRef, novosDados);
      console.log(`Usuário com ID ${id} atualizado com sucesso.`);

      this.mostrarNotificacao(
        'Atualização realizada',
        `Item da coleção "${colecao}" foi atualizado.`
      );
      this.notificarBackEnd(
        'Atualização realizada',
        `Item da coleção "${colecao}" foi atualizado.`
      );
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

  private mostrarNotificacao(titulo: string, corpo: string) {
    if (!document.hidden) {
      return;
    }
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações.');
      return;
    }
    if (Notification.permission === 'granted') {
      new Notification(titulo, { body: corpo });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(titulo, { body: corpo });
        }
      });
    }
  }

  private notificarBackEnd(titulo: string, corpo: string) {
    this.http
      .post(
        'https://treino-express-psi.vercel.app/notificacoes/notificar',
        {
          title: titulo,
          body: corpo,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe({
        next: () => console.log('Notificação enviada ao servidor'),
        error: (err) => console.error('Erro ao notificar backend:', err),
      });
  }
}
