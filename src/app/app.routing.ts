import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './explore/explore.component';
import { Page2Component } from './page2/page2.component';
import { HomeComponent } from './home/home.component';
import { PluginListComponent } from './explore/plugin-list/plugin-list.component';
import { PublishComponent } from './publish/publish.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'explore',
    component: ExploreComponent,
    children: [
      { path: '', component: PluginListComponent },
      { path: ':categorySlug', component: PluginListComponent }
    ]
  },
  { path: 'publish', component: PublishComponent },
  { path: 'page2', component: Page2Component },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);
