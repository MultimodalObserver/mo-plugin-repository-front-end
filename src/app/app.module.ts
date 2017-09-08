import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
