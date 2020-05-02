import { Component, OnInit } from '@angular/core';
import {Autovettura} from '../Autovettura';
import {AutovettureService} from '../autovetture.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-elenco-autovetture',
  templateUrl: './elenco-autovetture.component.html',
  styleUrls: ['./elenco-autovetture.component.css']
})
export class ElencoAutovettureComponent implements OnInit {

  private autovetture: Autovettura[];
  private lavoratori = new Map();

  autovettureForm = this.fb.group({
    targa: [''],
    marca: [''],
    proprietario: [''],
  });

  private config: any;

  constructor(private autovettureService: AutovettureService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params.page ? params.page : 1);
  }

  ngOnInit() {
    this.autovettureService.findAll().subscribe( autovetture => this.setAutovetture(autovetture));
  }

  public setAutovetture(autovetture: Autovettura[]): void {
        this.autovetture = autovetture;
        this.autovetture.forEach(auto => {
          if (auto.lavori != null && auto.lavori.length > 0) {
            auto.lavori.forEach(lavoro => {
              if (lavoro.intervalli != null && lavoro.intervalli.length > 0) {
                lavoro.intervalli.forEach(intervallo => {
                  if (intervallo.fine == null) {
                      this.lavoratori.set(auto.targa, intervallo.dipendente.sigla);
                  }
                });
              }
            })
          }
        });
  }

  public getLavoratoreAttivo(targa: string): string {
    return this.lavoratori.get(targa);
  }

  pageChange(newPage: number) {
    this.router.navigate(['autovetture'], { queryParams: { page: newPage } });
  }

  filter(): void {
    const auto = new Autovettura();
    auto.targa = this.autovettureForm.controls.targa.value;
    auto.marca = this.autovettureForm.controls.marca.value;
    auto.proprietario = this.autovettureForm.controls.proprietario.value;
    this.autovettureService.filter(auto).subscribe( autovetture => {this.autovetture = autovetture; this.pageChange(1)});
  }

}
