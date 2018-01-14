import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from "angular2-token";
import Utils from '../services/utils';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient, private tokenAuthService: Angular2TokenService) {
    }

    public acceptPlugin(id: number): any{
      return this.tokenAuthService.post(`admin/${id}/accept`, null);
    }

    public rejectPlugin(id: number): any{
      return this.tokenAuthService.post(`admin/${id}/reject`, null);
    }

    public getPendingPlugins(lastId?: number){

      let params: any = {};

      if(lastId != null){
        params["last_id"] = lastId;
      }

      return this.tokenAuthService.get(`admin/pending` + Utils.queryParamsObj(params));
    }


}
