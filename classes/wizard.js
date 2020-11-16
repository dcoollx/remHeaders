import LL from './linklist';
import GUI from './GUI';
import {Node} from './linklist';
window.eNode = Node;
window.Wizard = class Wizard{
  constructor(Node, selector, name='generic'){
    this.mainList = new LL(Node, name);
    if(window.$ae){
      this.mainList.fromArray(window.$ae(selector).toArray());

    }else{
      console.log(this.mainList.fromArray(document.querySelectorAll(selector)));
      
    }
    
    this.panel = new GUI(this.mainList);
  }
};

export default window.Wizard;