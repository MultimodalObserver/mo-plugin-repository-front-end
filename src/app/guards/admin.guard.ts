import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Guard } from "./guard";
import { Angular2TokenService } from "angular2-token";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NotificationsService } from 'angular4-notifications';

@Injectable()
export class AdminGuard extends Guard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService, protected router:Router, protected notification: NotificationsService){
    super(router, notification);
  }

  canActivate() : Observable<boolean> | boolean {

    if(this.authTokenService.userSignedIn()){

      return this.authTokenService.validateToken().map(res => {

        let userMap = <any>this.authTokenService.currentUserData;
        if(userMap.role == "admin"){
          return true;
        } else {
          this.unauthorize({ admin: true });
          return false;
        }
      });

    } else{
      this.unauthorize();
      return false;
    }
  }

}
