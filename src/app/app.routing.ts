import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './explore/explore.component';
import { Page2Component } from './page2/page2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ExploreComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'page2', component: Page2Component },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);
