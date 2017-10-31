import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

  signUpUser = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  errors: string = "";

  loading: boolean = false;

  @Output() onFormResult = new EventEmitter<any>();

  constructor(private tokenAuthSerivce:Angular2TokenService) { }

  ngOnInit() {}


  onSignUpSubmit(){

    this.signUpUser.email = this.signUpUser.email.trim();

    if(this.signUpUser.email.length == 0){
      this.errors = "Email is required.";
      return;
    }

    if(this.signUpUser.password.length < 8){
      this.errors = "Password is too short.";
      return;
    }

    if(this.signUpUser.password !== this.signUpUser.passwordConfirmation){
      this.errors = "Passwords don't match."
      return;
    }

    this.loading = true;

    this.tokenAuthSerivce.registerAccount({
      email: this.signUpUser.email,
      password: this.signUpUser.password,
      passwordConfirmation: this.signUpUser.passwordConfirmation
    }).subscribe(

      res => {
        this.loading = false;
        if (res.status == 200){
          this.onFormResult.emit({signedUp: true, res})
          this.errors = "";
        }
      },

      err => {
        this.loading = false;        

        this.onFormResult.emit({signedUp: false, err})

        if(err.json().errors.full_messages[0]){
          this.errors = err.json().errors.full_messages[0];
        } else {
          this.errors = "There was an unknown error while creating your account.";
        }
      });

  }
}
