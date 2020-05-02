import {LavoroIntervalli} from '../common/lavoro/LavoroIntervalli';

export class Dipendente {
  id: number;
  nome: string;
  cognome: string;
  via: string;
  citta: string;
  cellulare: string;
  altro: string;
  ruolo: string;
  foto: string;
  sigla: string;
  intervalli: LavoroIntervalli[];
}
