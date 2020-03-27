import { VisTimelineComponent } from './vis-timeline.component';
import { NgModule } from '@angular/core';
import { VisTimeLineTreeRoutingModule } from './vis-timeline-routing.module';
@NgModule({
  imports: [ VisTimeLineTreeRoutingModule],
  declarations: [VisTimelineComponent]
})
export class VisTimeLineModule { }
