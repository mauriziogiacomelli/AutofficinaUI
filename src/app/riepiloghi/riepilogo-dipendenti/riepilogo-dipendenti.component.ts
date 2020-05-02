import {Component} from '@angular/core';
import {Lavoro} from '../../common/lavoro/lavoro';
import {RiepiloghiCommon} from '../RiepiloghiCommon';
import {LavoriService} from '../../common/lavoro/lavori.service';
import {LavoroIntervalli} from '../../common/lavoro/LavoroIntervalli';
import { DipendentiService } from 'src/app/dipendenti/dipendenti.service';

@Component({
  selector: 'app-riepilogo-dipendenti',
  templateUrl: './riepilogo-dipendenti.component.html',
  styleUrls: ['./riepilogo-dipendenti.component.css']
})
export class RiepilogoDipendentiComponent extends RiepiloghiCommon {

  constructor(lavoriService: LavoriService, dipendentiService: DipendentiService) {
    super(lavoriService, dipendentiService);
  }

  getIdentificativo(lavoro: Lavoro, intervallo: LavoroIntervalli): string {
    // const inizialiDipendente = intervallo.dipendente.nome.toUpperCase().substr(0, 1) +
    //   intervallo.dipendente.cognome.toUpperCase().substr(0, 1);
    // return inizialiDipendente + ': ' + lavoro.autovettura.targa;
    return intervallo.dipendente.cognome + ' ' + intervallo.dipendente.nome +
     ' (' + intervallo.dipendente.sigla + ') ' + ': ' + lavoro.autovettura.targa;
  }

}
