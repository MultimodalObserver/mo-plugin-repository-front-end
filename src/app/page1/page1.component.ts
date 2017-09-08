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

    this.http.get('https://mo-plugin-repository.herokuapp.com/plugins').subscribe(
      data => {
        this.plugins = data;

        // Shorten every description
        this.plugins.map((e) => e.shortDescription = e.description.length > this.maxLengthDescription);
        this.status = 'OK';
      },
      error => {
        this.plugins = [];
        this.status = 'ERROR';
      }
    );
  }

  ngOnInit() {
    this.plugins = [];
    this.fetchPlugins();
  }

}
