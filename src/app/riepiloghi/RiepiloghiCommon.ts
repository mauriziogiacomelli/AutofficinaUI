import {OnInit} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {Lavoro, VistaLavori} from '../common/lavoro/lavoro';
import {LavoriService} from '../common/lavoro/lavori.service';
import {LavoroIntervalli} from '../common/lavoro/LavoroIntervalli';
import { DipendentiService } from '../dipendenti/dipendenti.service';
import { Dipendente } from '../dipendenti/Dipendente';

export abstract class RiepiloghiCommon implements OnInit {

  constructor(private lavoriService: LavoriService, private dipendentiService: DipendentiService) {
  }

  /**
   * Questo formato di data serve per fare
   * le chiamate lato backend (senza / come separatore)
   */
  giorno: string = moment().format('DD.MM.YYYY');

  giornoDal: Date = new Date();
  giornoAl: Date = new Date();
  targaSelected: string;

  private lavori: Lavoro[];
  private vistaLavori: VistaLavori[];
  private dipendenti: Dipendente[];

  minutiLavorativi = this.generaIntervalo(1, 780);

  oreLavorative = this.generaIntervalo(7, 19);

  riepiloghi = new Map();

  blu = '#2f4050';

  abstract getIdentificativo(lavoro: Lavoro, intervallo: LavoroIntervalli): string;

  ngOnInit() {
    this.lavoriService.find(this.giorno).subscribe(lavori => this.setLavori(lavori));
    this.dipendentiService.findAll().subscribe( dipendenti => this.processDipendenti(dipendenti));
  }

  private decodeDipendenteFromId(idDipendente: string): string {
    for (let i = 0; i < this.dipendenti.length; i++) {
      if (this.dipendenti[i].id + '' === idDipendente  ) {
        return this.dipendenti[i].nome + this.dipendenti[i].cognome + '[' + this.dipendenti[i].sigla + ']';
      }
    }
  }
  setLavoriOnly(lavori: Lavoro[]) {
    this.lavori = lavori;
  }

  setLavori(lavori: Lavoro[]) {
    this.lavori = lavori;

    this.riepiloghi.clear();
    this.lavori.forEach(lavoro => {
      if (lavoro.intervalli) {
        lavoro.intervalli.forEach(intervallo => {
          const minutiLavorativi: string[] = [];
          for (let i = 1; i <= 780; i++) {
            minutiLavorativi[i] = 'white';
          }
          this.riepiloghi.set(this.getIdentificativo(lavoro, intervallo), minutiLavorativi);
        });
      }
    });
    this.buildRiepiloghi();
  }

  generaIntervalo(inizio: number, fine: number): number[] {
    const interval: number[] = [];
    for (let i = inizio; i <= fine; i++) {
      interval.push(i);
    }
    return interval;
  }

  /**
   * Converte una data da formato postgresql nel format DD/MM/AAAA
   *
   * @param giorno - deve essere nel formato postgresql
   */
  getGiorno(giorno): string {
    return this.giorno.substring(8, 10) + '/' + this.giorno.substring(5, 7) + '/' + this.giorno.substring(0, 4);
  }

  getGiornoDalFiltro(event: NgbDate): void {
    const day = event.day.toString().length < 2 ? '0' + event.day : event.day;
    const month = event.month.toString().length < 2 ? '0' + event.month : event.month;
    this.giorno = day + '.' + month + '.' + event.year;
  }

  getGiornoDalFiltroDal(event: NgbDate): void {
    const day = event.day.toString().length < 2 ? '0' + event.day : event.day;
    const month = event.month.toString().length < 2 ? '0' + event.month : event.month;
    this.giornoDal = new Date(event.year, event.month - 1, event.day);
  }

  getGiornoDalFiltroAl(event: NgbDate): void {
    const day = event.day.toString().length < 2 ? '0' + event.day : event.day;
    const month = event.month.toString().length < 2 ? '0' + event.month : event.month;
    this.giornoAl = new Date(event.year, event.month - 1, event.day + 1);
  }



  getColor(targa, minuto: number): string {
    return this.riepiloghi.get(targa)[minuto];
  }

  getTarghe(): Array<string> {
    return Array.from(this.riepiloghi.keys());
  }

  formattaData(data: string) {
    const dataFormattata = moment(data, 'YYYY-MM-DD HH:mm');
    return moment.utc(dataFormattata).format('DD-MM-YYYY HH:mm');
  }

  calcolaTempo(start: string, fine: string) {
    const inizioLavoro = moment(start, 'YYYY-MM-DD HH:mm');
    const fineLavoro = moment(fine, 'YYYY-MM-DD HH:mm');
    return moment.utc(fineLavoro.diff(inizioLavoro)).format('HH:mm:ss');
    // return 10;
  }

  buildRiepiloghi(): void {
    for (const key of Array.from(this.riepiloghi.keys())) {
      let minutiLavorati = 0;
      for (let minuto = 0; minuto <= 780; minuto++) {
        const tempoDaVerificare = moment(this.giorno, 'DD/MM/YYYY').add(minuto, 'm').add(6, 'h').valueOf();
        const tempoDaVerificareTMP = moment(this.giorno, 'DD/MM/YYYY').add(minuto, 'm').add(6, 'h').format('DD/MM/YYYY HH:mm');

        this.lavori.forEach(lavoro => {
          if (lavoro.intervalli) {
            lavoro.intervalli.forEach(intervallo => {
              if (this.getIdentificativo(lavoro, intervallo) === key) {
                const inizioLavoro = moment(intervallo.inizio, 'YYYY-MM-DD HH:mm').valueOf();
                const fineLavoro = intervallo.fine != null ? moment(intervallo.fine, 'YYYY-MM-DD HH:mm').valueOf() :
                  moment().subtract(1, 'h').valueOf();
                if (tempoDaVerificare >= inizioLavoro && tempoDaVerificare < fineLavoro) {
                  this.riepiloghi.get(key)[minuto] = this.blu;
                  minutiLavorati++;
                }
              }
            });
          }
        });
      }
      this.riepiloghi.get(key)[781] = '' + Math.floor(minutiLavorati / 60) + ' ore, ' + minutiLavorati % 60 + ' minuti';
    }
  }

  onDateSelect(event: NgbDate): void {
    this.getGiornoDalFiltro(event);
    this.lavoriService.find(this.giorno).subscribe(lavori => this.setLavori(lavori));
  }

  onDateSelectDal(event: NgbDate): void {
    console.log('im in onDateSelectDal');
    this.getGiornoDalFiltroDal(event);
  }

  onDateSelectAl(event: NgbDate): void {
    console.log('im in onDateSelectAl');
    this.getGiornoDalFiltroAl(event);
  }

  onTargaSelect(event: any): void {
    console.log('im in onTargaSelect' + event);
    this.targaSelected = event.target.value;
  }

  processDipendenti(dipendenti: Dipendente[]): void {
    this.dipendenti = dipendenti;
  }

  getVistaLavori() {
    this.lavoriService.vistaLavori(this.giornoDal, this.giornoAl, this.targaSelected).subscribe(
      vistaLavori => this.setVistaLavori(vistaLavori));
  }

  setVistaLavori(vistaLavori: VistaLavori[]) {
    for (let i = 0 ; i < vistaLavori.length; i++) {
      vistaLavori[i].decodeDipendente = this.decodeDipendenteFromId(vistaLavori[i].idDipendente);
    }
    this.vistaLavori = vistaLavori;
  }

}
