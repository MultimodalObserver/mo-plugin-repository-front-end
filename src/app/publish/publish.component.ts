import { Component, OnInit } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  formStep: number = 1;

  errors: string = "";


  plugin: any = {
    name: "",
    description: "",
    repository: "",
    homepage: "",
    shortName: ""
  };

  fetchingGithubInfo = false;

  creatingPlugin = false;

  githubInfo: any = {
    fullName: "",
    avatar: ""
  };

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

  createPlugin(){

    let p: any = {
      name: this.plugin.name,
      short_name: this.plugin.shortName,
      repo_user: this.parseGithubUserRepo(this.plugin.repository).username,
      repo_name: this.parseGithubUserRepo(this.plugin.repository).repo,
      repo_type: "github"
    };

    this.pluginService.createPlugin(p).subscribe(data => {

      console.log(data.json());
      // go to 'show plugin'
      this.notification.success("Plugin created", "Your plugin was added successfully.");
      this.router.navigateByUrl('/plugin/' + data.json().short_name);


    });

  }

  inputOk(){

    this.fetchingGithubInfo = true;

    if(this.plugin.name.trim().length == 0){
      this.errors = "Plugin name is empty.";
      this.fetchingGithubInfo = false;
      return;
    }

    if(this.parseGithubUserRepo(this.plugin.repository) == null){
      this.errors = "Invalid Github URL.";
      this.fetchingGithubInfo = false;
      return;
    }

    let username = this.parseGithubUserRepo(this.plugin.repository).username;
    let repo = this.parseGithubUserRepo(this.plugin.repository).repo;

    this.plugin.shortName = repo;

    this.pluginService.getGithubInfo<any>(username, repo).subscribe(data => {

      this.formStep = 2;
      this.fetchingGithubInfo = false;
      this.githubInfo.fullName = data.full_name;
      this.githubInfo.avatar = data.owner.avatar_url;
      this.errors = "";

    }, error => {
      this.errors = "Github repository wasn't found.";
      this.fetchingGithubInfo = false;
    });
  }

  constructor(private pluginService: PluginService, private router: Router, private notification: NotificationsService) { }

  ngOnInit() {

    this.formStep = 1;

  }

}
