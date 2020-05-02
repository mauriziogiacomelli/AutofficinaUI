import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResponse} from '../login/LoginResponse';
import {Settings} from '../settings';
import {Dipendente} from './Dipendente';
import {Observable} from 'rxjs';
import {GiornataLavorativa} from './GiornataLavorativa';

@Injectable({
  providedIn: 'root'
})
export class DipendentiService {

  private context = '/dipendenti';

  constructor(private http: HttpClient) {
  }

  save(dipendente: Dipendente): Observable<number> {
    return this.http.post<number>(`${Settings.API_REST_ENDPOINT}` + this.context + '/save', dipendente);
  }

  findAll() {
    return this.http.get<Dipendente[]>(`${Settings.API_REST_ENDPOINT}` + this.context + '/findAll');
  }

  load(id: string): Observable<Dipendente> {
    return this.http.get<Dipendente>(`${Settings.API_REST_ENDPOINT}` + this.context + '/load/' + id);
  }
}
