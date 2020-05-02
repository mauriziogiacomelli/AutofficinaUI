import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { Settings } from '../settings';
import {LoginResponse} from './LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
        const params = new HttpParams().set('username', username).set('password', password);
        return this.http.get<LoginResponse>(`${Settings.API_REST_ENDPOINT}` + '/login', {params});
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    const accessToken: string = sessionStorage.getItem('access_token');
    if (accessToken === null) {
      return false;
    }
    const isExpired = helper.isTokenExpired(accessToken);
    return !isExpired;
  }
}
