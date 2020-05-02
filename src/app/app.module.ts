import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { LoginComponent } from './login/login.component';
import { AutovettureModule } from './autovetture/autovetture.module';
import { DipendentiModule } from './dipendenti/dipendenti.module';
import { RiepiloghiModule } from './riepiloghi/riepiloghi.module';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/login']
      }
    }),
    BrowserModule,
    HttpClientModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    AutovettureModule,
    DipendentiModule,
    RiepiloghiModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  exports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
