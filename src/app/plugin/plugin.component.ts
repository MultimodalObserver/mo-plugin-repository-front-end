import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { NgZone } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { UserService } from '../../services/user.service';
import { TagService } from '../../services/tag.service';
import { Angular2TokenService } from "angular2-token";
import { Title } from '@angular/platform-browser';
import { NotificationsService } from 'angular4-notifications';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
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
    private router: Router) {

  }

  pluginUrl(pluginShortName: string) : string{
    return environment.apiBase + "/plugins/" + pluginShortName;
  }

  public isOwnPlugin(): boolean{

    if(!this.tokenAuthService.userSignedIn()) return false;
    if(this.plugin == null) return false;
    if(typeof this.tokenAuthService.currentUserData === "undefined") return false;

    let id1: number = this.tokenAuthService.currentUserData.id;
    let id2: number = this.plugin.user_id;
    return id1 == id2;

  }

  ngOnInit() {

    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
       this.pluginSlug = params['pluginSlug'];

       this.pluginService.showPlugin(this.pluginSlug).subscribe(

        data => {
          data = data.json();
          this.setCurrentPluginData(data);
          this.loading = false;

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

    tagName = tagName.trim();

    console.assert(typeof tagName === "string" && tagName.length > 0);

    for(let i=0; i<this.plugin.tags.length; i++){
      if(this.plugin.tags[i].short_name.toLowerCase() == tagName){
        // Already exists
        return;
      }
    }

    this.pluginService.addTag(this.plugin.id, tagName).subscribe(
      data => {
        let addedTag = data.json();
        let plugin = this.plugin;
        plugin.tags.push(addedTag);
        this.setCurrentPluginData(plugin);
        this.newTag = "";
      },
      err => {
        this.notification.error("Error", "Tag couldn't be added. Try using letters, numbers and dashes.");
        console.log(err);
      }
    );

  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hasNoTags(){

    if(this.plugin == null) return true;
    if(!this.plugin.hasOwnProperty('tags')) return true;
    if(!this.plugin.tags.hasOwnProperty('length')) return true;
    return this.plugin.tags.length == 0;
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
        this.notification.success(`${this.plugin.name} was deleted`, null);
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
    this.plugin = null;
    this.pluginEdit = null;
  }

}
