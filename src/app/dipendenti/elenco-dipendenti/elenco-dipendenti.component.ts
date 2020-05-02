import { Component, OnInit } from '@angular/core';
import {DipendentiService} from '../dipendenti.service';
import {Dipendente} from '../Dipendente';
import {Settings} from '../../settings';

@Component({
  selector: 'app-elenco-dipendenti',
  templateUrl: './elenco-dipendenti.component.html',
  styleUrls: ['./elenco-dipendenti.component.css']
})
export class ElencoDipendentiComponent implements OnInit {

  private dipendenti: Dipendente[];

  private fotoUrl: string  = Settings.API_ENDPOINT;

  constructor(private dipendenteService: DipendentiService) { }

  ngOnInit() {
    this.dipendenteService.findAll().subscribe( dipendenti => this.dipendenti = dipendenti);
  }

  private isBoss(dipendente: Dipendente): boolean {
    return dipendente.ruolo === 'Capo officina';
  }
}
