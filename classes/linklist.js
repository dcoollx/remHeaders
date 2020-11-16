export class Node{
  constructor(element,prev, attr = null){
    this.id;
    this.prev = prev;//needed?
    this.element = element;
    this.next = null;
    this.attr = attr;
   
    this.valueChanged = false;
    this.value = this.newValue = this.element.getAttribute(this.attr);
    this.display = this.element.innerText;
    
  }
  changeValue(value){
    this.newValue = value;
    this.valueChanged = this.value !== this.newValue; 
    this.element.setAttribute('ae_auto_rem', this.newValue);
  }
  getCode(){

    return `attr({'${this.attr}':'${this.newValue}'})`;
  }
   
}//end node


export class ImgNode extends Node{
  constructor(element, prev){
    super(element, prev, 'alt');
    this.type='img';
    this.inputType = 'text';
    this.display = `<img src="${element.getAttribute('src')}"/>`;
    //todo check if in link or button
  }
  
}
export class HNode extends Node{
  constructor(element, prev){
    super(element, prev);
    this.type = 'header';
    this.inputType = 'number';
    this.weight = 0;
    this.suggestedLvl = '?';
    let headerTags = ['h1','h2','h3','h4','h5','h6'];
    this.assignWeight();
    if(!headerTags.includes(element.tagName.toLowerCase())){
      //not a header tag, check for role
      if(element.getAttribute('role') !== 'heading'){
        throw new TypeError('needs to be a H tag or have role set to heading, to add non-header element use force header argument');
    
      }else{
        //has role header
        if(element.getAttribute('aria-level'))
          this.value = Number(element.getAttribute('aria-level'));
        else if(element.getAttribute('role') === 'presentation')
          this.value = 0; 
        else
          throw new Error('Header without a level');
      }
    }else{
      //a H tag
      if(element.getAttribute('aria-level')){
        //its level has been overrided, use this instead
        this.value = Number(element.getAttribute('aria-level'));
      }else{
        this.value = Number(element.tagName.split('')[1]);
      }
    }
    this.originalLvl = this.value;
    this.display = this.value;
  }
  setSuggestedLevel(lvl){
    if(typeof lvl === 'number'){
      this.suggestedLvl = lvl;
    }else{
      this.suggestedLvl = '?';
    }
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
  getCode(){
   
    if(this.newValue > 1 && this.newValue < 7){
      return `attr({role:'heading','aria-level':${this.newValue}})`;
    }else{
      return 'attr({role:"presentation"})';
    }
  
  }
}
export default class LL{
  constructor(nodeType, type ){
    this.type = type;
    this.head = null;
    this.tail = null;
    this.mainHeader = null;
    this.length = 0;
    this.nodeType = nodeType;

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
  static traverse(start = this.head, callback = ()=>false){
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
    if(!this.head){
    //first element
      this.head = new this.nodeType(element, null);
      this.tail = this.head;
      this.head.id = this.length++;
    }else{
      let cEnd = this.traverse();
      let end =  new this.nodeType(element,cEnd);
      end.id = this.length++;
      cEnd.next = end;
      this.tail = end;
    }
  }
  pop(){
    let end = this.tail;
    this.traverse((n)=>n.next.next === null).next = null;
    this.length--;
    return end;
  }
  fromArray(arr){
    arr.forEach(i=>this.push(i));
    return this;
  }
  toArray(){
    let arry = [];
    this.traverse(this.head, (n)=>{
      arry.push(n);// I want this to be a copy. not ll
      
    });
    return arry;
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
