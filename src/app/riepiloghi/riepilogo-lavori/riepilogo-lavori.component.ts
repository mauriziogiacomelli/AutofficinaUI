import { Component, OnInit } from '@angular/core';
import { RiepiloghiCommon } from '../RiepiloghiCommon';
import { LavoriService } from 'src/app/common/lavoro/lavori.service';
import { Lavoro } from 'src/app/common/lavoro/lavoro';
import { LavoroIntervalli } from 'src/app/common/lavoro/LavoroIntervalli';
import { DipendentiService } from 'src/app/dipendenti/dipendenti.service';

@Component({
  selector: 'app-riepilogo-lavori',
  templateUrl: './riepilogo-lavori.component.html',
  styleUrls: ['./riepilogo-lavori.component.css']
})
export class RiepilogoLavoriComponent extends RiepiloghiCommon {

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
