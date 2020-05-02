import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DipendentiService } from '../dipendenti.service';
import { Dipendente } from '../Dipendente';
import * as moment from 'moment';
import { Lavoro } from '../../common/lavoro/lavoro';
import { Autovettura } from '../../autovetture/Autovettura';
import { LavoriService } from '../../common/lavoro/lavori.service';
import { timer } from 'rxjs';
import { LavoroIntervalli } from '../../common/lavoro/LavoroIntervalli';
import {Riepilogo} from '../../riepiloghi/Riepilogo';

@Component({
  selector: 'app-giornata-lavorativa',
  templateUrl: './giornata-lavorativa.component.html',
  styleUrls: ['./giornata-lavorativa.component.css']
})
export class GiornataLavorativaComponent implements OnInit {

  private dipendente: Dipendente;
  private listaDipendenti: Dipendente[];
  private riepiloghi: Riepilogo[];

  private giorno: string = moment().format('DD.MM.YYYY');

  @ViewChild('inputQrCode', null) inputQrCode: ElementRef;

  private msgClass: string;

  private msg: string;

  private isBoss: boolean;

  private scadutaLicenza: boolean;

  private loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private lavoriService: LavoriService,
              private dipendentiService: DipendentiService) { }

  ngOnInit() {
    this.isBoss = (sessionStorage.getItem('ruolo') === 'Capo officina');
    const SpecialToDate = moment('14.06.2030', 'DD.MM.YYYY');
    const today = moment(new Date(), 'DD.MM.YYYY');
    // console.log('La licenza scade il : ' + SpecialToDate);
    this.scadutaLicenza = today.diff(SpecialToDate) > 0;
    this.msg = '';
    this.dipendente = new Dipendente();
    timer(0, 500).subscribe(time => { this.inputQrCode.nativeElement.focus(); });
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.dipendentiService.load(id).subscribe(dipendente => this.setDipendente(dipendente));
    }
    this.dipendentiService.findAll().subscribe(listaDipendenti => this.setListaDipendente(listaDipendenti));
    this.lavoriService.riepilogoLavori(this.giorno).subscribe(listaLavoriPerDipendente => this.riepilogoLavori(
      listaLavoriPerDipendente));
  }

  private setListaDipendente(dipendenti: Dipendente[]): void {
    if (!dipendenti) {
      return;
    }
    this.listaDipendenti = dipendenti;
  }

  private riepilogoLavori(listaLavori: Riepilogo[]): void {
    this.riepiloghi = listaLavori;

    this.riepiloghi.forEach(riepilogo => {
      if (riepilogo.dipendente.id === this.dipendente.id) {
        this.dipendente.intervalli = riepilogo.dipendente.intervalli;
      }
    });
    this.loading = false;
  }

  private setDipendente(dipendente: Dipendente): void {
    if (!dipendente) {
      return;
    }
    this.dipendente = dipendente;
  }

  private getLavoro(riepilogo: Riepilogo): string {
    if (!riepilogo.intervalli || riepilogo.intervalli.length === 0) {
      return 'LIBERO';
    }

    return riepilogo.intervalli[0].lavoro.autovettura.targa;
  }

  generaIntervalo(inizio: number, fine: number): number[] {
    const interval: number[] = [];
    for (let i = inizio; i <= fine; i++) {
      interval.push(i);
    }
    return interval;
  }

  getColor(ora: number, minuti: number): string {
    let colore = 'white';
    if (this.dipendente == null) {
      return colore;
    }

    const tempoDaVerificare = moment(this.giorno, 'DD/MM/YYYY').add(minuti, 'm').add(ora, 'h').valueOf();

    if (this.dipendente.intervalli) {
      this.dipendente.intervalli.forEach(intervallo => {
        if (this.convertDate(intervallo.inizio) === this.giorno) {
          const inizioLavoro = moment(intervallo.inizio, 'YYYY-MM-DD HH:mm').add(60, 'm').valueOf();
          const fineLavoro = intervallo.fine != null ? moment(intervallo.fine, 'YYYY-MM-DD HH:mm').add(60, 'm')
            .valueOf() : moment().valueOf();
          if (tempoDaVerificare >= inizioLavoro && tempoDaVerificare <= fineLavoro) {
            colore = '#2f4050';
            return;
          }
        }
      });
    }

    return colore;
  }

  convertDate(giorno): string {
    return giorno.substring(8, 10) + '.' + giorno.substring(5, 7) + '.' + giorno.substring(0, 4);
  }

  /**
   * Pulisce la stringa se per sbaglio è stata valorizzata
   * con valori incorretti.
   */
  private checkAndCleanInputQRCode(qrcode: string): void {
    console.log('QRCode: ' + qrcode);
    if ((!qrcode.startsWith('d') &&
      !qrcode.startsWith('i') &&
      !qrcode.startsWith('f')) ||
      qrcode.length > 100) {
      this.resetInputQrCode();
    }
  }

  processQRCode(): void {
    if (this.loading) {
      return;
    }

    const readQrCode = this.inputQrCode.nativeElement.value;
    this.checkAndCleanInputQRCode(readQrCode);
    if (readQrCode.startsWith('dipendente=') && readQrCode.endsWith('#')) {
      this.dipendente.id = readQrCode.substr(11, readQrCode.length - 1);
      this.loading = true;
      this.dipendentiService.load(this.dipendente.id + '').subscribe(dipendente => {
        if (!dipendente) {
          this.message('Dipendente non trovato', 'errMsg');
        } else {
          this.setDipendente(dipendente);
          this.message('Dipendente scelto: ' + this.dipendente.nome + ' ' + this.dipendente.cognome);
        }
        this.resetInputQrCode();
        this.loading = false;
      });
    } else if (readQrCode.startsWith('inizio_lavoro') && readQrCode.endsWith('#')) {
      if (this.dipendente.id == null) {
        this.message('Si deve scegliere il dipendente prima.', 'errMsg');
        this.resetInputQrCode();
        return;
      }
      const readQrCodeParts = readQrCode.split('|');
      const lavoro = new Lavoro();
      lavoro.id = readQrCodeParts[1];
      lavoro.autovettura = new Autovettura();
      lavoro.autovettura.id = readQrCodeParts[2];
      const intervallo = new LavoroIntervalli();
      intervallo.inizio = moment().toDate();
      intervallo.dipendente = new Dipendente();
      intervallo.dipendente.id = this.dipendente.id;
      intervallo.lavoro = lavoro;
      this.loading = true;
      this.lavoriService.iniziaIntervallo(intervallo).subscribe(res => this.iniziaIntervalloResponse(res));
    } else if (readQrCode.startsWith('fine_lavoro') && readQrCode.endsWith('#')) {
      if (this.dipendente.id == null) {
        this.message('Si deve scegliere il dipendente prima.', 'errMsg');
        this.resetInputQrCode();
        return;
      }
      const readQrCodeParts = readQrCode.split('|');
      const lavoro = new Lavoro();
      lavoro.id = readQrCodeParts[1];
      lavoro.autovettura = new Autovettura();
      lavoro.autovettura.id = readQrCodeParts[2];
      const intervallo = new LavoroIntervalli();
      intervallo.fine = moment().toDate();
      intervallo.dipendente = new Dipendente();
      intervallo.dipendente.id = this.dipendente.id;
      intervallo.lavoro = lavoro;
      this.loading = true;
      this.lavoriService.chiudiIntervallo(intervallo).subscribe(res => this.chiudiIntervalloResponse(res));
    }
  }

  iniziaIntervalloResponse(idLavoro: number): void {
    if (idLavoro < 0) {
      this.message('Lavoro già iniziato !', 'errMsg');
      this.resetInputQrCode();
      this.loading = false;
      return;
    }
    this.message('Lavoro inserito !');
    this.resetInputQrCode();
    this.lavoriService.riepilogoLavori(this.giorno).subscribe(listaLavoriPerDipendente => this.riepilogoLavori(
      listaLavoriPerDipendente));
  }

  private resetInputQrCode(): void {
    this.inputQrCode.nativeElement.value = '';
  }

  chiudiIntervalloResponse(response: boolean): void {
    if (response) {
      this.message('Lavoro è stato chiuso !');
    } else {
      this.message('Lavoro inesistente o già chiuso !', 'errMsg');
    }

    this.resetInputQrCode();
    this.lavoriService.riepilogoLavori(this.giorno).subscribe(listaLavoriPerDipendente => this.riepilogoLavori(
      listaLavoriPerDipendente));
  }

  private message(msg, msgClass = 'okMsg') {
    this.msg = msg;
    this.msgClass = msgClass;
  }
}
