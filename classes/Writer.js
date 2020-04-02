import selector from 'css-selector-generator';
export default class Writer{
  constructor(out = null){
    this.options = {selectors : ['id', 'attribute', 'class', 'nthoftype'], blacklist : [/.*-?ae-.*/, '[ae_headers_autorem=*]'], combineWithinSelectors : true, combineBetweenSelectors: true, includeTag : true};
    this.selector = selector;
    this.output =  `//Auto Heading Rem for ${window.location.href} \n if(window.location.pathname ==='${window.location.pathname}'){\n`;
    this.target = out;
  }
  clear(){
    this.output = `//Auto Heading Rem for ${window.location.href}  if(window.location.pathname === '${window.location.pathname}'){\n`;
  }
  display(){
    this.output += '\n}';
    if(this.target){
      this.target.innerHTML = this.output;
      this.target.select();
      document.execCommand('copy');
      console.log('Rem added to clipboard');
    }else{
      alert(this.output);
    }
    
  }
  setOutput(o){
    this.target = o;
  }

  writeLn(node){
    if(node.level !== node.originalLvl){
      console.log('writing to output');
      let sel = this.selector(node.element, this.options);
      if(node.level > 0){
        this.output += `\t ele.outerFind('${sel}').attr({role:'heading','aria-level':${node.level}}); \n`;
      }else{
        this.output += `\t ele.outerFind('${sel}').attr({role:'presentation'}); \n`;
      }
    }
  }


}
