import { Item } from './item';

export interface Lista extends Record<string, unknown> {
  nome: string;
  itens: Item[];
}
