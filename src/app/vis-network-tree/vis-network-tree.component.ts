import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Network } from 'vis-network/standalone';
import graph from '../helpers/graph.json';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-vis-network-tree',
  templateUrl: './vis-network-tree.component.html',
  styleUrls: ['./vis-network-tree.component.css']
})
export class VisNetworkTreeComponent implements OnInit {
  @ViewChild("siteConfigNetwork", { static: true }) networkContainer: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('downloadLink', { static: true }) downloadLink: ElementRef;
  public graph:any;
  public network: any;
  public selectedNode: any;
  public nodes: any[];
  public edges: any[];
  EdgesConnected:any;
  NodesConnected:any;
  IdsConnected:string[]=[];
  public isChecked=false;
  constructor() { }

 
  ngOnInit() {   
    this.graph=graph;
    var treeData = this.getTreeData();
    this.loadVisTree(treeData);     
    this.setNodeEvents();
  }

  loadVisTree(treedata) {
    let options = {
      interaction: {
        hover: true,
      },
      manipulation: {
				enabled: true
			}
    };
    options = this.getOptions(this.isChecked);
    var container = this.networkContainer.nativeElement;
    this.network = new Network(container, treedata, options);   
  }

  Checked(values:any)
  {
   this.isChecked=values.currentTarget.checked;
    var treeData = this.getTreeData();
   this.loadVisTree(treeData);
   this.setNodeEvents();

  }

Capture(values:any)
{
  html2canvas(this.networkContainer.nativeElement).then(canvas => {
    this.canvas.nativeElement.src = canvas.toDataURL();
    this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
    this.downloadLink.nativeElement.download = 'vis '+new Date().toLocaleTimeString();
    this.downloadLink.nativeElement.click();
  });;
}

  getTreeData() {  
    this.nodes =this.graph.nodes.filter((node) => {
      return node.group ==="CDR" ;
    });

    // create an array with edges
    this.edges = this.graph.edges;
    var treeData = {
      nodes: this.nodes,
      edges: this.edges
    };
    return treeData;
  }

  
  itemDoubleClick(node:any)
  {
    let isExpanded=false;
    if (node.group != undefined && node.group.length > 0) {
      if(node.group==="CDR")
      isExpanded=node.expanded;
    }

    if(!isExpanded)
    {
      this.EdgesConnected =this.graph.edges.filter((edge) => {
        return edge.from ===node.id ;
      });
    
      
      this.IdsConnected=[];
      this.EdgesConnected.forEach(element => {
        this.IdsConnected.push(element.to);
      });
  
      this.NodesConnected=this.graph.nodes.filter((node)=>{
        return this.IdsConnected.includes(node.id);
      });
  
      //Push those node to current nodes
      this.NodesConnected.forEach(node => {
        if(this.nodes.indexOf(node)===-1)
        this.nodes.push(node);
      });
  
      //push those edges to current edges
      this.EdgesConnected.forEach(edge => {
        if(this.edges.indexOf(edge)===-1)
        this.edges.push(edge);
      });

     if( this.nodes.indexOf(node)!==-1)
     {
       this.nodes[this.nodes.indexOf(node)].expanded=true;
     }
     
    }else
    {
      //already expanded, so make it shrink
      this.EdgesConnected =this.graph.edges.filter((edge) => {
        return edge.from ===node.id ;
      });
    
      
      this.IdsConnected=[];
      this.EdgesConnected.forEach(element => {
        this.IdsConnected.push(element.to);
      });
  
      this.NodesConnected=this.graph.nodes.filter((node)=>{
        return this.IdsConnected.includes(node.id);
      });
  
      let isCDR=false;
      //Remove those node from current nodes
      this.NodesConnected.forEach(node => {
        isCDR=false;
        if (node.group != undefined && node.group.length > 0)
        {
          if(node.group==="CDR")
          isCDR=true;
        }
        if(this.nodes.indexOf(node)!==-1 && isCDR===false)
        this.nodes.splice(this.nodes.indexOf(node),1)
      });

      if( this.nodes.indexOf(node)!==-1)
     {
       this.nodes[this.nodes.indexOf(node)].expanded=false;
     }
    }
  
   


    var treeData = {
      nodes: this.nodes,
      edges: this.edges
    };

    this.loadVisTree(treeData);    
    this.setNodeEvents();
  }

  getOptions(view:any) {

    
      var options = {
          interaction: {
            dragNodes: true,
            dragView: true,
          hover: true,
          keyboard: {
            enabled: true,
            speed: {
              x: 10,
              y: 10,
              zoom: 0.02
            },
            bindToWindow: true
          },
        },
        manipulation: {
          enabled: true,
          initiallyActive: true,
          addNode: false,
          addEdge: false,
          editEdge: false,
          deleteNode: true,
          deleteEdge: true,
        },
        nodes: {
          physics: false,
          borderWidth: 1,
          borderWidthSelected: 2,
          chosen: true,
          color: {
            border: '#2B7CE9',
            background: '#97C2FC',
            highlight: {
              border: '#2B7CE9',
              background: '#D2E5FF'
            },
            hover: {
              border: '#2B7CE9',
              background: '#CEEE'
            }
          },font: {
            color: '#343434',
            size: 14, // px
            face: 'arial',
            background: 'none',
            strokeWidth: 0, // px
            strokeColor: '#ffffff',
            align: 'center',
            multi: false,
            vadjust: 0,
            bold: {
              color: '#343434',
              size: 14, // px
              face: 'arial',
              vadjust: 0,
              mod: 'bold'
            },
            ital: {
              color: '#343434',
              size: 14, // px
              face: 'arial',
              vadjust: 0,
              mod: 'italic',
            },
            boldital: {
              color: '#343434',
              size: 14, // px
              face: 'arial',
              vadjust: 0,
              mod: 'bold italic'
            },
            mono: {
              color: '#343434',
              size: 15, // px
              face: 'courier new',
              vadjust: 2,
              mod: ''
            }
          },
          shape: 'icon',
          icon: {
            face: "'Font Awesome 5 Free'",
            weight: "bold", // Font Awesome 5 doesn't work properly unless bold.
            code: '\uf007',
            size: 20,
            color: 'blue'
          }
        },
        edges: {
            width: 1,
            color: 'black',
            label:'true',
            arrows: {
              to: {
                enabled: true
              },
              from: {
                enabled: false
              }
            }
        },
        groups: {
            CDR: {
              shape: 'icon',
              icon: {
                face: "'Font Awesome 5 Free'",
                weight: "bold", // Font Awesome 5 doesn't work properly unless bold.
                code: '\uf0c0',
                size: 25,
                color: 'red'
              }
            },
            SUSPECT: {
              shape: 'icon',
              icon: {
                face: "'Font Awesome 5 Free'",
                weight: "bold", // Font Awesome 5 doesn't work properly unless bold.
                code: '\uf21b',
                size: 20,
                color: 'green'
              }
            }
        },
          layout: {
    randomSeed: undefined,
    improvedLayout:true,
    clusterThreshold: 150,
    hierarchical: {
      enabled:view,
      levelSeparation: 150,
      nodeSpacing: 100,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'UD',        // UD, DU, LR, RL
      sortMethod: 'hubsize',  // hubsize, directed
      shakeTowards: 'leaves'  // roots, leaves
    }
  }
        
      };
      return options;
  }


  getSelectedNode(nodeID: number) {
    const nodeAry = this.nodes.filter((node) => {
      return node.id === nodeID;
    });    
    return nodeAry[0] || [];
  }


   setNodeEvents() {
        const that = this;

        // *** ON SELECT NODE EVENT ***
        this.network.on("selectNode", function(params) {
            console.log("selectNode Event:", params);            
            if (params.nodes != undefined && params.nodes.length > 0) {
              const nodeID = params.nodes[0];
              that.selectedNode = that.getSelectedNode(nodeID);
              console.log(nodeID, that.selectedNode);
              //that.selectNodeEmitter.emit({ selectedNode: that.selectedNode });
            }            
        });
        this.network.on("doubleClick", function(params) {
          if (params.nodes != undefined && params.nodes.length > 0) {
            const nodeID = params.nodes[0];
           that.itemDoubleClick(that.getSelectedNode(nodeID));
          }
        });
        this.network.on("selectEdge", function(params) {
            //console.log("selectEdge Event:", params);
        });

        
        // this.network.on("beforeDrawing", function(params){  });  // 'before/afterDrawing' fires too many times
        this.network.on("stabilized", function(params) {
            // returns Number of iterations it took; it's the closest thing to a rebuild complete event.
            console.log("REBUILT THE TREE - STABILIZED EVENT OCCURRED...");           
        });
    }

}