import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  loading: boolean = false;

  errors: string = "";

  signInUser = {
    email: '',
    password: ''
  };

  @Output() onFormResult = new EventEmitter<any>();
  constructor(private tokenAuthService:Angular2TokenService) { }

  ngOnInit() {
    this.errors = "";
  }

  onSignInSubmit(){

    if(this.signInUser.email == ""){
      this.errors = "Email missing.";
      return;
    }

    if(this.signInUser.password == ""){
      this.errors = "Password missing.";
      return;
    }

    this.loading = true;

    this.tokenAuthService.signIn(this.signInUser).subscribe(

        res => {
          this.loading = false;

          if(res.status == 200){
            this.errors = "";
            this.onFormResult.emit({signedIn: true, res});
          }
        },

        err => {
          this.loading = false;
          this.onFormResult.emit({signedIn: false, err});
          this.errors = "Incorrect email and/or password.";
        }
    )

  }

}
