import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from "angular2-token";
import { Response } from '@angular/http';
import Utils from '../services/utils';

@Injectable()
export class PluginService {


    constructor(private http: HttpClient, private tokenAuthService: Angular2TokenService) {
    }

    public getGithubInfo(username: string, repo: string): any{
      let repoApi = `https://api.github.com/repos/${username}/${repo}`;
      return this.http.get(repoApi);
    }

    public getLatestPlugins(): any{
      return this.tokenAuthService.get(`plugins?latest=true`);
    }

    public showPlugin(pluginSlug: string): any{
      return this.tokenAuthService.get(`plugins/${pluginSlug}`);
    }

    public removeTag(pluginId: number, tagId: number){
      return this.tokenAuthService.delete(`plugins/${pluginId}/tags/${tagId}`);
    }

    public removePlugin(pluginId: number){
      return this.tokenAuthService.delete(`plugins/${pluginId}`);
    }

    public addTag(pluginId: number, tagName: string){
      return this.tokenAuthService.post(`plugins/${pluginId}/tags`, {
        tag_name: tagName
      });
    }

    public editPlugin(id: number, plugin: any): any{
      return this.tokenAuthService.put(`plugins/${id}`, plugin);
    }

    public createPlugin(plugin: any): any{
      return this.tokenAuthService.post("plugins", plugin);
    }


    public getPlugins(params: any) : any {
      if(!params.hasOwnProperty('page')){
        params.page = 1;
      }

      if(params.hasOwnProperty('filterTag')){
        return this.tokenAuthService.get(`tags/${params['filterTag']}/plugins` + Utils.queryParamsObj(params));
      } else {
        return this.tokenAuthService.get(`plugins` + Utils.queryParamsObj(params));
      }

    }

}
