import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DipendentiService} from '../dipendenti.service';
import {Dipendente} from '../Dipendente';
import {Settings} from '../../settings';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-dipendente',
  templateUrl: './dipendente.component.html',
  styleUrls: ['./dipendente.component.css']
})
export class DipendenteComponent implements OnInit {

  @Input()
  uploader: FileUploader = new FileUploader({url: `${Settings.API_REST_ENDPOINT}` + '/dipendenti/upload', disableMultipart: false});

   dipendenteForm = this.fb.group({
    nome: ['', Validators.required],
    sigla: ['', Validators.required],
    cognome: [''],
    via: [''],
    citta: [''],
    cellulare: [''],
    altro: [''],
    ruolo: [''],
    id: [''],
    foto: ['']
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private dipendentiService: DipendentiService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.loadDipendente(id);
    }
  }

  loadDipendente(id: string): Observable<Dipendente> {
    this.dipendentiService.load(id).subscribe( dipendente => {
      this.dipendenteForm.controls.nome.setValue(dipendente.nome);
      this.dipendenteForm.controls.cognome.setValue(dipendente.cognome);
      this.dipendenteForm.controls.via.setValue(dipendente.via);
      this.dipendenteForm.controls.citta.setValue(dipendente.citta);
      this.dipendenteForm.controls.cellulare.setValue(dipendente.cellulare);
      this.dipendenteForm.controls.altro.setValue(dipendente.altro);
      this.dipendenteForm.controls.sigla.setValue(dipendente.sigla);
      this.dipendenteForm.controls.ruolo.setValue(dipendente.ruolo);
      this.dipendenteForm.controls.id.setValue(dipendente.id);
      this.dipendenteForm.controls.foto.setValue(dipendente.foto);
    });

    return null;
  }

  salvaDipendente(): void {
    const dipendente = new Dipendente();
    dipendente.nome = this.dipendenteForm.controls.nome.value;
    dipendente.cognome = this.dipendenteForm.controls.cognome.value;
    dipendente.via = this.dipendenteForm.controls.via.value;
    dipendente.citta = this.dipendenteForm.controls.citta.value;
    dipendente.cellulare = this.dipendenteForm.controls.cellulare.value;
    dipendente.ruolo = this.dipendenteForm.controls.ruolo.value;
    dipendente.sigla = this.dipendenteForm.controls.sigla.value;
    dipendente.altro = this.dipendenteForm.controls.altro.value;
    const idDipendente = this.dipendenteForm.controls.id.value;
    dipendente.id = (idDipendente != null && +idDipendente > 0) ? +idDipendente : null;
    dipendente.foto = this.dipendenteForm.controls.foto.value;

    const lastIndex = this.uploader.queue.length - 1;
    if (lastIndex >= 0) {
      this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
      };
      this.uploader.queue[lastIndex].upload();
      this.uploader.queue[lastIndex].onComplete = (response: string, status: number, headers: any) => {
        const responseObj = JSON.parse(response);
        if (responseObj.success === true) {
          dipendente.foto = responseObj.path;
          this.dipendentiService.save(dipendente).subscribe(id => {
            const link = ['/dipendenti'];
            this.router.navigate(link);
          });
        } else {
          alert('Errore durante il caricamento della foto');
        }
      };
    } else {
      this.dipendentiService.save(dipendente).subscribe(id => {
        const link = ['/dipendenti'];
        this.router.navigate(link);
      });
    }
  }

  clean(): void {
    this.dipendenteForm.reset();
    if (document.getElementById('uploaderFileSelect') != null) {
      (document.getElementById('uploaderFileSelect') as HTMLInputElement).value = '';
    }
  }

}
