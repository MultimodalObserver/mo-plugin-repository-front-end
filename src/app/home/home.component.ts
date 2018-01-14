import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PluginService } from '../../services/plugin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  plugins: any[];

  searchQuery: string;

  constructor(private titleService: Title, private router: Router, private pluginService: PluginService) { }

  onSubmit(){
    this.router.navigate(['explore'], { queryParams: { q: this.searchQuery }});
  }

  ngOnInit() {
    this.titleService.setTitle("MO Plugins | Home");

    this.pluginService.getLatestPlugins().subscribe(res => {
      this.plugins = <any[]>(res.json());
    });

  }

}
