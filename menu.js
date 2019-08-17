"use strict";
var images_pc=["icons/laptop.png","icons/fixed_pc.png"];
var images_cables=["icons/straight","icons/crossover","icons/fiber"];
var images_router=["icons/router1"];
var images_switch=["icons/switch1","icons/switch2"];


function LoadInfoPc(){
  var elem=new endpoint_info();
  elem.src="icons/laptop.png";
  elem.num_interface_eth=1;
  endpoint_info_array.push(elem);
  elem=new endpoint_info();
  elem.src="icons/fixed_pc.png";
  elem.num_interface_eth=1;
  endpoint_info_array.push(elem);
}
  //0 etehrenet
  //1 fiber
function LoadInfoSwitch(){
  var elem=new switch_info();
  elem.src="icons/switch1.png";
  elem.inter_fiber=1;
  elem.inter_ethernet=3;
  switch_info_array.push(elem);
  elem=new switch_info();
  elem.src="icons/switch2.png";
  elem.inter_fiber=3;
  elem.inter_ethernet=2;
  switch_info_array.push(elem);
}
  //0 etehrenet
  //1 fiber
function LoadInfoRouter(){
  var elem=new router_info();
  elem.src="icons/router1.png";
  elem.inter_fiber=1;
  elem.inter_ethernet=2;
  router_info_array.push(elem);
}
  
function CleanMenu(){
  for(var j=0;j<7;j++){
    var list = document.getElementById(j);
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }
}

function CreateMenuPC(){
  CleanMenu();
  for(var j=0;j<endpoint_info_array.length;j++){
    var li = document.getElementById(j);
    li.setAttribute("class",0);
    var content=""+"<img src='"+endpoint_info_array[j].src+ "' width=100%>";
    li.innerHTML=content;
    li.addEventListener("click",function select(){ restore_cursor();
    selected=this.id;creation=this.className;scen[flow].selected_cable=null;});  
    li.addEventListener("mouseover",function select(j){ 
      setDescription("PC<br><br>  Ethernet Interface: "+endpoint_info_array[this.id].num_interface_eth);   
    });
  }
}
  
function CreateMenuRouter(){
  CleanMenu();
  for(var j=0;j<images_router.length;j++){
    var li = document.getElementById(j);
    li.setAttribute("class",3);
    var content=""+"<img id="+images_router[j]+" src='"+images_router[j]+ ".png' width=100%>";
    li.innerHTML=content;
    li.addEventListener("click",function select(){ restore_cursor();
      selected=this.id; creation=this.className;scen[flow].selected_cable=null;});  
    }
    li.addEventListener("mouseover",function select(){ 
      setDescription("ROUTER<br><br> Ethernet Interface: "+router_info_array[this.id].inter_ethernet
      +"<br> Fiber Interface: "+router_info_array[this.id].inter_fiber);
    });
  }

function CreateMenuSwitch(){
  CleanMenu();
  for(var j=0;j<images_switch.length;j++){
    var li = document.getElementById(j);
    li.setAttribute("class",2);
    var content=""+"<img id="+images_switch[j]+" src='"+images_switch[j]+ ".png' width=100%>";
    li.innerHTML=content;
    li.addEventListener("click",function select(){ restore_cursor();
    selected=this.id; creation=this.className;scen[flow].selected_cable=null;});  
    li.addEventListener("mouseover",function select(j){ 
      setDescription("SWITCH<br><br> Ethernet Interface: "+switch_info_array[this.id].inter_ethernet
      +"<br> Fiber Interface: "+switch_info_array[this.id].inter_fiber);
    });
  }
}
  
function CreateMenuCables(){
  CleanMenu();
  for(var j=0;j<images_cables.length;j++){
    var li = document.getElementById(j);
    li.setAttribute("class",1);  
    var content=""+"<img id="+images_cables[j]+" src='"+images_cables[j]+ ".png' width=100%>";
    li.innerHTML=content;
    li.addEventListener("click",function select(){change_cursor(1);scen[flow].type_cable_selected=this.id;scen[flow].selected_cable="png";});  
    li.addEventListener("mouseover",function select(j){ 
    if(this.id==0){
      setDescription("Ethernet<br><br>  copper straight-through ");
    }   
    else if(this.id==1){
      setDescription("Ethernet<br><br> copper crossover ");
    }   
    else if(this.id==2){
      setDescription("Fiber optics");
     }   
   });  
  }
}
  