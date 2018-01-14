import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RecaptchaModule } from 'ng-recaptcha';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ExploreComponent } from './explore/explore.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ShortenLongStringPipe } from '../pipes/shorten-long-string.pipe';
import { BuildRepoUrlPipe } from '../pipes/build-repo-url.pipe';

import { UrlService } from '../services/url.service';
import { PluginService } from '../services/plugin.service';
import { TagService } from '../services/tag.service';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PublishComponent } from './publish/publish.component';
import { PluginComponent } from './plugin/plugin.component';
import { AdminComponent } from './admin/admin.component';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular4-notifications';
import { AccountComponent } from './account/account.component';

import { NormalUserGuard } from "./guards/normal-user.guard";
import { AdminGuard } from "./guards/admin.guard";

@NgModule({
  declarations: [
    AppComponent,
    ExploreComponent,
    PageNotFoundComponent,
    ShortenLongStringPipe,
    BuildRepoUrlPipe,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PublishComponent,
    PluginComponent,
    AccountComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    Ng2AutoCompleteModule,
    SimpleNotificationsModule.forRoot(),
    HttpModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AppRouting
  ],
  providers: [UrlService, PluginService, TagService, UserService, AdminService, NormalUserGuard, AdminGuard, Angular2TokenService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
