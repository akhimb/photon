import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { VisNetworkTreeComponent } from './vis-network-tree.component';

const VisNetworkTreeRoutes: Routes = [
  { path: '', component: VisNetworkTreeComponent    }    ];

    @NgModule({
      imports: [
        RouterModule.forChild(VisNetworkTreeRoutes),
      ],
      exports: [RouterModule]
    })
    export class VisNetworkTreeRoutingModule {}