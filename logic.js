"use strict";

var startX_drag_set;
var startY_drag_set;
var selected=null;
var capturing_area=null;
var capture_area=false;
var capture_startX=0;
var capture_startY=0;
var capture_endX=0;
var capture_endY=0;
var capture_drag=false;
var drag_set=false;
var msg_packet_h=null;
var drag = false;
var creation=-1;
var scen=[];
var rect;
var mySel=null;
var flow=0;
var endpoint_info_array=[];

var switch_info_array=[];
var router_info_array=[];
var name_file;

var mouseX=0;
var mouseY=0;
var totalSeconds = 0;
setInterval(setTime, 1000);

//Add a description to inform
function setDescription(message){
  var description = document.getElementById('Description');
  description.innerHTML=message;   
}

//update the work time
function setTime() {
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  ++totalSeconds;
  secondsLabel.innerHTML = pad(parseInt(totalSeconds % 60));
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}


function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//change form of cursor
function change_cursor(type) {
  if(type==0){
    document.body.style.cursor = "pointer";
  }
  if(type==1){
    document.body.style.cursor = "url('icons/linking.png'), auto";
  }
}

//return to default pointer
function restore_cursor() {
  document.body.style.cursor = 'default';
}


//return the index of a free scenario
function findFreeScen(){
  for(var i=0;i<scen.length;i++){
    if(scen[i].endpoint_array.length==0 && 
       scen[i].link_array.length==0 &&
       scen[i].table_index==1){
        return i;
    }
  }
  return -1;
}


function init() {
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var div=document.getElementById("Div1");
  div.style.height=height-250+"px";
  var x = document.getElementById("mySelect");
  for(var i=0;i<3;i++){
    var c = document.createElement("option");
    c.text = i;
    x.options.add(c, i); 
  }
  for(var i=0;i<3;i++){
    var sce=new scenario();
    scen.push(sce);
  }
  x.onchange = function (){
    var d = parseInt(document.getElementById("mySelect").value);
    var ctx = canvas.getContext('2d');
    for(var i=1;i<scen[flow].table_index;i++){
      document.getElementById("myTable").deleteRow(i);
      scen[flow].table_index--;
      i--;
    }
    flow=d;
    var msg=document.getElementById("msg");
    var trash=document.getElementById("trash");
    if(scen[flow].msg_send!=null || scen[flow].msg_receive==true ){
      msg.style.background="#812BB2";
    }
    else{
      msg.style.background="#2D283E";
    }
    if(scen[flow].trash_select!=null){
      trash.style.background="#812BB2";
    }
    else{
      trash.style.background="#2D283E";
    }
    scen[flow].table_index=1;
    for(var i=scen[flow].old;i<scen[flow].message_array.length;i++){
      AddRow(scen[flow].message_array[i],scen[flow].table_index);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
    drawAllSystem();
  }; 
  LoadInfoPc();
  LoadInfoSwitch();
  LoadInfoRouter();
  document.getElementById('upload').innerHTML = 'No File'; 
  var reset = document.getElementById('reset');
  reset.addEventListener("mouseover",function select(){
    setDescription("Clear Screen");
  })
  reset.addEventListener("click",function select(){
    scen[flow].old=scen[flow].message_index;
    for(var i=1;i<scen[flow].table_index;i++){
      document.getElementById("myTable").deleteRow(i);
      scen[flow].table_index--;
      i--;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0; i <scen[flow].endpoint_array.length;i++){
      scen[flow].endpoint_array.splice(i,1);
      i--;  
    }
    for(var i=0; i <scen[flow].link_array.length;i++){
      scen[flow].link_array.splice(i,1);
      i--;  
    }
  }); 
  var f = document.getElementById('fileToLoad');
  f.addEventListener("mouseover",function select(){
    setDescription("Upload a file");
  })
  f.addEventListener("change",function select(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    document.getElementById('upload').innerHTML = document.getElementById("fileToLoad"). files[0].name; 
  }); 
    
  var clear = document.getElementById('clear');
  clear.addEventListener("click",function select(){
    scen[flow].old=scen[flow].message_index;
    for(var i=1;i<scen[flow].table_index;i++){
      document.getElementById("myTable").deleteRow(i);
      scen[flow].table_index--;
      i--;
    }
    scen[flow].table_index=1;
  });
  clear.addEventListener("mouseover",function select(){
    setDescription("Clear Table");
  })
  
  var save = document.getElementById('save');
  save.addEventListener("click",function select(){
    var jsonData = JSON.stringify(scen[flow]);
    var a = document.createElement("a");
    var file = new Blob([jsonData], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'json1.json';
    a.click();
  }); 
  save.addEventListener("mouseover",function select(){
    setDescription("Save file");
  })
 
  var imp= document.getElementById('import');
  imp.addEventListener("mouseover",function select(){
    setDescription("Open file");
  })
  imp.addEventListener("click",function select(){
  var fileToLoad = document.getElementById("fileToLoad").files[0];
  var fileReader = new FileReader();
  var textFromFileLoaded;
  fileReader.onload = function(fileLoadedEvent) {
    var free_scen=findFreeScen();
    if(free_scen==-1){
      setDescription("Reset one scenario");
      return ;
    }
    textFromFileLoaded = fileLoadedEvent.target.result;
    fileToLoad=null;
    var obj = JSON.parse(textFromFileLoaded);
    scen[free_scen].endpoint_array=obj.endpoint_array; 
    for(var h=0;h< scen[free_scen].endpoint_array.length;h++){
      var image = document.createElement('img');
      image.src=scen[free_scen].endpoint_array[h].image;
      scen[free_scen].endpoint_array[h].src=image; 
    }
    scen[free_scen].link_array=obj.link_array;
    scen[free_scen].path=obj.path;
    scen[free_scen].message_array=obj.message_array;  
    scen[free_scen].message_index=obj.message_index;
    scen[free_scen].table_index=obj.table_index-1;
    scen[free_scen].startX_drag=obj.startX_drag;
    scen[free_scen].startY_drag=obj.startY_drag;
    scen[free_scen].id=obj.id;
    scen[free_scen].index_sent=obj.index_sent; 
    scen[free_scen].old=obj.old;
    scen[free_scen].connect=obj.connect;
    scen[free_scen].selected_cable=obj.selected_cable;
    scen[free_scen].mySel_connect_start=obj.mySel_connect_start;
    scen[free_scen].x_connect_start=obj.x_connect_start;
    scen[free_scen].y_connect_start=obj.y_connect_start;
    scen[free_scen].mySel_connect_end=obj.mySel_connect_end;
    scen[free_scen].type_cable_selected=obj.type_cable_selected;    
    scen[free_scen].msg_send=obj.msg_send;
    scen[free_scen].corso=obj.corso;
    scen[free_scen].msg_receive=obj.msg_receive;
    scen[free_scen].msg_packet=obj.msg_packet;
    scen[free_scen].sender=obj.sender; 
    scen[free_scen].trashing=obj.trashing;
    scen[free_scen].trashing_line=obj.trashing_line;
    scen[free_scen].trash_select=obj.trash_select;
    scen[free_scen].index=obj.index;
    scen[free_scen].selected_endpoint=obj.selected_endpoint;
    var ctx = canvas.getContext('2d');
    if(free_scen==flow){
      scen[free_scen].table_index=1;
      for(var i=0;i<scen[free_scen].message_array.length;i++){
        AddRow(scen[free_scen].message_array[i],scen[free_scen].table_index);
      }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
    drawAllSystem();
     
  };
  if(fileToLoad!=null){fileReader.readAsText(fileToLoad, "UTF-8");}
  else{ setDescription("Upload a file");
}
  }); 
  var canvas = document.getElementById('canvas');
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  var home = document.getElementById('title');
  home.addEventListener("click",function select(){
    setDescription("Author: <br><br> a.russo65@studenti.unipi.it <br><br>https://github.com/AleRus19 ");   
  }) 
  var capturing = document.getElementById('capture');
  capturing.addEventListener("click",function select(){
    scen[flow].msg_send=null;
    scen[flow].corso=false;
    scen[flow].msg_receive=null;
    scen[flow].trash_select=null;
    scen[flow].trashing=false;
    change_cursor(0);
    scen[flow].trashing_line=false;
    capturing.style.background="#812BB2";
    var trash=document.getElementById("trash");
    trash.style.background="#2D283E";
    var msg=document.getElementById("msg");
    msg.style.background="#2D283E";
    capturing_area=this.id+".png";}); 
    capturing.addEventListener("mouseover",function select(){ 
    setDescription("Capture and drag more system");
  });
  var trash = document.getElementById('trash');
  trash.addEventListener("click",function select(){
    capture_area=false;
    capturing_area=null;
    scen[flow].msg_send=null;
    scen[flow].msg_receive=null;
    scen[flow].corso=false;
    trash.style.background="#812BB2";
    var capturing=document.getElementById("capture");
    capturing.style.background="#2D283E";
    var msg=document.getElementById("msg");
    msg.style.background="#2D283E";
    change_cursor(0);
    scen[flow].trash_select=this.id;
    scen[flow].trashing=true;}); 
    trash.addEventListener("mouseover",function select(){ 
    setDescription("Delete a system or a link");   
  });
  var msg = document.getElementById('msg');
  msg.addEventListener("click",function select(){
    change_cursor(0);
    capture_area=false;
    capturing_area=null;
    scen[flow].trash_select=null;
    scen[flow].trashing=false;
    scen[flow].trashing_line=false;
    var trash=document.getElementById("trash");
    trash.style.background="#2D283E";
    var capturing=document.getElementById("capture");
    capturing.style.background="#2D283E";
    if(scen[flow].corso==true){
      setDescription("Wait until the transmission is terminated");
      return ;
    }
    msg.style.background="#812BB2";scen[flow].msg_send=this.id;}); 
    msg.addEventListener("mouseover",function select(){ 
    setDescription("Send a message");
  });
  var s = document.getElementById('select');
  s.addEventListener("click",function select(){
    restore_cursor();
    if(scen[flow].trash_select!=null){
      scen[flow].trash_select=null;scen[flow].trashing_line=false; scen[flow].trashing=false; 
      var trash=document.getElementById("trash");
      trash.style.background="#2D283E";
    }else if(scen[flow].selected_cable!=null){
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      if(scen[flow].selected_endpoint>=0){
        if(scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0){
          scen[flow].endpoint_array[scen[flow].selected_endpoint].interface_busy_eth--;
        }
        else if(scen[flow].type_cable_selected==2){
          scen[flow].endpoint_array[scen[flow].selected_endpoint].interface_busy_fib--;
        }
      }
    }else if(scen[flow].msg_send!=null || scen[flow].msg_receive==true){
      var msg=document.getElementById("msg");
      msg.style.background="#2D283E";
      scen[flow].corso=false; scen[flow].msg_send=null; scen[flow].msg_receive=false;}
      else if(capturing_area!=null){
        capture_area=false;
        capturing_area=null;
        var capture=document.getElementById("capture");
        capture.style.background="#2D283E";
      }
  })
  s.addEventListener("mouseover",function select(){ 
    setDescription("No operation");
  });
  var nav=document.getElementById("choice");
  var ul=document.createElement('ul');
  for(var i=0;i<4;i++){
    var li=document.createElement('li');
    li.setAttribute("id",i);
    li.innerHTML="";
    ul.appendChild(li);
  }
  document.getElementById('choice').appendChild(ul);
  var ul=document.createElement('ul');
  for(var i=4;i<7;i++){
    var li=document.createElement('li');
    li.setAttribute("id",i);
    li.innerHTML="";
    ul.appendChild(li);
  }
  document.getElementById('choice').appendChild(ul);
  var fixed_pc = document.getElementById('icon_pc');
  fixed_pc.addEventListener("click",function select(){ CreateMenuPC();}); 
  fixed_pc.addEventListener("mouseover",function select(){ 
    setDescription("Choose a fixed pc or laptop");
  });
  var cable_ethernet = document.getElementById('cable_ethernet');
  cable_ethernet.addEventListener("click",function select(){ CreateMenuCables();}); 
  cable_ethernet.addEventListener("mouseover",function select(){ 
    setDescription("Choose the right cable to link systems");
  });
  var router = document.getElementById('router');
  router.addEventListener("click",function select(){ CreateMenuRouter();}); 
  router.addEventListener("mouseover",function select(){ 
    setDescription("Choose the router");
  });
  var switches = document.getElementById('icon_switch');
  switches.addEventListener("click",function select(){ CreateMenuSwitch();}); 
  switches.addEventListener("mouseover",function select(){ 
    setDescription("Choose the switches");
  });
}

function find(sel,dx,dy){
  for(var i=0;i<scen[flow].link_array.length;i++){
    if(scen[flow].link_array[i].element_start.id==sel.id){
      scen[flow].link_array[i].startX+=dx;
      scen[flow].link_array[i].startY+=dy;
      scen[flow].link_array[i].opacity=0.5;
    }
    if(scen[flow].link_array[i].element_end.id==sel.id){
      scen[flow].link_array[i].endX+=dx;
      scen[flow].link_array[i].endY+=dy;
      scen[flow].link_array[i].opacity=0.5;
    }  
  }
}
  
//remove the selected link
function RemoveLink(sel){
  for(var i=0;i<scen[flow].link_array.length;i++){
    if(scen[flow].link_array[i].element_start.id==sel.id){
      var update= scen[flow].link_array[i].element_end;
      for(var t=0;t<scen[flow].endpoint_array.length;t++){
        if(scen[flow].endpoint_array[t].id==update.id && (scen[flow].link_array[i].type_cable==1 || scen[flow].link_array[i].type_cable==0)){
          scen[flow].endpoint_array[t].interface_busy_eth--;
        }
        if(scen[flow].endpoint_array[t].id==update.id && (scen[flow].link_array[i].type_cable==2)){
          scen[flow].endpoint_array[t].interface_busy_fib--;
        }        
      }
      scen[flow].link_array.splice(i,1);
      i--;
    }
    else if(scen[flow].link_array[i].element_end.id==sel.id){
      var update= scen[flow].link_array[i].element_start;
      for(var t=0;t<scen[flow].endpoint_array.length;t++){
        if(scen[flow].endpoint_array[t].id==update.id && (scen[flow].link_array[i].type_cable==1 || scen[flow].link_array[i].type_cable==0)){
          scen[flow].endpoint_array[t].interface_busy_eth--;
        }
        if(scen[flow].endpoint_array[t].id==update.id && (scen[flow].link_array[i].type_cable==2)){
          scen[flow].endpoint_array[t].interface_busy_fib--;
        }    
      }
      scen[flow].link_array.splice(i,1);
      i--;
    }  
  }
}

function findAll(){
  var p=0;
  for(var i=0;i<scen[flow].endpoint_array.length;i++){
    if(scen[flow].endpoint_array[i].startX>=capture_startX && scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w<=capture_startX+capture_endX &&
      scen[flow].endpoint_array[i].startY>=capture_startY && scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h<=capture_startY+capture_endY
      ){
        scen[flow].endpoint_array[i].opacity=0.5;  
        scen[flow].endpoint_array[i].capture=true;
        find(scen[flow].endpoint_array[i],0,0);
        p++;
      }  
    if(p!=0){capture_drag=true;}
  }
}

function drawAllSystem(){
  var ctx = canvas.getContext('2d');
  var image= document.createElement('img');
  for(var i=0;i<scen[flow].endpoint_array.length;i++){
    image = scen[flow].endpoint_array[i].src;
    ctx.globalAlpha=scen[flow].endpoint_array[i].opacity;
    ctx.drawImage(image, scen[flow].endpoint_array[i].startX, scen[flow].endpoint_array[i].startY, scen[flow].endpoint_array[i].w, scen[flow].endpoint_array[i].h);   
    if(scen[flow].endpoint_array[i].class==0){
      ctx.font = "10px Comic Sans MS";
      ctx.strokeStyle = "black";
      ctx.strokeText("PC-"+scen[flow].endpoint_array[i].id,scen[flow].endpoint_array[i].startX+3,scen[flow].endpoint_array[i].h+ scen[flow].endpoint_array[i].startY+2);
    }
    else if(scen[flow].endpoint_array[i].class==2){
      ctx.font = "10px Comic Sans MS";
      ctx.strokeStyle = "blue";
      ctx.strokeText("SWITCH-"+scen[flow].endpoint_array[i].id,scen[flow].endpoint_array[i].startX+3,scen[flow].endpoint_array[i].h+ scen[flow].endpoint_array[i].startY+2);
      ctx.strokeStyle = "black";
    }
    else if(scen[flow].endpoint_array[i].class==3){
      ctx.font = "10px Comic Sans MS";
      ctx.strokeStyle="green";
      ctx.strokeText("ROUTER-"+scen[flow].endpoint_array[i].id,scen[flow].endpoint_array[i].startX+3,scen[flow].endpoint_array[i].h+ scen[flow].endpoint_array[i].startY+2);
      ctx.strokeStyle = "black";
    }
  }
}

function drawAllLink(){
  var ctx = canvas.getContext('2d');
  ctx.globalAlpha=1.0;
  for(var i=0;i<scen[flow].link_array.length;i++){
    if(scen[flow].link_array[i].type_cable==1){
      ctx.setLineDash([5, 10]);/*dashes are 5px and spaces are 3px*/
    }
    if(scen[flow].link_array[i].type_cable==2){
      ctx.strokeStyle='red';
      ctx.lineWidth=5;
    }
    ctx.beginPath();
    ctx.globalAlpha=scen[flow].link_array[i].opacity;
    ctx.moveTo(scen[flow].link_array[i].startX,scen[flow].link_array[i].startY);
    ctx.lineTo(scen[flow].link_array[i].endX,scen[flow].link_array[i].endY);
    ctx.fill();
    ctx.closePath();
    ctx.stroke(); 
    ctx.setLineDash([0, 0]);
    ctx.lineWidth=1;
    ctx.strokeStyle='#000';
    var angleDeg = Math.atan2(scen[flow].link_array[i].endY - scen[flow].link_array[i].startY, scen[flow].link_array[i].endX - scen[flow].link_array[i].startX);
    var Per_Frame_Distance = 40;
    var Sin = Math.sin(angleDeg) * Per_Frame_Distance;
    var Cos = Math.cos(angleDeg) * Per_Frame_Distance;
    ctx.beginPath();   
    ctx.arc(scen[flow].link_array[i].startX+Cos,scen[flow].link_array[i].startY+Sin, 5, 0, 2* Math.PI);
    if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==0 &&  
      (scen[flow].link_array[i].type_cable==0 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "red";
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==0 &&  
      scen[flow].link_array[i].type_cable==1){
      ctx.fillStyle = "green";
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==2 &&  
           (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "red";
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==2 &&  
      scen[flow].link_array[i].type_cable==0){
      ctx.fillStyle = "green";    
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==0 &&  
          (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "red";
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==0 &&  
          scen[flow].link_array[i].type_cable==0){
      ctx.fillStyle = "green";
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==2 &&  
            (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "green";     
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==2 &&  
            (scen[flow].link_array[i].type_cable==0 )){
      ctx.fillStyle = "red";     
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==0 &&  
            scen[flow].link_array[i].type_cable==0){
      ctx.fillStyle = "red";
      scen[flow].link_array[i].status_start=0;  
    }
    else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==3 &&  
              (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "green";
      scen[flow].link_array[i].status_start=1; 
    }
    else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==3 &&  
              (scen[flow].link_array[i].type_cable==0) ){
      ctx.fillStyle = "red";
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==2 &&  
              (scen[flow].link_array[i].type_cable==0 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "green";
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==2 &&  
              (scen[flow].link_array[i].type_cable==1) ){
      ctx.fillStyle = "red";           
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==3 &&  
              (scen[flow].link_array[i].type_cable==0 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "green";          
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==3 &&  
              (scen[flow].link_array[i].type_cable==1) ){
      ctx.fillStyle = "red";        
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==0 &&  
              (scen[flow].link_array[i].type_cable==1)){
      ctx.fillStyle = "green";        
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==0 &&  
              (scen[flow].link_array[i].type_cable==0) ){
      ctx.fillStyle = "red";        
      scen[flow].link_array[i].status_start=0;
    }
    else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==3 &&  
              (scen[flow].link_array[i].type_cable==1)){
      ctx.fillStyle = "green";        
      scen[flow].link_array[i].status_start=1;
    }
    else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==3 &&  
              (scen[flow].link_array[i].type_cable==0) ){
      ctx.fillStyle = "red";
      scen[flow].link_array[i].status_start=0;
    }
    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
    var Per_Frame_Distance = 45;
    var Sin = Math.sin(angleDeg) * Per_Frame_Distance;
    var Cos = Math.cos(angleDeg) * Per_Frame_Distance;
    ctx.beginPath();
    ctx.arc(scen[flow].link_array[i].endX-Cos,scen[flow].link_array[i].endY-Sin, 5, 0, 2* Math.PI);
    if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==0 &&  
      (scen[flow].link_array[i].type_cable==0 ||scen[flow].link_array[i].type_cable==2) ){
      ctx.fillStyle = "red";
      scen[flow].link_array[i].status_end=0;
    }
    else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==0 &&  
      scen[flow].link_array[i].type_cable==1){
        ctx.fillStyle = "green";
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==2 &&  
        (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
        ctx.fillStyle = "red";
        scen[flow].link_array[i].status_end=0;
      }
      else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==2 &&  
        scen[flow].link_array[i].type_cable==0){
        ctx.fillStyle = "green";
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==0 &&  
          (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
        ctx.fillStyle = "red";  
        scen[flow].link_array[i].status_end=0;
      }
      else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==0 &&  
          scen[flow].link_array[i].type_cable==0){
        ctx.fillStyle = "green";    
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==2 &&  
            (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
        ctx.fillStyle = "green";    
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==2 &&  
            (scen[flow].link_array[i].type_cable==0)){
        ctx.fillStyle = "red";      
        scen[flow].link_array[i].status_end=0;
      }
      else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==3 &&  
            (scen[flow].link_array[i].type_cable==1 ||scen[flow].link_array[i].type_cable==2) ){
        ctx.fillStyle = "green";    
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==3 &&  
            (scen[flow].link_array[i].type_cable==0) ){
        ctx.fillStyle = "red";      
        scen[flow].link_array[i].status_end=0;
      }
      else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==2 &&  
            (scen[flow].link_array[i].type_cable==0 ||scen[flow].link_array[i].type_cable==2) ){
        ctx.fillStyle = "green";      
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==2 &&  
            (scen[flow].link_array[i].type_cable==1) ){
        ctx.fillStyle = "red";    
        scen[flow].link_array[i].status_end=0;
      } else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==3 &&  
            (scen[flow].link_array[i].type_cable==0 ||scen[flow].link_array[i].type_cable==2) ){
        ctx.fillStyle = "green";     
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==3 &&  
            (scen[flow].link_array[i].type_cable==1) ){
        ctx.fillStyle = "red";     
        scen[flow].link_array[i].status_end=0;
      }
      else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==0 &&  
            (scen[flow].link_array[i].type_cable==1)){
        ctx.fillStyle = "green";        
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==3 && scen[flow].link_array[i].element_end.class==0 &&  
            (scen[flow].link_array[i].type_cable==0) ){
        ctx.fillStyle = "red";     
        scen[flow].link_array[i].status_end=0;
      }
      else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==3 &&  
            (scen[flow].link_array[i].type_cable==1)){
        ctx.fillStyle = "green";       
        scen[flow].link_array[i].status_end=1;
      }
      else if(scen[flow].link_array[i].element_start.class==0 && scen[flow].link_array[i].element_end.class==3 &&  
            (scen[flow].link_array[i].type_cable==0) ){
        ctx.fillStyle = "red";      
        scen[flow].link_array[i].status_end=0;
      }
      else if(scen[flow].link_array[i].element_start.class==2 && scen[flow].link_array[i].element_end.class==0 &&  
            scen[flow].link_array[i].type_cable==0){
        ctx.fillStyle = "red";      
        scen[flow].link_array[i].status_end=0;
      }
      ctx.fill();
      ctx.stroke(); 
      ctx.closePath();
    }
  }

function FindSingleLink(msg){
  for(var p=0;p<scen[flow].link_array.length;p++){
    if(scen[flow].link_array[p].element_start.id==msg.from.id && scen[flow].link_array[p].element_end.id==msg.to.id ){
      return p;
    }
    if(scen[flow].link_array[p].element_end.id==msg.from.id && scen[flow].link_array[p].element_start.id==msg.to.id ){
      return p;
    }    
  }
  return -1;
}


function AddRow(msg,i){
  scen[flow].is_clear=false;
  var table = document.getElementById("myTable");
  var row = table.insertRow(scen[flow].table_index);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3); 
  cell1.innerHTML = ""+scen[flow].table_index;
  if(msg.from.class==0){ 
    cell2.innerHTML = "PC-"+msg.from.id;
  }
  else if(msg.from.class==2){ 
    cell2.innerHTML = "SW-"+msg.from.id;
  }
  else if(msg.from.class==3){ 
    cell2.innerHTML = "RT-"+msg.from.id;
  }
  if(msg.to.class==0){ 
    cell3.innerHTML = "PC-"+msg.to.id;
  }
  else if(msg.to.class==2){ 
    cell3.innerHTML = "SW-"+msg.to.id;
  }
  else if(msg.to.class==3){ 
    cell3.innerHTML = "RT-"+msg.to.id;
  }
  if(msg.status==1){
    cell4.style.color ="green";
    cell4.innerHTML = "SUCCESS";
  }
  else {
    cell4.style.color ="red";
    cell4.innerHTML = "FAIL";
  }
  scen[flow].table_index++;
}

function Sending(msg,type,distance,l){
  var ctx = canvas.getContext('2d');
  if(type==0){
    var angleDeg = Math.atan2(scen[flow].link_array[l].endY - scen[flow].link_array[l].startY, scen[flow].link_array[l].endX - scen[flow].link_array[l].startX);
    var d1=(scen[flow].link_array[l].endX-scen[flow].link_array[l].startX);
    d1*=d1;
    var d2=(scen[flow].link_array[l].endY-scen[flow].link_array[l].startY);
    d2*=d2;
    var d=d1+d2;
    d=parseInt(Math.sqrt(d));
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
    drawAllSystem();
    if(distance>=d-45){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();  
      if(scen[flow].index_sent<scen[flow].path.length){
        var l=FindSingleLink(scen[flow].path[scen[flow].index_sent]);
        if(l==-1){
          scen[flow].message_array[scen[flow].message_index].status=0;  
          AddRow(scen[flow].message_array[scen[flow].message_index],scen[flow].table_index);
          scen[flow].index_sent=scen[flow].path.length; scen[flow].corso=false;
          return ;
        }
        if(scen[flow].link_array[l].element_start.id==scen[flow].path[scen[flow].index_sent].from.id  && (scen[flow].link_array[l].status_start==1 && scen[flow].link_array[l].status_end==1  )){
          window.requestAnimationFrame(function(){
            Sending(scen[flow].path[scen[flow].index_sent],0,40,l); 
            scen[flow].index_sent++;
            if(scen[flow].message_array[scen[flow].message_index].status!=0){
              scen[flow].message_array[scen[flow].message_index].status=1;
            }
          }) 
        }
        else if(scen[flow].link_array[l].element_end==scen[flow].path[scen[flow].index_sent].from && (scen[flow].link_array[l].status_start==1 && scen[flow].link_array[l].status_end==1  )){
          window.requestAnimationFrame(function(){
            Sending(scen[flow].path[scen[flow].index_sent],1,45,l); 
            scen[flow].index_sent++;
            if(scen[flow].message_array[scen[flow].message_index].status!=0){
              scen[flow].message_array[scen[flow].message_index].status=1;
            }
          }) 
        }
        else{
          scen[flow].index_sent=scen[flow].path.length;
          scen[flow].msg_receive=false;
          scen[flow].msg_send=null;
          scen[flow].corso=false;
          scen[flow].message_array[scen[flow].message_index].status=0;
          AddRow(scen[flow].message_array[scen[flow].message_index],scen[flow].table_index);
          scen[flow].message_index++;
          return;
        }
      }  
      else{  
        AddRow(scen[flow].message_array[scen[flow].message_index],scen[flow].table_index);
        scen[flow].message_index++;
        scen[flow].corso=false;}
        return;
      }
      var Sin = Math.sin(angleDeg) * distance;
      var Cos = Math.cos(angleDeg) * distance;
      ctx.beginPath();
      ctx.arc(scen[flow].link_array[l].startX+Cos,scen[flow].link_array[l].startY+Sin, 5, 0, 2* Math.PI);
      ctx.fillStyle = "orange";
      ctx.fill();
      ctx.stroke(); 
      ctx.closePath();
      distance+=2;
      window.requestAnimationFrame(function(){
        Sending(msg,type,distance,l); 
      })
    }  
    else if(type==1) {
      var angleDeg = Math.atan2(scen[flow].link_array[l].endY - scen[flow].link_array[l].startY, scen[flow].link_array[l].endX - scen[flow].link_array[l].startX);
      var d1=(scen[flow].link_array[l].endX-scen[flow].link_array[l].startX);
      d1*=d1;
      var d2=(scen[flow].link_array[l].endY-scen[flow].link_array[l].startY);
      d2*=d2;
      var d=d1+d2;
      d=parseInt(Math.sqrt(d));
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      if(distance>=d-40){  
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawAllLink();
        drawAllSystem();
        if(scen[flow].index_sent<scen[flow].path.length) {
          var l=FindSingleLink(scen[flow].path[scen[flow].index_sent]);
          if(l==-1) {  
            scen[flow].message_index++;  
            scen[flow].index_sent=scen[flow].path.length;scen[flow].corso=false;
            return ;
          }
          if(scen[flow].link_array[l].element_start.id==scen[flow].path[scen[flow].index_sent].from.id && (scen[flow].link_array[l].status_start==1 && scen[flow].link_array[l].status_end==1  )){
            window.requestAnimationFrame(function(){
              Sending(scen[flow].path[scen[flow].index_sent],0,40,l); 
              scen[flow].index_sent++;
              if(scen[flow].message_array[scen[flow].message_index].status!=0){
                scen[flow].message_array[scen[flow].message_index].status=1;
              }     
            })
          } 
          else if(scen[flow].link_array[l].element_end.id==scen[flow].path[scen[flow].index_sent].from.id && (scen[flow].link_array[l].status_start==1 && scen[flow].link_array[l].status_end==1 )){
            window.requestAnimationFrame(function(){
              Sending(scen[flow].path[scen[flow].index_sent],1,45,l); 
              scen[flow].index_sent++;
              if(scen[flow].message_array[scen[flow].message_index].status!=0){
                scen[flow].message_array[scen[flow].message_index].status=1;
              }
            }) 
          }
          else{
            scen[flow].index_sent=scen[flow].path.length;
            scen[flow].msg_receive=false;
            scen[flow].msg_send=null;
            scen[flow].corso=false;
            scen[flow].message_array[scen[flow].message_index].status=0;
            AddRow(scen[flow].message_array[scen[flow].message_index],scen[flow].table_index);
            scen[flow].message_index++;
            return;
          }
        }
        else {
          AddRow(scen[flow].message_array[scen[flow].message_index],scen[flow].table_index);
          scen[flow].message_index++;
          scen[flow].corso=false;}
          return ;
        }
      var Sin = Math.sin(angleDeg) * distance;
      var Cos = Math.cos(angleDeg) * distance;
      ctx.beginPath();
      ctx.arc(scen[flow].link_array[l].endX-Cos,scen[flow].link_array[l].endY-Sin, 5, 0, 2* Math.PI);
      ctx.fillStyle = "orange";
      ctx.fill();
      ctx.stroke(); 
      ctx.closePath();
      distance+=2;
      window.requestAnimationFrame(function(){
        Sending(msg,type,distance,l); 
     })
    }
}

function FindEnd(start,end){
  for(var t=0;t<scen[flow].link_array.length;t++){
    if(start.id==scen[flow].link_array[t].element_start.id &&  end.id==scen[flow].link_array[t].element_end.id){
      return t; 
    }
    else if(start.id==scen[flow].link_array[t].element_end.id &&  end.id==scen[flow].link_array[t].element_start.id){
      return t; 
    }
  }
  return -1;
}

function mouseDown(e) {
  mouseX=e.pageX-this.offsetLeft+document.getElementById("Div1").scrollLeft; 
  mouseY=e.pageY-this.offsetTop+document.getElementById("Div1").scrollTop;
  if(capturing_area!=null){   
    capture_area=true;
    capture_startX=mouseX;
    capture_startY=mouseY;
    capturing_area=null;
  }
  for(var i=0;i<scen[flow].endpoint_array.length;i++){
    if(mouseX>scen[flow].endpoint_array[i].startX && mouseX<scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w && mouseY>scen[flow].endpoint_array[i].startY && mouseY<scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h){
      if(capture_drag){
        mySel=scen[flow].endpoint_array[i];
        creation=-1;
        drag_set=true;
        capture_drag=false;
        change_cursor(0);
        startX_drag_set=mouseX;
        startY_drag_set=mouseY;
        return ;
      }
      if(scen[flow].msg_send!=null){
        scen[flow].msg_packet=new message_struct();
        scen[flow].msg_packet.from=scen[flow].endpoint_array[i];
        scen[flow].corso=true;
        scen[flow].msg_send=null;
        scen[flow].msg_receive=true;
        scen[flow].sender=scen[flow].endpoint_array[i];
        return ;
      }
      if(scen[flow].msg_receive){
        var msg=document.getElementById("msg");
        msg.style.background="#2D283E";
        restore_cursor();
        if(scen[flow].sender==scen[flow].msg_packet.from){      
          scen[flow].msg_packet.to=scen[flow].endpoint_array[i];
          scen[flow].msg_receive=false;
          msg_packet_h=new message_struct();
          msg_packet_h.from=scen[flow].sender;
          msg_packet_h.to=scen[flow].endpoint_array[i];
          msg_packet_h.status=-1;
          scen[flow].message_array.push(msg_packet_h);
          window.requestAnimationFrame(function(){    
          var l=FindSingleLink(scen[flow].msg_packet);
          if(l==-1){
            var start=scen[flow].msg_packet.from;
            var start_pre=null;
            var end=scen[flow].msg_packet.to;
            for(var h=0;h<scen[flow].link_array.length;h++){
              if(scen[flow].link_array[h].element_start.id==start.id && start.class==0 && (scen[flow].link_array[h].element_end.class==2 || scen[flow].link_array[h].element_end.class==3)){
                if(scen[flow].link_array[h].element_end.id==end.id){
                  var msg_packet1=new message_struct();
                  msg_packet1.from=scen[flow].link_array[h].element_start;
                  msg_packet1.to=scen[flow].link_array[h].element_end;
                  scen[flow].path.push(msg_packet1); 
                  h=scen[flow].link_array.length;
              } 
              else{   
                var msg_packet1=new message_struct();
                msg_packet1.from=scen[flow].link_array[h].element_start;
                msg_packet1.to=scen[flow].link_array[h].element_end;
                scen[flow].path.push(msg_packet1);
                start_pre=start;
                start=scen[flow].link_array[h].element_end;
                h=-1;
              }
            }
            else if(scen[flow].link_array[h].element_end.id==start.id && start.class==0 && (scen[flow].link_array[h].element_start.class==2 || scen[flow].link_array[h].element_start.class==3)){
              if(scen[flow].link_array[h].element_start.id==end.id){
                var msg_packet1=new message_struct();
                msg_packet1.from=scen[flow].link_array[h].element_end;
                msg_packet1.to=scen[flow].link_array[h].element_start;
                scen[flow].path.push(msg_packet1);         
                h=scen[flow].link_array.length;
              } 
              else{  
                var msg_packet1=new message_struct();
                msg_packet1.from=scen[flow].link_array[h].element_end;
                msg_packet1.to=scen[flow].link_array[h].element_start;
                scen[flow].path.push(msg_packet1);
                start_pre=scen[flow].link_array[h].element_end;
                start=scen[flow].link_array[h].element_start;
                h=-1;
              }
            }
            else if(scen[flow].link_array[h].element_start.id==start.id){
              var find=FindEnd(scen[flow].link_array[h].element_start,end);        
              if(find<0){
                scen[flow].message_array[scen[flow].message_index].status=0;
              }
              if(find>=0){
                var msg_packet1=new message_struct();
                msg_packet1.from=start;
                if(scen[flow].link_array[find].element_start==start){
                  msg_packet1.to=scen[flow].link_array[find].element_end;
                }
                else{
                  msg_packet1.to=scen[flow].link_array[find].element_start;    
                }
                scen[flow].path.push(msg_packet1);
                h=scen[flow].link_array.length;
              } 
            }
            else if(scen[flow].link_array[h].element_end.id==start.id){
              var find=FindEnd(scen[flow].link_array[h].element_end,end);
              if(find<0){           
                scen[flow].message_array[scen[flow].message_index].status=0;
              }
              if(find>=0){
                var msg_packet1=new message_struct();
                msg_packet1.from=start;
                if(scen[flow].link_array[find].element_start.id==start.id){
                  msg_packet1.to=scen[flow].link_array[find].element_end;
                }
                else{
                  msg_packet1.to=scen[flow].link_array[find].element_start;
                }
                scen[flow].path.push(msg_packet1);
                h=scen[flow].link_array.length;
              }   
            }                     
          }  
        }
        if(scen[flow].index_sent<scen[flow].path.length){
          if(scen[flow].index_sent==scen[flow].path.length){return ;}
            var l=FindSingleLink(scen[flow].path[scen[flow].index_sent]);
            if(l==-1) { 
              scen[flow].message_index++;
              scen[flow].corso=false;scen[flow].index_sent=scen[flow].path.length;return ;}
              if(scen[flow].link_array[l].element_start.id==scen[flow].path[scen[flow].index_sent].from.id && (scen[flow].link_array[l].status_start==1 &&scen[flow].link_array[l].status_end==1  )){
                Sending(scen[flow].path[scen[flow].index_sent],0,40,l); 
                scen[flow].index_sent++;
                if(scen[flow].message_array[scen[flow].message_index].status!=0){
                  scen[flow].message_array[scen[flow].message_index].status=1;
                }
              }
              else if(scen[flow].link_array[l].element_end==scen[flow].path[scen[flow].index_sent].from && (scen[flow].link_array[l].status_start==1 && scen[flow].link_array[l].status_end==1  )){
                Sending(scen[flow].path[scen[flow].index_sent],1,45,l); 
                scen[flow].index_sent++;  
                if(scen[flow].message_array[scen[flow].message_index].status!=0){
                  scen[flow].message_array[scen[flow].message_index].status=1;
                }
              }
              else{
                scen[flow].msg_send=null;
                scen[flow].msg_receive=false;
                scen[flow].corso=false;
                scen[flow].index_sent=scen[flow].path.length;
                scen[flow].message_array[scen[flow].message_index].status=0;
                scen[flow].message_index++;
          
              }
              return;
            }
            if(l==-1){scen[flow].message_index++;scen[flow].corso=false; scen[flow].msg_send==null; scen[flow].msg_receive=false; setDescription("Not allowed");return;}     
              if(scen[flow].link_array[l].element_start.id==scen[flow].msg_packet.from.id && (scen[flow].link_array[l].status_start==1 && scen[flow].link_array[l].status_end==1  )){
                Sending(scen[flow].msg_packet,0,40,l); 
                scen[flow].message_array[scen[flow].message_index].status=1;
              }
              else if(scen[flow].link_array[l].element_end.id==scen[flow].msg_packet.from.id  && (scen[flow].link_array[l].status_start==1 && scen[flow].link_array[l].status_end==1)){
                Sending(scen[flow].msg_packet,1,45,l); 
                scen[flow].message_array[scen[flow].message_index].status=1;
              }
              else{
                scen[flow].msg_send=null;
                scen[flow].msg_receive=false;
                scen[flow].corso=false;
                scen[flow].message_index++;
              }
            })
            return ;     
          }
        }
        if(scen[flow].connect){
          restore_cursor();
          var ctx = canvas.getContext('2d');
          scen[flow].mySel_connect_end=scen[flow].endpoint_array[i];
          Check_cable_pc_pc(i);
          Check_cable_sw_sw_fib(i);
          Check_cable_rt_rt_fib(i);
          Check_cable_rt_rt_eth(i);
          Check_cable_sw_sw_eth(i);
          Check_cable_sw_pc_eth(i);           
          Check_cable_pc_sw_eth(i);
          Check_cable_rt_sw_fib(i);   
          Check_cable_sw_rt_fib(i);
          Check_cable_rt_sw_eth(i);   
          Check_cable_sw_rt_eth(i);  
          Check_cable_pc_rt_eth(i);
          Check_cable_rt_pc_eth(i);
          return;
        }
        if(scen[flow].selected_cable!=null){
          scen[flow].selected_endpoint=i;
          drag=false; 
          CheckPc(i);
          CheckSwitch_eth(i);
          CheckSwitch_fib(i);
          CheckRouter_fib(i);
          CheckRouter_eth(i);
          return;   
        }
        if(scen[flow].trash_select!=null){
          scen[flow].trashing=true;
          scen[flow].index=i;
          scen[flow].trash_select=null;
          var trash=document.getElementById("trash");
          trash.style.background="#2D283E";
          return;
        }
        drag=true;
        change_cursor(0);
        mySel=scen[flow].endpoint_array[i];
        creation=-1;
        scen[flow].startX_drag=mouseX;
        scen[flow].startY_drag=mouseY;
      }
    }
    if(scen[flow].trash_select!=null){
      scen[flow].trashing_line=true;
      scen[flow].index=i;
      scen[flow].trashing=false;
      scen[flow].trash_select=null;
      var trash=document.getElementById("trash");
      trash.style.background="#2D283E";
      return;
    }
    if(creation>=0){
      var ctx = canvas.getContext('2d');
      rect=new endpoint();
      rect.startX = mouseX;
      rect.startY = mouseY;
      rect.w = 60;//(e.pageX - this.offsetLeft) - rect.startX;
      rect.h =60; //(e.pageY - this.offsetTop) - rect.startY ;
      if(creation==0){
        rect.id=scen[flow].id;
        scen[flow].id++;
        rect.num_interface_eth=endpoint_info_array[selected].num_interface_eth;
        rect.interface_busy_eth=0;
        rect.class=0;
      }  
      if(creation==2){
        rect.id=scen[flow].id;
        scen[flow].id++;
        rect.num_interface_eth=switch_info_array[selected].inter_ethernet;
        rect.num_interface_fib=switch_info_array[selected].inter_fiber;
        rect.interface_busy_eth=0;
        rect.interface_busy_fib=0;
        rect.class=2;
      }
      if(creation==3){
        rect.id=scen[flow].id;
        scen[flow].id++;
        rect.num_interface_eth=router_info_array[selected].inter_ethernet;
        rect.num_interface_fib=router_info_array[selected].inter_fiber;
        rect.interface_busy_eth=0;
        rect.interface_busy_fib=0;
        rect.class=3;
      }
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawAllLink();
     drawAllSystem();
    }
}

function mouseUp(e) {
  if(creation>=0 && selected!=null){
    draw();
   var t=rect;
   scen[flow].endpoint_array.push(rect);
  }
  else if(drag){
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    mySel.opacity=1.0;
    for(var i=0;i<scen[flow].link_array.length;i++){
      scen[flow].link_array[i].opacity=1.0;
    }
    drawAllLink();
    drawAllSystem();
    drag = false;
    restore_cursor();
    mySel.opacity=1.0;   
 }
  else if(drag_set){
    var ctx = canvas.getContext('2d');
    for(var i=0;i<scen[flow].endpoint_array.length;i++){
      scen[flow].endpoint_array[i].capture=false;
      scen[flow].endpoint_array[i].opacity=1.0;
    }
    for(var i=0;i<scen[flow].link_array.length;i++){
      scen[flow].link_array[i].opacity=1.0;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
    drawAllSystem();
    drag_set = false;
    restore_cursor();
    capture_area=false; 
   }
   else if(scen[flow].trashing){
     restore_cursor();
     scen[flow].trashing=false;
     RemoveLink(scen[flow].endpoint_array[scen[flow].index]);
     scen[flow].endpoint_array.splice(scen[flow].index,1);
     var ctx = canvas.getContext('2d');
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawAllLink();
     drawAllSystem();
     return ;
    }
   else if(scen[flow].trashing_line){
     restore_cursor();
     for(var i=0;i<scen[flow].link_array.length;i++){
       if(Math.abs(scen[flow].link_array[i].startX-scen[flow].link_array[i].endX)<10 && 
         (mouseY>=scen[flow].link_array[i].startY && mouseY<=scen[flow].link_array[i].endY || 
          mouseY<=scen[flow].link_array[i].startY && mouseY>=scen[flow].link_array[i].endY)){
        if(Math.abs(mouseX-scen[flow].link_array[i].startX)<5){
          for(var t=0;t<scen[flow].endpoint_array.length;t++){
            if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_start.id && (scen[flow].link_array[i].type_cable==1 || scen[flow].link_array[i].type_cable==0)){
             scen[flow].endpoint_array[t].interface_busy_eth--;
            }
            if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_end.id && (scen[flow].link_array[i].type_cable==1 || scen[flow].link_array[i].type_cable==0)){
              scen[flow].endpoint_array[t].interface_busy_eth--;
            }
           if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_end.id && (scen[flow].link_array[i].type_cable==2)){
              scen[flow].endpoint_array[t].interface_busy_fib--;
            }    
            if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_start.id && (scen[flow].link_array[i].type_cable==2)){
              scen[flow].endpoint_array[t].interface_busy_fib--;
            } 
          }
         scen[flow].link_array.splice(i,1);
          i--;
          scen[flow].trashing_line=false;
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0,0,canvas.width,canvas.height);
          drawAllLink();
          drawAllSystem();
          return;
        }
      }
      var m=(scen[flow].link_array[i].startY-scen[flow].link_array[i].endY)/(scen[flow].link_array[i].startX-scen[flow].link_array[i].endX);
      var q= ( scen[flow].link_array[i].startX*scen[flow].link_array[i].endY-scen[flow].link_array[i].endX*scen[flow].link_array[i].startY)/
      (scen[flow].link_array[i].startX-scen[flow].link_array[i].endX);
      var tot=((m*mouseX)+q);
      if(Math.abs(tot-mouseY)<5 && 
      (mouseX>=scen[flow].link_array[i].startX && mouseX<=scen[flow].link_array[i].endX || 
        mouseX<=scen[flow].link_array[i].startX && mouseX>=scen[flow].link_array[i].endX)
      ){
         for(var t=0;t<scen[flow].endpoint_array.length;t++){
          if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_start.id && (scen[flow].link_array[i].type_cable==1 || scen[flow].link_array[i].type_cable==0)){
           scen[flow].endpoint_array[t].interface_busy_eth--;
          }
          if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_end.id && (scen[flow].link_array[i].type_cable==1 || scen[flow].link_array[i].type_cable==0)){
            scen[flow].endpoint_array[t].interface_busy_eth--;
           }
         if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_end.id && (scen[flow].link_array[i].type_cable==2)){
            scen[flow].endpoint_array[t].interface_busy_fib--;
           }    
           if(scen[flow].endpoint_array[t].id==scen[flow].link_array[i].element_start.id && (scen[flow].link_array[i].type_cable==2)){
            scen[flow].endpoint_array[t].interface_busy_fib--;
           } 
        }
        scen[flow].link_array.splice(i,1);
        i--;
        scen[flow].trashing_line=false;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawAllLink();
        drawAllSystem();
        return;
      }
    }
    return ;
  }
  else if(capture_area){
    var ctx = canvas.getContext('2d');    
    capture_endX=(e.pageX - this.offsetLeft) - capture_startX+document.getElementById("Div1").scrollLeft;
    capture_endY=(e.pageY - this.offsetTop) - capture_startY+document.getElementById("Div1").scrollTop;
    capturing_area=null;
    capture_area=false;
    var capturing=document.getElementById("capture");
    capturing.style.background="#2D283E";
    if(capture_endX<0 && capture_endY<0){
      capture_startX=capture_startX+capture_endX;
      capture_startY=capture_startY+capture_endY;
      capture_endY=capture_endY*-1;
      capture_endX=capture_endX*-1;
    }
    else if(capture_endX<0 && capture_endY>0){
      capture_startX=capture_startX+capture_endX;
      capture_endX=capture_endX*-1;
    }
    else if(capture_endX<0 && capture_endY>0){
      capture_startX=capture_startX+capture_endX;
      capture_endX=capture_endX*-1;
    }
    else if(capture_endX>0 && capture_endY<0){
      capture_startY=capture_startY+capture_endY;
      capture_endY=capture_endY*-1;
    }
    findAll(); 
    restore_cursor();  
  }
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawAllLink();
  drawAllSystem();
  drag = false;
  capture_area=false;
  creation=-1;
}


function mouseMove(e) {
  var ctx = canvas.getContext('2d');
  if(capture_area){
    capture_endX  = (e.pageX - this.offsetLeft) - capture_startX+document.getElementById("Div1").scrollLeft;
    capture_endY = (e.pageY - this.offsetTop) - capture_startY+document.getElementById("Div1").scrollTop;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    drawAllLink();
    drawAllSystem();
    ctx.setLineDash([10, 10]);/*dashes are 5px and spaces are 3px*/
    ctx.moveTo(capture_startX,capture_startY);
    ctx.rect(capture_startX, capture_startY,capture_endX,capture_endY);
    ctx.stroke();
    ctx.setLineDash([0, 0]);/*dashes are 5px and spaces are 3px*/
    ctx.closePath();
  }
  else if(scen[flow].connect){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
    ctx.beginPath();
    ctx.moveTo(scen[flow].x_connect_start,scen[flow].y_connect_start);
    ctx.lineTo(e.pageX-this.offsetLeft+document.getElementById("Div1").scrollLeft,e.pageY-this.offsetTop+document.getElementById("Div1").scrollTop);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    drawAllSystem();
  }
  else if (drag){
    // get the current mouse position
    var mx=e.pageX-this.offsetLeft+document.getElementById("Div1").scrollLeft;
    var my=e.pageY-this.offsetTop+document.getElementById("Div1").scrollTop;
    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx=mx-scen[flow].startX_drag;
    var dy=my-scen[flow].startY_drag;
    scen[flow].startX_drag=mx;
    scen[flow].startY_drag=my;
    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    find(mySel,dx,dy);
    mySel.startX+=dx;
    mySel.startY+=dy;
    mySel.opacity=0.7;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
    drawAllSystem();     
  }
  else if (drag_set){
    // get the current mouse position
    var mx=e.pageX-this.offsetLeft+document.getElementById("Div1").scrollLeft;
    var my=e.pageY-this.offsetTop+document.getElementById("Div1").scrollTop;
    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx=mx-startX_drag_set;
    var dy=my-startY_drag_set;
    startX_drag_set=mx;
    startY_drag_set=my;
    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    for(var i=0;i<scen[flow].endpoint_array.length;i++){
      if(scen[flow].endpoint_array[i].capture==true){
        find(scen[flow].endpoint_array[i],dx,dy);
        scen[flow].endpoint_array[i].opacity=0.7;
        scen[flow].endpoint_array[i].startX+=dx;
        scen[flow].endpoint_array[i].startY+=dy;
      }
    }  
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
    drawAllSystem(); 
  }
}

function draw() {
  var ctx = canvas.getContext('2d');
  var image = document.createElement('img');
  if(creation==0 && selected>=0){
    image.src = endpoint_info_array[selected].src;
    rect.image=endpoint_info_array[selected].src;
    rect.src=image; 
    ctx.drawImage(image, rect.startX, rect.startY, rect.w, rect.h);
  }
  else if(creation==2 &&  selected>=0){
    image.src = switch_info_array[selected].src;
    rect.image=switch_info_array[selected].src;
    rect.src=image; 
    ctx.drawImage(image, rect.startX, rect.startY, rect.w, rect.h);  
  }
  else if(creation==3 &&  selected>=0){
    image.src = router_info_array[selected].src;
    rect.image=router_info_array[selected].src;
    rect.src=image; 
    ctx.drawImage(image, rect.startX, rect.startY, rect.w, rect.h);  
  }
 
  else if(drag){
    image.src = mySel.src;
    ctx.drawImage(image, mySel.startX, mySel.startY, mySel.w, mySel.h);  
  }
}

window.onload=init;

window.onresize = function(event) {
  var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
  var div=document.getElementById("Div1");
  div.style.height=height-250+"px";
};

window.onkeydown = function(e) {
   if (e.keyCode == 81 && e.ctrlKey) {
  	e.target.value = "";
    e.preventDefault();
    var ctx = canvas.getContext('2d');
    for(var i=1;i<scen[flow].table_index;i++){
      document.getElementById("myTable").deleteRow(i);
      scen[flow].table_index--;
      i--;
    }
    flow=(flow+1)%3;
    document.getElementById("mySelect").value=flow;
    var d = parseInt(document.getElementById("mySelect").value);
    flow=d;
    var msg=document.getElementById("msg");
    var trash=document.getElementById("trash");
     
    if(scen[flow].msg_send!=null || scen[flow].msg_receive==true){
      msg.style.background="#812BB2";
    }
    else{
      msg.style.background="#2D283E";
    }
  
    if(scen[flow].trash_select!=null){
      trash.style.background="#812BB2";
    }
    else{
      trash.style.background="#2D283E";
    }
    scen[flow].table_index=1;
    for(var i=scen[flow].old;i<scen[flow].message_array.length;i++){
      AddRow(scen[flow].message_array[i],scen[flow].table_index);
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAllLink();
   drawAllSystem();     
	}
}

