import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  private user: string;

  private ruolo = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    const name = sessionStorage.getItem('name');
    const lastname = sessionStorage.getItem('lastname');
    this.ruolo = sessionStorage.getItem('ruolo');

    this.user = (name != null ? name : '') + ' ' + (lastname != null ? lastname : '');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private isBoss(): boolean {
    return this.ruolo === 'Capo officina';
  }
}
