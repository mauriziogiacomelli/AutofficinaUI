import { NgModule } from '@angular/core';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {RouterModule} from '@angular/router';
import {CommonRoutingModule} from './common-routing.module';
import { LogoutComponent } from './logout/logout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { GetValuesPipe } from './pipes/get-values.pipe';

@NgModule({
  declarations: [LeftMenuComponent, LogoutComponent, GetValuesPipe],
  imports: [
    CommonRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LeftMenuComponent,
    LogoutComponent,
    GetValuesPipe
  ],
})
export class CommonModule { }
