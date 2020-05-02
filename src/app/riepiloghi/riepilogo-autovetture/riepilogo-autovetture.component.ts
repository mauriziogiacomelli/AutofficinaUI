import {Component} from '@angular/core';
import {Lavoro} from '../../common/lavoro/lavoro';
import {RiepiloghiCommon} from '../RiepiloghiCommon';
import {LavoriService} from '../../common/lavoro/lavori.service';
import {LavoroIntervalli} from '../../common/lavoro/LavoroIntervalli';
import { DipendentiService } from 'src/app/dipendenti/dipendenti.service';

@Component({
  selector: 'app-riepilogo-autovetture',
  templateUrl: './riepilogo-autovetture.component.html',
  styleUrls: ['./riepilogo-autovetture.component.css']
})
export class RiepilogoAutovettureComponent extends RiepiloghiCommon {

  constructor(lavoriService: LavoriService, dipendentiService: DipendentiService) {
    super(lavoriService, dipendentiService);
  }

  getIdentificativo(lavoro: Lavoro, intervallo: LavoroIntervalli): string {
    // const inizialiDipendente = intervallo.dipendente.nome.toUpperCase().substr(0, 1) +
    //   intervallo.dipendente.cognome.toUpperCase().substr(0, 1);
    return lavoro.autovettura.targa  + ': ' + intervallo.dipendente.cognome + ' ' + intervallo.dipendente.nome +
     ' (' + intervallo.dipendente.sigla + ') ';
  }
}
