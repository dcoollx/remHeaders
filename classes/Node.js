export default class Node{
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
        else{
          console.warn('Heading without a level: ' + element.tagName+'.\nAssigning Temp Level');
          this.level = 3;
          this._lvlChanged = true;
        }
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
    //if role presentation set level to 0
    this.originalLvl = this.level;
    if(element.getAttribute('role') === 'presentation'){
      this.level = 0;
    }
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