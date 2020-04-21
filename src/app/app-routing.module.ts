import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/' },
      { path: '', component: HomePageComponent },
      { path: 'post/:id', component: PostPageComponent }
    ],
    // { path: '**', component: PathNotFoundComponent }
  },
  //{ path: 'admin', loadChildren: '../app/admin/admin.module#AdminModule' }
  { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
