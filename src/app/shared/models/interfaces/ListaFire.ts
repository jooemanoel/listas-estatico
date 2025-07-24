import { Item } from './item';

export interface ListaFire extends Record<string, unknown> {
  nome: string;
  itens: Item[];
}
