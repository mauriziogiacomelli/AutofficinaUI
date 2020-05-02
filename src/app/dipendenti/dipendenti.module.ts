import {NgModule} from '@angular/core';
import {ElencoDipendentiComponent} from './elenco-dipendenti/elenco-dipendenti.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '../common/common.module';
import {DipendenteComponent} from './dipendente/dipendente.component';
import {DipendentiRoutingModule} from './dipendenti-routing.module';
import {DipendentiComponent} from './dipendenti/dipendenti.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FileUploadModule} from 'ng2-file-upload';
import { GiornataLavorativaComponent } from './giornata-lavorativa/giornata-lavorativa.component';

@NgModule({
  declarations: [
    ElencoDipendentiComponent,
    DipendenteComponent,
    DipendentiComponent,
    GiornataLavorativaComponent
  ],
  imports: [
    DipendentiRoutingModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class DipendentiModule { }
