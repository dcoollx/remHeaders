import selector from 'css-selector-generator';
export default class Writer{
  constructor(out = null){//
    this.options = {selectors : ['id','class','tag','attribute','nthchild','nthoftype' ], blacklist : [/.*-?ae-.*/, '[ae_headers_autorem=*], [ae_auto_rem], [data-audioeye-element-highlight]'], combineWithinSelectors : true, combineBetweenSelectors: true, includeTag : true};
    this.selector = selector;
    this.output =  `//Auto Rem for ${window.location.href} \n if(window.location.pathname ==='${window.location.pathname}'){\n`;
    this.target = out;
  }
  writeLn(node){
    console.log('writing to output');
    let sel = this.selector(node.element, this.options);
    sel = sel.replace(/'/g,'"');
    this.output += `\t ele.outerFind('${sel}').${node.getCode()}; \n`;
      
      
    
  }
  clear(){
    this.output = `//Auto Rem for ${window.location.href}  if(window.location.pathname === '${window.location.pathname}'){\n`;
  }
  display(){
    
    this.output += '\n}';
    if(this.target){
      this.target.innerHTML = this.output;
      this.target.select();
      document.execCommand('copy');
      console.log('Rem added to clipboard, updated');
    }else{
      alert(this.output);
    }
    
  }
  setOutput(o){
    this.target = o;
  }

  


}
