import { Component, TemplateRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular4-notifications';
import { environment } from '../environments/environment';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isCollapsed: boolean = true;

  private sub: any;

  public modalRef: BsModalRef;

  @ViewChild('loginModal')
  private modalTemplate : TemplateRef<any>

  public notificationOptions = {
    timeOut: 3000,
    lastOnBottom: true
  }

  onLoginFormResult(e){
    if(e.signedIn){
      this.modalRef.hide();
      this.notification.success("Logged in", "Welcome!");
    } else {
      //alert(e);
    }
  }

  onResetPasswordInstructionsSentResult(e){
    console.log(e)
    if(e.emailSent){
      this.modalRef.hide();
      this.notification.success("Check your email", e.res.json().message);
      this.authMode = 'login';
    } else {
      //alert(e);
    }
  }

  onResetPasswordChanged(e){
    if(e.changed){
      this.modalRef.hide();
      this.notification.success("Password updated", "Log in again");
      this.authMode = 'login';
    } else {
      this.modalRef.hide();
      this.notification.error("There was an error", "There was an error updating your password");
    }
  }


  onRegisterFormResult(e){
    if(e.signedUp){
      this.modalRef.hide();
      this.notification.success("Successful registration!", "Please see your e-mail");
      this.authMode = 'login';
    } else {
      //alert(e);
    }
  }

  isAdmin(): boolean{
    if(!this.tokenAuthService.userSignedIn()) return false;
    if(this.tokenAuthService.currentUserData == null) return false;
    if((<any>this.tokenAuthService.currentUserData)['role'] == "admin") return true;
    return false;
  }

  signOut(){
    this.tokenAuthService.signOut();
    this.router.navigateByUrl('/');
    this.notification.success("Signed out", null);
    this.authMode = 'login';
  }


  openModal() {
    try { document.activeElement['blur'](); } catch(e){}
    this.modalRef = this.modalService.show(this.modalTemplate);
  }

  getNickName(): string{

    let nickname: string = "Account";

    try {
      nickname = this.tokenAuthService.currentUserData.nickname;
    } catch(e){

    } finally {
      return nickname;
    }
  }


  authMode: 'login' | 'register' | 'resetPassword' = 'login';
  isLoginMode(){ return this.authMode == 'login' }
  isRegisterMode(){ return this.authMode == 'register' }
  isResetPasswordMode(){ return this.authMode == 'resetPassword' }


  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {

      if(params['account_confirmation_success'] == 'true'){
        this.tokenAuthService.validateToken().subscribe(
          res => {
            this.notification.success("Successful confirmation!", "You are now logged in!");
            //console.log(res);
          },
          err => {
            this.notification.success("Successful confirmation!", "Now log in!");
            //console.log(err);
          }
        );
      }

      if(params['reset_password'] == 'true'){
        this.authMode = 'resetPassword';
        this.openModal();
        this.tokenAuthService.validateToken();
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  constructor(public tokenAuthService: Angular2TokenService,
    private modalService: BsModalService,
    private router: Router,
    private platformLocation: PlatformLocation,
    private route: ActivatedRoute,
    private notification: NotificationsService){


    let baseSPAUrl = (platformLocation as any).location.origin;

    this.tokenAuthService.init({
      apiBase: environment.apiBase,
      registerAccountCallback: baseSPAUrl,
      resetPasswordCallback: baseSPAUrl
    });

  }
}
