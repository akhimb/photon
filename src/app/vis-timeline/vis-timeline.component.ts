import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Timeline } from "vis-timeline";
@Component({
  selector: 'app-vis-timeline',
  templateUrl: './vis-timeline.component.html',
  styleUrls: ['./vis-timeline.component.css']
})
export class VisTimelineComponent implements OnInit {
  @ViewChild("visConfigTimeLine", {
    static: true
  }) VisContainer: ElementRef;
  calls:any[];
  options:any;
  timline: any;
  groups:any;
  selectedNode:any;
  constructor() { }

  ngOnInit() {

  this.calls=[
      {id: 1, content: 'call 1',group:1,title:"9447774476 => 8891901265", start: '2014-04-20 10:00:00', end: '2014-04-20 10:05:00', type: 'box'},
      {id: 2, content: 'call 2',group:1,title:"9447774476 => 9447148454", start: '2014-04-06 09:13:00', end: '2014-04-06 10:05:00', type: 'box'},
      {id: 3, content: 'call 3',group:1,title:"9446023454 => 9447774476", start: '2014-04-18 15:23:14', end: '2014-04-15 15:23:16', type: 'box'},
      {id: 4, content: 'call 4',group:2,title:"9043641504 => 9605102930", start: '2014-04-16 21:22:22', end: '2014-04-16 21:30:00', type: 'box'},
      {id: 5, content: 'call 5',group:2,title:"9043641504 => 9447774476", start: '2014-04-25 23:56:10', end: '2014-04-26 00:01:00', type: 'box'},
      {id: 6, content: 'call 6',group:2,title:"9043641504 => 9447440523", start: '2014-04-27 06:30:00', end: '2014-04-27 06:35:00', type: 'point'}
    ];
this.options={horizontalScroll:true,
max:"2014-04-27",
min:"2014-04-06",
showTooltips:true,
};
this.groups=[
  {
    id: 1,
    content: '9447774476',
    title:"Showing Calls of CDR : 9447774476"
    // Optional: a field 'className', 'style', 'order', [properties]
  },
  {
    id: 2,
    content: '9043641504',
    title:"Showing Calls of CDR : 9043641504"
    // Optional: a field 'className', 'style', 'order', [properties]
  }
  // more groups...
];
this.timline=new Timeline(this.VisContainer.nativeElement, this.calls,this.groups, this.options);
this.setNodeEvents();
  }

  setNodeEvents() {
    const that = this;
    // *** ON SELECT NODE EVENT ***
    this.timline.on('select', function (properties) {
      if (properties.items != undefined && properties.items.length > 0) {
        const nodeID = properties.items[0];
        that.selectedNode = that.getSelectedNode(nodeID);
        console.log(nodeID, that.selectedNode);
        //that.selectNodeEmitter.emit({ selectedNode: that.selectedNode });
      }
    });
  
  }

  getSelectedNode(nodeID: number) {
    const nodeAry = this.calls.filter((call) => {
      return call.id === nodeID;
    });
    return nodeAry[0] || [];
  }


  
    
  

}
