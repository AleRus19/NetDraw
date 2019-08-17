"use strict";
var link;
function Check_cable_pc_pc(i){
    if( scen[flow].endpoint_array[i].class==0 && scen[flow].mySel_connect_start.class==0 && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
    }
    else if(scen[flow].endpoint_array[i].class==0 &&  scen[flow].mySel_connect_start.class==0 && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
      setDescription("Interface busy");
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth=0;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }
  }
  
  function Check_cable_sw_sw_fib(i){
    if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==2 && scen[flow].type_cable_selected==2 &&
       scen[flow].endpoint_array[i].interface_busy_fib<scen[flow].endpoint_array[i].num_interface_fib){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_fib+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==2  && scen[flow].type_cable_selected==2 && 
            scen[flow].endpoint_array[i].interface_busy_fib>=scen[flow].endpoint_array[i].num_interface_fib){
              setDescription("interface busy"); scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_fib--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }
  }
  

  function Check_cable_rt_rt_fib(i){
    if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==3 && scen[flow].type_cable_selected==2 &&
       scen[flow].endpoint_array[i].interface_busy_fib<scen[flow].endpoint_array[i].num_interface_fib){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_fib+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==3  && scen[flow].type_cable_selected==2 && 
            scen[flow].endpoint_array[i].interface_busy_fib>=scen[flow].endpoint_array[i].num_interface_fib){
              setDescription("interface busy");
               scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_fib--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return}
  }
  


  function Check_cable_rt_rt_eth(i){
    if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==3 &&  (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1)  &&
       scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==3  && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1) && 
            scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy"); scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }
  }
  
 ;
    


  function Check_cable_sw_sw_eth(i){
    if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==2 && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1)
       && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
    
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==2  && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1) 
            && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy");  scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ; 
    }
  }
  
  
  function Check_cable_sw_pc_eth(i){
    if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==0  
       && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1)
       && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==0  && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1) 
            && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
      setDescription("interface busy");
      scen[flow].connect=false;
      scen[flow].selected_cable=null;  
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }
  }
  
  
  function Check_cable_pc_sw_eth(i){
    var ctx = canvas.getContext('2d');
      
    if(scen[flow].endpoint_array[i].class==0 &&  scen[flow].mySel_connect_start.class==2  
       && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1)
       && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }    else if(scen[flow].endpoint_array[i].class==0 &&  scen[flow].mySel_connect_start.class==2    && scen[flow].type_cable_selected==2 ){
      setDescription("interface busy");
       scen[flow].connect=false;
      scen[flow].selected_cable=null;  
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_fib--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }
    else if(scen[flow].endpoint_array[i].class==0 &&  scen[flow].mySel_connect_start.class==2 && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1) 
    ){
      setDescription("interface busy");
      scen[flow].connect=false;
      scen[flow].selected_cable=null;  
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_fib--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }
  }
  
  
  function CheckPc(i) {
    if(scen[flow].endpoint_array[i].class==0 &&  (scen[flow].type_cable_selected==2)){
      setDescription("Not allowed");
      scen[flow].connect=false;
      creation=-1;
      drag=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      return;
    }
    else if(scen[flow].endpoint_array[i].class==0 && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      scen[flow].mySel_connect_start=scen[flow].endpoint_array[i];
      scen[flow].endpoint_array[i].interface_busy_eth=1;
      scen[flow].connect=true;
      creation=-1;
      drag=false;
      scen[flow].x_connect_start=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      scen[flow].y_connect_start=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;      
   }
   else if(scen[flow].endpoint_array[i].class==0 && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
    setDescription("interface busy");
      scen[flow].connect=false;
      creation=-1;
      drag=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      return;
   }
  
  }
  
  function CheckSwitch_eth(i){
    if(scen[flow].endpoint_array[i].class==2 && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0)  && 
       scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      scen[flow].mySel_connect_start=scen[flow].endpoint_array[i];
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      scen[flow].connect=true;
      creation=-1;
      drag=false;
      scen[flow].x_connect_start=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      scen[flow].y_connect_start=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;      
      return ;  
    }
    else if(scen[flow].endpoint_array[i].class==2 && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0)  && 
            scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy");
               scen[flow].connect=false;
      creation=-1;
      drag=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      return;
    }
  }
  
  function CheckSwitch_fib(i){
    if(scen[flow].endpoint_array[i].class==2 && (scen[flow].type_cable_selected==2 )  && 
       scen[flow].endpoint_array[i].interface_busy_fib<scen[flow].endpoint_array[i].num_interface_fib){
      scen[flow].mySel_connect_start=scen[flow].endpoint_array[i];
      scen[flow].endpoint_array[i].interface_busy_fib+=1;
      scen[flow].connect=true;
      creation=-1;
      drag=false;
      scen[flow].x_connect_start=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      scen[flow].y_connect_start=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;     
      return;  
    } 
    else if(scen[flow].endpoint_array[i].class==2 && (scen[flow].type_cable_selected==2 )  && 
            scen[flow].endpoint_array[i].interface_busy_fib>=scen[flow].endpoint_array[i].num_interface_fib){
      setDescription("interface busy");
      scen[flow].connect=false;
      creation=-1;
      drag=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      return;
    }
  }
  
  
  
  function CheckRouter_fib(i){
    if(scen[flow].endpoint_array[i].class==3 && (scen[flow].type_cable_selected==2 )  && 
       scen[flow].endpoint_array[i].interface_busy_fib<scen[flow].endpoint_array[i].num_interface_fib){
      scen[flow].mySel_connect_start=scen[flow].endpoint_array[i];
      scen[flow].endpoint_array[i].interface_busy_fib+=1;
      scen[flow].connect=true;
      creation=-1;
      drag=false;
      scen[flow].x_connect_start=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      scen[flow].y_connect_start=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;     
      return;  
    } 
    else if(scen[flow].endpoint_array[i].class==3 && (scen[flow].type_cable_selected==2 )  && 
            scen[flow].endpoint_array[i].interface_busy_fib>=scen[flow].endpoint_array[i].num_interface_fib){
              drag=false;
              setDescription("interface busy"); scen[flow].connect=false;
      creation=-1;
     
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      return;
    }
  }
  
  
  function CheckRouter_eth(i){
    if(scen[flow].endpoint_array[i].class==3 && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0)  && 
       scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      scen[flow].mySel_connect_start=scen[flow].endpoint_array[i];
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      scen[flow].connect=true;
      creation=-1;
      drag=false;
      scen[flow].x_connect_start=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      scen[flow].y_connect_start=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;      
      return ;  
    }
    else if(scen[flow].endpoint_array[i].class==3 && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0)  && 
            scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy");  scen[flow].connect=false;
      creation=-1;
      drag=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      return;
    }
  }
  
  function Check_cable_rt_sw_fib(i){
    if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==3 && (scen[flow].type_cable_selected==2)
       && scen[flow].endpoint_array[i].interface_busy_fib<scen[flow].endpoint_array[i].num_interface_fib){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_fib+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==3  && (scen[flow].type_cable_selected==2) 
            && scen[flow].endpoint_array[i].interface_busy_fib>=scen[flow].endpoint_array[i].num_interface_fib){
              setDescription("interface busy"); scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_fib--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ; 
    }
  }
  

  function Check_cable_sw_rt_fib(i){
    if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==2 && (scen[flow].type_cable_selected==2)
       && scen[flow].endpoint_array[i].interface_busy_fib<scen[flow].endpoint_array[i].num_interface_fib){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_fib+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==2  && (scen[flow].type_cable_selected==2) 
            && scen[flow].endpoint_array[i].interface_busy_fib>=scen[flow].endpoint_array[i].num_interface_fib){
              setDescription("interface busy"); scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_fib--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ; 
    }
  }
  

  function Check_cable_rt_sw_eth(i){
    if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==3 && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0)
       && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_fib+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==2 &&  scen[flow].mySel_connect_start.class==3  && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0)
            && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy");scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ; 
    }
  }
  

  function Check_cable_sw_rt_eth(i){
    if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==2 && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0)
       && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==2  && (scen[flow].type_cable_selected==1 || scen[flow].type_cable_selected==0) 
            && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy");  scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ; 
    }
  }
  function Check_cable_pc_rt_eth(i){
    if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==0  
       && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1)
       && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==3 &&  scen[flow].mySel_connect_start.class==0  && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1) 
            && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy");    scen[flow].connect=false;
      scen[flow].selected_cable=null;  
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }
  }



  function Check_cable_rt_pc_eth(i){
    if(scen[flow].endpoint_array[i].class==0 &&  scen[flow].mySel_connect_start.class==3  
       && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1)
       && scen[flow].endpoint_array[i].interface_busy_eth<scen[flow].endpoint_array[i].num_interface_eth){
      link=new cables();
      link.element_start=scen[flow].mySel_connect_start;
      scen[flow].endpoint_array[i].interface_busy_eth+=1;
      link.element_end=scen[flow].mySel_connect_end;
      link.endX=scen[flow].endpoint_array[i].startX+scen[flow].endpoint_array[i].w/2;
      link.endY=scen[flow].endpoint_array[i].startY+scen[flow].endpoint_array[i].h/2;
      link.startX=scen[flow].x_connect_start;
      link.startY=scen[flow].y_connect_start;
      link.type_cable=scen[flow].type_cable_selected;
      scen[flow].link_array.push(link);
      scen[flow].connect=false;
      scen[flow].selected_cable=null;
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      var ctx = canvas.getContext('2d');
      
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();             
    }
    else if(scen[flow].endpoint_array[i].class==0 &&  scen[flow].mySel_connect_start.class==3  && (scen[flow].type_cable_selected==0 || scen[flow].type_cable_selected==1) 
            && scen[flow].endpoint_array[i].interface_busy_eth>=scen[flow].endpoint_array[i].num_interface_eth){
              setDescription("interface busy");scen[flow].connect=false;
      scen[flow].selected_cable=null;  
      scen[flow].type_cable_selected=-1;
      creation=-1;
      drag=false;
      scen[flow].mySel_connect_start.interface_busy_eth--;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawAllLink();
      drawAllSystem();
      return ;
    }else if(scen[flow].endpoint_array[i].class==0 &&  scen[flow].mySel_connect_start.class==3  && (scen[flow].type_cable_selected==2)){
      setDescription("interface busy"); scen[flow].connect=false;
scen[flow].selected_cable=null;  
scen[flow].type_cable_selected=-1;
creation=-1;
drag=false;
scen[flow].mySel_connect_start.interface_busy--;
var ctx = canvas.getContext('2d');
ctx.clearRect(0,0,canvas.width,canvas.height);
drawAllLink();
drawAllSystem();
return ;

}
  }