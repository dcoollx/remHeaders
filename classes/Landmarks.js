import LL from './linklist';


export default class regions{
  constructor(){
    this.landmarks = [
      this.main = {
        name: 'Main',
        elem : document.querySelector('main, [role="main"]'),
        list : new LL()
      },
      this.banner ={
        name: 'Header',
        elem : document.querySelector('header, [role="banner"]'),
        list : new LL()
      },
      this.footer = {
        name: 'Footer',
        elem : document.querySelector('footer, [role="contentinfo"]'),
        list : new LL()
      } ];
    //check for regions
    for (let region of this.landmarks){
      if(!region.elem){
        throw new Error('a ' + region.name + ' region is not present on page, please add one before invoke header rem');
      }
    }
  
  }
  findContaining(container, masterList){
    container = this[container];
    //error checking needed. check if vaild container
    container.list.head = masterList.traverse((n)=>{//traverse returns end of list
      return container.elem.contains(n.element);
    });
    if(container.list.head === masterList.tail && !container.elem.contains(masterList.tail.element)){// if head is end of list and eol is not in container
      container.list.head = null;
      container.list.tail = null;
    }else{
      container.list.tail = LL.traverse(container.list.head,(n)=>{
        if(!container.elem.contains(n.next.element))
          return true;
      });
    }
  }

}
