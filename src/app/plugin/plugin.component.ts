import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { NgZone } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { UrlService } from '../../services/url.service';
import { UserService } from '../../services/user.service';
import { TagService } from '../../services/tag.service';
import { Angular2TokenService } from "angular2-token";
import { Title } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html'
})
export class PluginComponent implements OnInit {

  public modalRef: BsModalRef;
  private sub: any;
  private pluginSlug: string;
  plugin = null;
  pluginEdit = null;
  loading: boolean = false;
  editing: boolean = false;
  newTag: string = "";

  ownPlugin: boolean = false;

  // http://mo.servidor.com/tags?q=:keyword
  tagSearchURL = this.urlService.build(["tags"], { q: ":keyword" });


  constructor(
    public tokenAuthService: Angular2TokenService,
    private route: ActivatedRoute,
    private pluginService: PluginService,
    private userService: UserService,
    private tagService: TagService,
    private notification: NotificationsService,
    private zone: NgZone,
    private modalService: BsModalService,
    private titleService: Title,
    private router: Router,
    private urlService: UrlService) {


  }

  ngOnInit() {

    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
       this.pluginSlug = params['pluginSlug'];

       this.pluginService.showPlugin(this.pluginSlug).subscribe(

        data => {
          this.setCurrentPluginData(data);
          this.loading = false;

          this.userService.getUserMe().subscribe(data => {
            this.ownPlugin = this.plugin.user_id == data.json().id;
          });

       }, err => {
         this.plugin = null;
         this.loading = false;
         this.titleService.setTitle("MO Plugins | Not Found");
       });
    });
  }


  setCurrentPluginData(plugin){
    this.plugin = _.clone(plugin);
    this.pluginEdit = _.clone(this.plugin);
    this.titleService.setTitle("MO Plugins | " + this.plugin.name.trim());
  }

  removeTag(tagId: number){

    this.pluginService.removeTag(this.plugin.id, tagId).subscribe(
      data => {
        let plugin = this.plugin;
        _.remove(plugin.tags, function(tag:any) { return tag.id == tagId });
        this.setCurrentPluginData(plugin);
      },
      err => {
        console.log(err);
      }
    );

  }

  addTag(){

    let tagName = null;

    if(typeof this.newTag === "string"){
      tagName = this.newTag;
    } else {
      tagName = this.newTag['short_name'];
    }

    if(!tagName) return;

    console.assert(typeof tagName === "string" && tagName.length > 0);

    this.pluginService.addTag(this.plugin.id, tagName).subscribe(
      data => {
        let addedTag = data.json();
        let plugin = this.plugin;
        plugin.tags.push(addedTag);
        this.setCurrentPluginData(plugin);
        this.newTag = "";
      },
      err => {
        console.log(err);
      }
    );

  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  autocompleteFormatter(data: any): string {
    return data['short_name'];
  }

  saveEdit(){
    this.pluginService.editPlugin(this.plugin.id, this.pluginEdit).subscribe(
      data => {
        console.log(data);
        this.setCurrentPluginData(data.json());

        this.editing = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  removePlugin(){
    this.pluginService.removePlugin(this.plugin.id).subscribe(
      data => {
        this.notification.success(`${this.plugin.name} was deleted`);
        this.modalRef.hide();
        this.router.navigateByUrl('/explore');
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
