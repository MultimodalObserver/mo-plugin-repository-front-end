import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UrlService } from '../../services/url.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Title } from '@angular/platform-browser';
import { Angular2TokenService } from "angular2-token";
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular4-notifications';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public modalRef: BsModalRef;
  pendingPlugins = [];
  lastId: number = null;
  hasMore: boolean = true;
  loadingMore: boolean = true;
  changingStatus: boolean = false;
  currentPluginModal: any = null;

  constructor(
    private adminService: AdminService,
    private titleService: Title,
    private notification: NotificationsService,
    private modalService: BsModalService){}

  public openModal(template: TemplateRef<any>, plugin) {
    this.currentPluginModal = plugin;
    this.modalRef = this.modalService.show(template);
    console.log(plugin);
  }

  acceptPlugin(plugin: any) : void {
    this.changingStatus = true;
    this.adminService.acceptPlugin(this.currentPluginModal.id).subscribe(
      data => {
        let p = _.find(this.pendingPlugins, function(o) { return o.id == this.currentPluginModal.id; }.bind(this));
        p.status = data.json().status;
        this.modalRef.hide();
        this.notification.success("Accepted successfully", "The plugin was accepted.");
      },
      err => {
        this.notification.error("Error", "An error occurred, please try again.");
      },
      () => {
        this.changingStatus = false;
      }
    );
  }

  rejectPlugin(plugin){
    this.changingStatus = true;
    this.adminService.rejectPlugin(this.currentPluginModal.id).subscribe(
      data => {
        let p = _.find(this.pendingPlugins, function(o) { return o.id == this.currentPluginModal.id; }.bind(this));
        p.status = data.json().status;
        this.modalRef.hide();
        this.notification.success("Rejected successfully", "The plugin was rejected.");
      },
      err => {
        this.notification.error("Error", "An error occurred, please try again.");
      },
      () => {
        this.changingStatus = false;
      }
    );
  }

  loadMore(){

    this.loadingMore = true;

    this.adminService.getPendingPlugins(this.lastId).subscribe(
      data => {

        if(data.json().length == 0){
          this.hasMore = false;
          return;
        }

        this.pendingPlugins = this.pendingPlugins.concat(data.json());
        this.lastId = this.pendingPlugins[this.pendingPlugins.length - 1].id;
      },

      err => {
      },

      () => {
        this.loadingMore = false;
      }
    );
  }

  ngOnDestroy(){
  }

  ngOnInit() {
    this.titleService.setTitle("MO Plugins | Manage");

    this.loadMore();

  }

}
