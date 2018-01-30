import { Component, OnInit } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular4-notifications';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  formStep: number = 1;

  plugin: any = {
    name: "",
    description: "",
    repository: "",
    homepage: "",
    shortName: ""
  };

  fetchingGithubInfo = false;

  creatingPlugin = false;

  captchaResponse: string = "";

  recaptchaKey: string;

  githubInfo: any = {
    fullName: "",
    avatar: ""
  };

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse == null? "" : captchaResponse;
  }


  parseGithubUserRepo(url: string){
    url = url.toLowerCase();
    url = url.trim();
    if(url.length == 0) return null;
    let githubRegex = new RegExp(/https?:\/\/(?:www.)?github.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)/);
    let result = url.match(githubRegex);
    if(result == null) return null;
    return {
      username: result[1].trim(),
      repo: result[2].trim()
    };
  }

  slugExists(slug: string, callback:any){
    this.pluginService.showPlugin(slug).subscribe(
      data => {
        callback(true);
      },
      err => {
        callback(false);
      }
    );
  }

  createPlugin(){

    let p: any = {
      name: this.plugin.name,
      short_name: this.plugin.shortName,
      repo_user: this.parseGithubUserRepo(this.plugin.repository).username,
      repo_name: this.parseGithubUserRepo(this.plugin.repository).repo,
      description: this.plugin.description,
      home_page: this.plugin.homepage,
      repo_type: "github",
      'g-recaptcha-response': this.captchaResponse
    };

    this.creatingPlugin = true;

    this.pluginService.createPlugin(p).subscribe(

      data => {

      // go to 'show plugin'
      this.notification.success("Plugin created", "Your plugin was added successfully.");
      this.router.navigateByUrl('/plugin/' + data.json().short_name);


    }, err => {

      console.log(err);
      this.creatingPlugin = false;

      try{
        this.notification.error("Error", err.json().short_name[0]);
      } catch(e){
        this.notification.error("Error", "Plugin couldn't be added.");
      }
    });

  }

  inputOk(){

    this.fetchingGithubInfo = true;

    if(this.plugin.name.trim().length == 0){
      this.notification.error("Invalid plugin name", "Name can't be empty!.");
      this.fetchingGithubInfo = false;
      return;
    }

    if(this.parseGithubUserRepo(this.plugin.repository) == null){

      this.notification.error("Invalid repository", "You must use a valid Github repository.");
      this.fetchingGithubInfo = false;
      return;
    }

    let username = this.parseGithubUserRepo(this.plugin.repository).username;
    let repo = this.parseGithubUserRepo(this.plugin.repository).repo;

    this.plugin.shortName = repo;

    this.pluginService.getGithubInfo(username, repo).subscribe(data => {

      this.formStep = 2;
      this.fetchingGithubInfo = false;
      this.githubInfo.fullName = data.full_name;
      this.githubInfo.avatar = data.owner.avatar_url;

    }, error => {
      this.notification.error("Invalid repository", "Repository wasn't found. Are you sure it exists?.");
      this.fetchingGithubInfo = false;
    });
  }

  constructor(
    private pluginService: PluginService,
    private router: Router,
    private notification: NotificationsService,
    private titleService: Title) {
      this.recaptchaKey = environment.recaptchaKey;
    }

  ngOnInit() {

    this.titleService.setTitle("MO Plugins | Publish plugin");
    this.formStep = 1;

  }

}
