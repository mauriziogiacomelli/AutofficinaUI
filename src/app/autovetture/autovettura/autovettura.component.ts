import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AutovettureService} from '../autovetture.service';
import {Autovettura} from '../Autovettura';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-autovettura',
  templateUrl: './autovettura.component.html',
  styleUrls: ['./autovettura.component.css']
})
export class AutovetturaComponent implements OnInit {

  autovetturaForm = this.fb.group({
    id: [''],
    colore: [''],
    cilindrata: [''],
    km: [''],
    annoImmatricolazione: [''],
    carburante: [''],
    numeroPorte: [''],
    proprietario: ['', Validators.required],
    targa: ['', Validators.required],
    marca: ['', Validators.required],
    modello: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private autovettureService: AutovettureService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.loadAutovettura(id);
    }
  }

  loadAutovettura(id: string): void {
    this.autovettureService.load(id).subscribe( autovettura => {
      this.autovetturaForm.controls.colore.setValue(autovettura.colore);
      this.autovetturaForm.controls.cilindrata.setValue(autovettura.cilindrata);
      this.autovetturaForm.controls.km.setValue(autovettura.km);
      this.autovetturaForm.controls.annoImmatricolazione.setValue(autovettura.annoImmatricolazione);
      this.autovetturaForm.controls.carburante.setValue(autovettura.carburante);
      this.autovetturaForm.controls.numeroPorte.setValue(autovettura.numeroPorte);
      this.autovetturaForm.controls.proprietario.setValue(autovettura.proprietario);
      this.autovetturaForm.controls.id.setValue(autovettura.id);
      this.autovetturaForm.controls.targa.setValue(autovettura.targa);
      this.autovetturaForm.controls.marca.setValue(autovettura.marca);
      this.autovetturaForm.controls.modello.setValue(autovettura.modello);
    });
  }

  salvaAutovettura(): void {
    const autovettura = new Autovettura();
    autovettura.colore = this.autovetturaForm.controls.colore.value;
    autovettura.cilindrata = this.autovetturaForm.controls.cilindrata.value;
    autovettura.km = this.autovetturaForm.controls.km.value;
    autovettura.annoImmatricolazione = this.autovetturaForm.controls.annoImmatricolazione.value;
    autovettura.carburante = this.autovetturaForm.controls.carburante.value;
    autovettura.numeroPorte = this.autovetturaForm.controls.numeroPorte.value;
    autovettura.proprietario = this.autovetturaForm.controls.proprietario.value;
    const idAutovettura = this.autovetturaForm.controls.id.value;
    autovettura.id = (idAutovettura != null && +idAutovettura > 0) ? +idAutovettura : null;
    autovettura.targa = this.autovetturaForm.controls.targa.value;
    autovettura.marca = this.autovetturaForm.controls.marca.value;
    autovettura.modello = this.autovetturaForm.controls.modello.value;

    this.autovettureService.save(autovettura).subscribe(id => {
	  if (id < 0) {
		  alert("Errore: targa registrata già!")
		  return;
	  }
      const link = ['/autovetture'];
      this.router.navigate(link);
    });
  }

  clean(): void {
    this.autovetturaForm.reset();
  }
}
