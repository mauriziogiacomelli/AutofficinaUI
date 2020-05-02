import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Settings} from '../../settings';
import {Lavoro, VistaLavori} from './lavoro';
import {LavoroIntervalli } from './LavoroIntervalli';
import {Riepilogo} from '../../riepiloghi/Riepilogo';
import { Dipendente } from 'src/app/dipendenti/Dipendente';

@Injectable({
  providedIn: 'root'
})
export class LavoriService {

  private context = '/lavori';

  constructor(private http: HttpClient) {
  }

  inserisciLavoro(lavoro: Lavoro): Observable<number> {
    return this.http.post<number>(`${Settings.API_REST_ENDPOINT}` + this.context + '/inserisciLavoro', lavoro);
  }

  iniziaIntervallo(intervallo: LavoroIntervalli): Observable<number> {
    return this.http.post<number>(`${Settings.API_REST_ENDPOINT}` + this.context + '/iniziaIntervallo', intervallo);
  }

  chiudiIntervallo(intervallo: LavoroIntervalli): Observable<boolean> {
    return this.http.post<boolean>(`${Settings.API_REST_ENDPOINT}` + this.context + '/chiudiIntervallo', intervallo);
  }

  riepilogoLavori(giorno: string) {
    return this.http.get<Riepilogo[]>(`${Settings.API_REST_ENDPOINT}` +
      this.context + '/riepilogoLavori/' + giorno);
  }

  load(id: string): Observable<Lavoro> {
    return this.http.get<Lavoro>(`${Settings.API_REST_ENDPOINT}` + this.context + '/load/' + id);
  }

  find(giorno: string) {
    return this.http.get<Lavoro[]>(`${Settings.API_REST_ENDPOINT}` + this.context + '/find/' + giorno);
  }

  findDal(giornoDal: string, giornoAl: string) {
    return this.http.get<Lavoro[]>(`${Settings.API_REST_ENDPOINT}` + this.context + '/findDal/' + giornoDal + '/' +giornoAl);
  }

  vistaLavori(giornoDal: Date, giornoAl: Date, targaSelected?: string) {
    return this.http.get<VistaLavori[]>(`${Settings.API_REST_ENDPOINT}` +
    this.context + '/vistaLavori/' + giornoDal + '/' + giornoAl + '/' + (targaSelected === '' ? undefined : targaSelected) );
  }
}
