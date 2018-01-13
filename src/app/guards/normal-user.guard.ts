import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Angular2TokenService } from "angular2-token";
import { Guard } from "./guard";
import { NotificationsService } from 'angular4-notifications';

@Injectable()
export class NormalUserGuard extends Guard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService, protected router:Router, protected notification: NotificationsService){
    super(router, notification);
  }

  canActivate(): boolean {
    if(this.authTokenService.userSignedIn()){
      return true;
    } else{
      this.unauthorize();
      return false;
    }
  }

}
