import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  loading: boolean = false;
  accountEmail: string = "";
  errors: string = "";
  sub: any;
  resetPassMap: any = null;

  @Output() onResetPasswordInstructionsSentResult = new EventEmitter<any>();
  @Output() onResetPasswordChanged = new EventEmitter<any>();


  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {

      if(params['reset_password'] == 'true'){
        this.resetPassMap = {
          email: params['uid'],
          token: params['token'],
          pass1: "",
          pass2: ""
        };
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(private tokenAuthSerivce:Angular2TokenService, private route: ActivatedRoute){ }


  changePassword(){

    if(this.resetPassMap.pass1.length < 8){
      this.errors = "Password is too short.";
      return;
    }

    if(this.resetPassMap.pass1 !== this.resetPassMap.pass2){
      this.errors = "Passwords don't match."
      return;
    }

    this.loading = true;

    this.tokenAuthSerivce.updatePassword({
      password:             this.resetPassMap.pass1,
      passwordConfirmation: this.resetPassMap.pass2,
      resetPasswordToken:   this.resetPassMap.token,
    }).subscribe(
        res => {
          this.loading = false;
          this.errors = "";
          this.onResetPasswordChanged.emit({ changed: true, res });
        },
        error => {
          this.loading = false;
          let defaultError = "There was an error.";
          try {
            this.errors = error.json().errors[0];
          } catch(e){
            this.errors = defaultError;
          }
        }
    );

  }


  requestPassword(){
    this.loading = true;
    this.tokenAuthSerivce.resetPassword({ email: this.accountEmail })
    .subscribe(
        res => {

          this.loading = false;
          this.onResetPasswordInstructionsSentResult.emit({
            emailSent: true, res
          });
        },
        error => {
          this.loading = false;
          let defaultError = "There was an error.";
          try {
            this.errors = error.json().errors[0];
          } catch(e){
            this.errors = defaultError;
          }
        }
    );
  }

}
