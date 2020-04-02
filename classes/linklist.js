class Node{
  constructor(element,prev){
    this.element = element;
    this.weight = 0;
    this.next = null;
    this._lvlChanged = false;
    this.prev = prev;//needed?
    let headerTags = ['h1','h2','h3','h4','h5','h6'];
    this.assignWeight();
    if(!headerTags.includes(element.tagName.toLowerCase())){
    //not a header tag, check for role
      if(element.getAttribute('role') !== 'heading'){
        throw new TypeError('needs to be a H tag or have role set to heading, to add non-header element use force header argument');
      
      }else{
      //has role header
        if(element.getAttribute('aria-level'))
          this.level = Number(element.getAttribute('aria-level'));
        else
          throw new Error('Header without a level');
      }
    }else{
    //a H tag
      if(element.getAttribute('aria-level')){
      //its level has been overrided, use this instead
        this.level = Number(element.getAttribute('aria-level'));
      }else{
        this.level = Number(element.tagName.split('')[1]);
      }
    }
    this.originalLvl = this.level;
  }
  setLevel(lvl){
    this._lvlChanged = true;
    this.level = lvl;
    this.element.setAttribute('ae_headers_autoRem',this.level);
  }
  assignWeight(){
    let count = 0;
    let n = this.element;
    while(n !== document.body){
      count++;
      n=n.parentElement;
    }
    this.weight = count;

  }
  updateLvl(){
    if(this._lvlChanged){
      if(this.element.getAttribute('ae_headers_rem_main')){//main header
        return;
      }
      if(this.level > 1 && this.level < 7){
        this.element.setAttribute('role','heading');
        this.element.setAttribute('aria-level',this.level);
        this._lvlChanged = false;
      }else{
        this.element.setAttribute('role','presentation');
        this.element.removeAttribute('aria-level');
      }
      if(this.originalLvl === this.level && this.element.tagName.toLowerCase()[0] === 'h'){
        this.element.removeAttribute('role');
        this.element.removeAttribute('aria-level');
        this.element.removeAttribute('ae_headers_autoRem');
      }
    }
  }
}//end node

export default class LL{
  constructor(){
    this.head = null;
    this.tail = null;
    this.mainHeader = null;

  }
  traverse(callback = ()=>false){
    let n = this.head;
    if(!n){
      return null;
    }
    while(n.next){
      if(callback(n))
        return n;
      if(n === this.tail)
        return n;
      n= n.next;
    }
    return n;
  }
  /**
 * go thru link list until find node looking for. callback returns node that satifies search
 * @static
 * @param {Node} start - point in list to start from 
 * @callback callback - return true to end the traversal before reaching the end
 * @returns {Node | null} - returns node that satifies search, last node in list, or null if list is empty
 */
  static traverse(start, callback = ()=>false){
    if(start){
      let n = start;
      while(n.next){
        if(callback(n))
          return n;
        n= n.next;
      }
      return n;
    }
  }
  _addAsNode(node){
    if(!this.head){
    //first element
      this.head = node;
      this.tail = this.head;
    }else{
      let cEnd = this.traverse();
      let end = node;
      cEnd.next = end;
      this.tail = end;
    }
  }
  push(element){
    console.log(element.parentElement);
    if(!this.head){
    //first element
      this.head = new Node(element,null);
      this.tail = this.head;
    }else{
      let cEnd = this.traverse();
      let end = new Node(element,cEnd);
      cEnd.next = end;
      this.tail = end;
    }
  }
  pop(){
    let end = this.tail;
    this.traverse((n)=>n.next.next === null).next = null;
    return end;
  }
  fromArray(arr){
    arr.forEach(i=>this.push(i));
  }
  _display(){
    let output = '';
    this.traverse(n=>{
      output += n.element.attributes['aria-level'] ? n.element.tagName + '[level '+ n.element.getAttribute('aria-level') + '] ->' :  n.element.tagName + '  -> ';
    });
    return output;
  }
  _displayDepth(){
    let symbol = '-';
    this.traverse(n=>{
      console.log(symbol.repeat(n.weight)+ n.element.tagName);
    });
  }
}
