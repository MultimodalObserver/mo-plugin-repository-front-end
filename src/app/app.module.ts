import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ExploreComponent } from './explore/explore.component';
import { Page2Component } from './page2/page2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ShortenLongStringPipe } from '../pipes/shorten-long-string.pipe';
import { BuildRepoUrlPipe } from '../pipes/build-repo-url.pipe';

import { UrlService } from '../services/url.service';
import { PluginService } from '../services/plugin.service';
import { CategoryService } from '../services/category.service';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { HttpClientModule } from '@angular/common/http';
import { PluginListComponent } from './explore/plugin-list/plugin-list.component';
import { HomeComponent } from './home/home.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

import { MaterializeModule } from "angular2-materialize";
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ExploreComponent,
    Page2Component,
    PageNotFoundComponent,
    ShortenLongStringPipe,
    BuildRepoUrlPipe,
    PluginListComponent,
    HomeComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpModule,
    MaterializeModule,
    HttpClientModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AppRouting
  ],
  providers: [UrlService, PluginService, CategoryService, Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
