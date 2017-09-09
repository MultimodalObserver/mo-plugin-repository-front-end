import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(private http: HttpClient) {}

  plugins;
  status: string;
  maxLengthDescription: number = 300;

  fetchPlugins(){

    this.status = 'LOADING';

    this.plugins = [{
      name: "plugin name",
      home_page: "https://home.page/",
      repository_url: "https://www.github.com/aaaa/bbbb",
      description: "Description long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text"
    },
    {
      name: "plugin name",
      home_page: "https://home.page/",
      repository_url: "https://www.github.com/aaaa/bbbb",
      description: "Description long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text long text"
    }];

    // Shorten every description
    this.plugins.map((e) => e.shortDescription = e.description.length > this.maxLengthDescription);
    this.status = 'OK';
  }

  ngOnInit() {
    this.plugins = [];
    this.fetchPlugins();
  }

}
