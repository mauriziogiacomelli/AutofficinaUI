import {Autovettura} from '../../autovetture/Autovettura';
import {LavoroIntervalli} from './LavoroIntervalli';
import { Dipendente } from 'src/app/dipendenti/Dipendente';

export class Lavoro {
  id: number;
  autovettura: Autovettura;
  descrizione: string;
  tipologia: string;
  intervalli: LavoroIntervalli[];
}

export class VistaLavori {
  idDipendente: string;
  decodeDipendente: string;
  inizio: Date;
  fine: Date;
  idLavoro: string;
  idAuto: string;
  targa: string;
  totale: string;
  totaleRicerca: number;
}
