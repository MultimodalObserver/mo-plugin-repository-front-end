import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { PluginComponent } from './plugin/plugin.component';
import { PublishComponent } from './publish/publish.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'plugin/:pluginSlug', component: PluginComponent },
  { path: 'publish', component: PublishComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);
