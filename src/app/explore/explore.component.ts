import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { UrlService } from '../../services/url.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
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

  public pluginModal: BsModalRef;

  currentStatus: Status;
  maxLengthDescription = 300;
  noMorePlugins: boolean;
  private lastPageLoadedSuccessfully: number;
  private tagSlug: string;

  @ViewChild('pluginModalTemplate') pluginModalTemplate: ElementRef;


  constructor(private urlService: UrlService, private pluginService: PluginService, private modalService: BsModalService) {
  }

  private resetSearch() : void {
    this.noMorePlugins = false;
    this.lastPageLoadedSuccessfully = 0;
    this.plugins = [];
    this.tagSlug = null;
  }

  installPlugin(plugin) : void{
    this.currentPluginModal = plugin;
    this.pluginModal = this.modalService.show(this.pluginModalTemplate);
  }

  fetchPlugins() : void {

    this.currentStatus = Status.PLUGINS_LOADING;
    let url: string;

    const params = {
      tagSlug: this.tagSlug,
      page: this.lastPageLoadedSuccessfully + 1
    };


    this.pluginService.getPlugins(params)
    .subscribe(
      data => {

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
      error => {
        this.plugins = [];
        this.currentStatus = Status.ERROR;
        this.lastPageLoadedSuccessfully = 0;
      }
    );
  }

  ngOnDestroy(){
  }


  ngOnInit() {
    this.resetSearch();
    this.fetchPlugins();
  }

}
