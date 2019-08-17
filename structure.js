"use strict";
class endpoint {
    constructor() {
      this.id=0;
      this.startX = "";
      this.startY = "";
      this.w = "";
      this.h = "";
      this.image ="";
      this.src = null;
      this.v=0;
      this.opacity=1.0;
      this.capture=false;
      this.num_interface_eth;
      this.num_interface_fib;
      this.interface_busy_eth;
      this.interface_busy_fib;
      this.class;
    }
  }
  
  class cables {
    constructor() {
      this.startX = "";
      this.startY = "";
      this.status_start=0;
      this.status_end=0;
      this.pointX="";
      this.pointY="";
      this.endX="";
      this.endY="";
      this.element_start=null;
      this.element_end=null;
      this.opacity=1.0;
      this.type_cable;
    }
  }


  class endpoint_info {
    constructor() {
      this.src = "";
      this.num_interface_eth=1;
    }
  }

  
  class message_struct {
    constructor() {
      this.from=null;
      this.to=null;
      this.status=-1;
    }

  }

  
//1=laptop
class switch_info {
    constructor() {
      this.src = "";
      this.inter_ethernet;
      this.inter_fiber;
    }
  }
  


class router_info {
  constructor() {
    this.src = "";
    this.inter_ethernet;
    this.inter_fiber;
  }
}

class scenario{
  constructor() {
    this.endpoint_array = [];
    this.link_array=[] ;
    this.message_array=[];
    this.path=[];
    this.table_index=1;
    this.message_index=0;
    this.startX_drag;
    this.startY_drag;
    this.id=0;
    this.old=0;
    this.index_sent=0;
    this.connect=null;
    this.selected_cable=null;
    this.mySel_connect_start=null;
    this.x_connect_start;
    this.y_connect_start;
    this.mySel_connect_end=null;
    this.type_cable_selected=-1;
    this.msg_send=null;
    this.corso=false;
    this.msg_receive=false;
    this.msg_packet=null;    
    this.sender=null;
    this.trashing=false;
    this.trashing_line=false;
    this.trash_select=null;
    this.index=0;
    this.selected_endpoint=-1;
  }
}