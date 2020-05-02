import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Settings} from '../settings';
import {Autovettura} from './Autovettura';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutovettureService {

  private context = '/autovetture';

  constructor(private http: HttpClient) {
  }

  save(autovettura: Autovettura): Observable<number> {
    return this.http.post<number>(`${Settings.API_REST_ENDPOINT}` + this.context + '/save', autovettura);
  }

  load(id: string, idLavoro?: string): Observable<Autovettura> {
    if (!idLavoro) {
      return this.http.get<Autovettura>(`${Settings.API_REST_ENDPOINT}` + this.context + '/load/' + id);
    } else {
      return this.http.get<Autovettura>(`${Settings.API_REST_ENDPOINT}` + this.context + '/load/' + id + '/' + idLavoro );
    }
  }

  findAll() {
    return this.http.get<Autovettura[]>(`${Settings.API_REST_ENDPOINT}` + this.context + '/findAll');
  }

  filter(autovettura: Autovettura) {
    return this.http.post<Autovettura[]>(`${Settings.API_REST_ENDPOINT}` + this.context + '/filter', autovettura);
  }
}
