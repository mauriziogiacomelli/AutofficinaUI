import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DipendenteComponent } from './dipendente/dipendente.component';
import {DipendentiComponent} from './dipendenti/dipendenti.component';
import {ElencoDipendentiComponent} from './elenco-dipendenti/elenco-dipendenti.component';
import {AuthGuard} from '../common/guards/auth.guard';
import {GiornataLavorativaComponent} from './giornata-lavorativa/giornata-lavorativa.component';

const dipendentiRoutes: Routes = [
  { path: 'dipendenti', component: DipendentiComponent, children: [
      { path: '', component: ElencoDipendentiComponent, canActivate: [AuthGuard] },
      { path: 'new', component: DipendenteComponent, canActivate: [AuthGuard] },
      { path: 'giornataLavorativa/:id', component: GiornataLavorativaComponent, canActivate: [AuthGuard] },
      { path: 'giornataLavorativa', component: GiornataLavorativaComponent },
      { path: ':id', component: DipendenteComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dipendentiRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DipendentiRoutingModule { }
