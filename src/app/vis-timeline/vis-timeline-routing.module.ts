import { VisTimelineComponent } from './vis-timeline.component';
import {
    NgModule
  } from '@angular/core';
  import {
    RouterModule,
    Routes
  } from '@angular/router';
  
  const VisTimeLineRoutes: Routes = [
    { path: '', component: VisTimelineComponent    }    ];
  
      @NgModule({
        imports: [
          RouterModule.forChild(VisTimeLineRoutes),
        ],
        exports: [RouterModule]
      })
      export class VisTimeLineTreeRoutingModule {}