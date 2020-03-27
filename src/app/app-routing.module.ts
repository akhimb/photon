
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//#region Components
import { CustomPreloadingService } from './helpers/custom-preloading.service';
import { PageNotFoundComponent } from './helpers/page-not-found.component';
//#endregion


const appRoutes: Routes = [
  {  path: '',  redirectTo: 'vis-network-tree',  pathMatch: 'full'},
  {  path: 'vis-network-tree', data: {preload: false}, loadChildren: './vis-network-tree/vis-network-tree.module#VisNetworkTreeModule'},
  {  path: 'vis-timeline', data: {preload: false},  loadChildren: './vis-timeline/vis-timeline.module#VisTimeLineModule'},
  {  path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: CustomPreloadingService}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
