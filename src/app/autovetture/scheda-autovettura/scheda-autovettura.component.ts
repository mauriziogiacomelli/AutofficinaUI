import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Autovettura} from '../Autovettura';
import {ActivatedRoute, Router} from '@angular/router';
import {AutovettureService} from '../autovetture.service';
import {DipendentiService} from '../../dipendenti/dipendenti.service';
import {Dipendente} from '../../dipendenti/Dipendente';
import {Lavoro} from '../../common/lavoro/lavoro';
import {LavoriService} from '../../common/lavoro/lavori.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-scheda-autovettura',
  templateUrl: './scheda-autovettura.component.html',
  styleUrls: ['./scheda-autovettura.component.css']
})
export class SchedaAutovetturaComponent implements OnInit {

  private autovettura: Autovettura = new Autovettura();

  private dipendenti: Dipendente[];

  private idLavoro: number;
  private lavoroDesc: string;

  lavoroForm = this.fb.group({
    descrizione: ['', Validators.required],
    tipologia: ['']
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private dipendentiService: DipendentiService,
              private lavoriService: LavoriService,
              private autovettureService: AutovettureService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const idLavoro = this.route.snapshot.paramMap.get('idLavoro');
    const autovetturaObservable = this.loadAutovettura(id, idLavoro);
  }

  isIdLavoroSet() {
    if (this.idLavoro) {
      return true;
    } else {
      return false;
    }
  }

  loadAutovettura(id: string, idLavoro?: string): void {
    this.autovettureService.load(id, idLavoro).subscribe( autovettura => this.processAutovettura(autovettura));
  }

  processAutovettura(autovettura: Autovettura): void {
    this.autovettura = autovettura;
    this.lavoroDesc = autovettura.lavori[0] != null ? autovettura.lavori[0].descrizione : '';
    // lavoro.tipologia = this.lavoroForm.controls.tipologia.value;
    this.dipendentiService.findAll().subscribe( dipendenti => this.processDipendenti(dipendenti));
  }

  processDipendenti(dipendenti: Dipendente[]): void {
    this.dipendenti = dipendenti;
  }

  qrCodeDipendente(dipendente): string {
    return 'dipendente=' + dipendente.id + '#';
  }

  qrInizioLavoro(): string {
    return 'inizio_lavoro' + '|' + this.idLavoro + '|' + this.autovettura.id + '|#';
  }

  qrFineLavoro(): string {
    return 'fine_lavoro' + '|' + this.idLavoro + '|' + this.autovettura.id + '|#';
  }

  lavoro15(): string {
    return 'lavoro_15';
  }

  lavoro30(): string {
    return 'lavoro_30';
  }

  lavoro60(): string {
    return 'lavoro_60';
  }

  print(): void {
    if (!this.isIdLavoroSet()) {
      const lavoro = new Lavoro();
      lavoro.autovettura = new Autovettura();
      lavoro.autovettura.id = this.autovettura.id;
      lavoro.descrizione = this.lavoroForm.controls.descrizione.value;
      lavoro.tipologia = this.lavoroForm.controls.tipologia.value;
      this.lavoriService.inserisciLavoro(lavoro).subscribe( idLavoro => {
        this.idLavoro = idLavoro;
        setTimeout( () => { window.print(); }, 1000);
      });
    } else {
      window.print();
    }
  }

  printDiv(divName: string) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

  }

  hideForm(): boolean {
    return this.lavoroForm.controls.descrizione.value === '' && this.lavoroForm.controls.tipologia.value === '';
  }
}
