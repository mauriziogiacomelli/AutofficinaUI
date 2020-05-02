import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RiepilogoDipendentiComponent} from './riepilogo-dipendenti/riepilogo-dipendenti.component';
import {RiepilogoAutovettureComponent} from './riepilogo-autovetture/riepilogo-autovetture.component';
import {AutovettureComponent} from '../autovetture/autovetture/autovetture.component';
import {AuthGuard} from '../common/guards/auth.guard';
import {ElencoAutovettureComponent} from '../autovetture/elenco-autovetture/elenco-autovetture.component';
import {AutovetturaComponent} from '../autovetture/autovettura/autovettura.component';
import {SchedaAutovetturaComponent} from '../autovetture/scheda-autovettura/scheda-autovettura.component';
import {RiepiloghiComponent} from './riepiloghi/riepiloghi.component';
import { RiepilogoLavoriComponent } from './riepilogo-lavori/riepilogo-lavori.component';

const riepiloghiRoutes: Routes = [
  { path: 'riepiloghi', component: RiepiloghiComponent, canActivate: [AuthGuard], children: [
      { path: 'dipendenti', component: RiepilogoDipendentiComponent, canActivate: [AuthGuard] },
      { path: 'autovetture', component: RiepilogoAutovettureComponent, canActivate: [AuthGuard] },
      { path: 'lavori', component: RiepilogoLavoriComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(riepiloghiRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RiepiloghiRoutingModule { }
