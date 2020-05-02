import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiepiloghiRoutingModule } from './riepiloghi-routing.module';
import { RiepilogoDipendentiComponent } from './riepilogo-dipendenti/riepilogo-dipendenti.component';
import { RiepilogoAutovettureComponent } from './riepilogo-autovetture/riepilogo-autovetture.component';
import { RiepiloghiComponent } from './riepiloghi/riepiloghi.component';
import { CommonModule } from '../common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { RiepilogoLavoriComponent } from './riepilogo-lavori/riepilogo-lavori.component';

@NgModule({
  declarations: [
    RiepilogoDipendentiComponent,
    RiepilogoAutovettureComponent,
    RiepiloghiComponent,
    RiepilogoLavoriComponent],
    imports: [
        RiepiloghiRoutingModule,
        RouterModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        NgbDatepickerModule
    ]
})
export class RiepiloghiModule { }
