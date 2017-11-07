import { Component, TemplateRef } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { UrlService } from "../services/url.service";
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isCollapsed: boolean = true;

  public modalRef: BsModalRef;

  onLoginFormResult(e){
    if(e.signedIn){
      this.modalRef.hide();
    } else {
      //alert(e);
    }
  }

  onRegisterFormResult(e){
    if(e.signedUp){
      this.modalRef.hide();
    } else {
      //alert(e);
    }
  }

  signOut(){
    this.tokenAuthService.signOut();
    this.router.navigateByUrl('/');
  }


  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  authMode: 'login' | 'register' = 'login';
  isLoginMode(){ return this.authMode == 'login' }
  isRegisterMode(){ return this.authMode == 'register' }

  constructor(public tokenAuthService: Angular2TokenService, private urlService: UrlService, private modalService: BsModalService, private router: Router){

    let url = this.urlService.baseUrl;

    tokenAuthService.init({
      apiBase: url.substr(0, url.length-1)
    });
  }


}
