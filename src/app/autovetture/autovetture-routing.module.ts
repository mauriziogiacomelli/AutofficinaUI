import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElencoAutovettureComponent} from './elenco-autovetture/elenco-autovetture.component';
import {AutovettureComponent} from './autovetture/autovetture.component';
import {AutovetturaComponent} from './autovettura/autovettura.component';
import {AuthGuard} from '../common/guards/auth.guard';
import {SchedaAutovetturaComponent} from './scheda-autovettura/scheda-autovettura.component';

const autovettureRoutes: Routes = [
  { path: 'autovetture', component: AutovettureComponent, canActivate: [AuthGuard], children: [
      { path: '', component: ElencoAutovettureComponent },
      { path: 'new', component: AutovetturaComponent },
      { path: ':id', component: AutovetturaComponent },
      // { path: ':idLavoro', component: AutovetturaComponent },
      // { path: 'scheda/:id', component: SchedaAutovetturaComponent },
      { path: 'scheda/:id', component: SchedaAutovetturaComponent },
      { path: 'scheda/:id/:idLavoro', component: SchedaAutovetturaComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(autovettureRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AutovettureRoutingModule { }
