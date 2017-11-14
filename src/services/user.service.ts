import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';
import {Angular2TokenService} from "angular2-token";
import { Response } from '@angular/http';

@Injectable()
export class UserService {


    constructor(private http: HttpClient, private urlService: UrlService, private tokenAuthService: Angular2TokenService) {
    }

    public getUserMe(): any{
      return this.tokenAuthService.get("users/me");
    }


}
