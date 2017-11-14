import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgZone } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { UrlService } from '../../services/url.service';
import { UserService } from '../../services/user.service';
import { TagService } from '../../services/tag.service';
import { Angular2TokenService } from "angular2-token";
import * as _ from 'lodash';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html'
})
export class PluginComponent implements OnInit {

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
    private zone: NgZone,
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
       });
    });
  }


  setCurrentPluginData(plugin){
    this.plugin = _.clone(plugin);
    this.pluginEdit = _.clone(this.plugin);
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
