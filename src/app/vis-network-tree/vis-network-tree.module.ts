import { VisNetworkTreeRoutingModule } from './vis-network-tree-routing.module';
import { NgModule } from '@angular/core';
import { VisNetworkTreeComponent } from './vis-network-tree.component';

@NgModule({
  imports: [ VisNetworkTreeRoutingModule],
  declarations: [VisNetworkTreeComponent]
})
export class VisNetworkTreeModule { }
