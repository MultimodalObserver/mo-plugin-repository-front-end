import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { UrlService } from '../../services/url.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Title } from '@angular/platform-browser';
import { Angular2TokenService } from "angular2-token";
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

export enum Status {
  PLUGINS_LOADING, OK, ERROR
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  // Enum reference so the HTML can see it.
  Status = Status;

  plugins: any[] = [];

  currentPluginModal = {};

  searchQuery: string = "";

  private sub: any;

  public pluginModal: BsModalRef;

  currentStatus: Status;
  maxLengthDescription = 300;
  timeOut = null;
  noMorePlugins: boolean;
  private lastPageLoadedSuccessfully: number;


  @ViewChild('pluginModalTemplate') pluginModalTemplate: ElementRef;


  constructor(
    private tokenAuthService: Angular2TokenService,
    private urlService: UrlService,
    private pluginService: PluginService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private titleService: Title) { }

  private resetSearch() : void {
    this.noMorePlugins = false;
    this.lastPageLoadedSuccessfully = 0;
    this.plugins = [];
  }


  searchInputChanged(query){

    this.resetSearch();

    this.currentStatus = Status.PLUGINS_LOADING;

    if(this.timeOut != null){
      clearTimeout(this.timeOut);
    }

    this.timeOut = setTimeout(function(){
      this.search();
    }.bind(this), 800);

  }

  search(){
    this.resetSearch();
    this.fetchPlugins();
  }

  public pluginOwnedByLoggedUser(plugin) : boolean {

    if(!this.tokenAuthService.userSignedIn()) return false;
    if(plugin == null) return false;
    if(typeof this.tokenAuthService.currentUserData === "undefined") return false;

    let id1: number = this.tokenAuthService.currentUserData.id;
    let id2: number = plugin.user_id;
    return id1 == id2;
  }


  installPlugin(plugin) : void {
    this.currentPluginModal = plugin;
    this.pluginModal = this.modalService.show(this.pluginModalTemplate);
  }


  fetchPlugins() : void {

    clearTimeout(this.timeOut);

    this.currentStatus = Status.PLUGINS_LOADING;
    let url: string;

    let query = this.searchQuery.trim();

    const params = {
      page: this.lastPageLoadedSuccessfully + 1
    };

    if(query.trim().length > 0){
      params['q'] = query.trim();
    }

    this.pluginService.getPlugins(params).subscribe(
      data => {

        data = data.json();

        if((<Array<any>>data).length === 0){
          // This means the last page visited doesn't have plugins.
          // Which means that the 'load more' button must disappear.
          this.noMorePlugins = true;
          this.currentStatus = Status.OK;
          return;
        }

        // Union = concatenate and remove duplicates
        this.plugins = _.unionWith(this.plugins, <Array<any>>data, (a, b) => a.id === b.id);

        // Shorten every description
        this.plugins.map((e) => e.description = e.description? e.description.trim() : "");
        this.plugins.map((e) => e.shortDescription = e.description.length > this.maxLengthDescription);

        this.currentStatus = Status.OK;
        this.lastPageLoadedSuccessfully++;
      },
      err => {
        this.plugins = [];
        this.currentStatus = Status.ERROR;
        this.lastPageLoadedSuccessfully = 0;
      });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  ngOnInit() {
    this.titleService.setTitle("MO Plugins | Explore");

    this.sub = this.route.queryParams.subscribe(params => {

      let query: string = params['q'] || "";

      if(query.trim().length == 0){

        // Normal search
        this.resetSearch();
        this.fetchPlugins();
      }

      this.searchQuery = query.trim();

      if(this.searchQuery.length == 0) return;

      this.search();

    });

  }

}
