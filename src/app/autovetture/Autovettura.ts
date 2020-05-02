import {Lavoro} from '../common/lavoro/lavoro';

export class Autovettura {
  id: number;
  colore: string;
  cilindrata: string;
  km: number;
  annoImmatricolazione: number;
  carburante: string;
  numeroPorte: number;
  proprietario: string;
  targa: string;
  marca: string;
  modello: string;
  lavori: Lavoro[];
}
