import {NgModule} from '@angular/core';
import {CommonModule} from '../common/common.module';
import {ElencoAutovettureComponent} from './elenco-autovetture/elenco-autovetture.component';
import {RouterModule} from '@angular/router';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {AutovettureComponent} from './autovetture/autovetture.component';
import {AutovetturaComponent} from './autovettura/autovettura.component';
import {AutovettureRoutingModule} from './autovetture-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { SchedaAutovetturaComponent } from './scheda-autovettura/scheda-autovettura.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    ElencoAutovettureComponent,
    AutovettureComponent,
    AutovetturaComponent,
    SchedaAutovetturaComponent
  ],
    imports: [
        NgxQRCodeModule,
        AutovettureRoutingModule,
        BrowserModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ]
})
export class AutovettureModule { }
