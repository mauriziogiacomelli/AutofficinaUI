import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {LoginResponse} from './LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: LoginService) {
  }

  login(): void {
    this.userService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).
      subscribe( loginResponse => this.enter(loginResponse), error => alert('Credenziali errate') );
  }

  enter(loginResponse: LoginResponse) {
    if (loginResponse != null && loginResponse.access_token != null) {
      sessionStorage.setItem('access_token', loginResponse.access_token);
      sessionStorage.setItem('name', loginResponse.name);
      sessionStorage.setItem('lastname', loginResponse.lastname);
      sessionStorage.setItem('ruolo', loginResponse.ruolo);
      sessionStorage.setItem('id', String(loginResponse.id));
      let link = [];
      if (loginResponse.ruolo === 'Capo officina') {
        link = ['/dipendenti'];
      } else {
        link = ['/dipendenti/giornataLavorativa/'];
      }
      this.router.navigate(link);
    }
  }
}
