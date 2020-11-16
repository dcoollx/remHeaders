/* eslint-disable no-console */
import Writer from './Writer';

export default class GUI{
  constructor(list){
    this.output = document.createElement('textarea');
    this.output.style = 'color:darkblue; background-color:darkblue;border:none;float:right';
    this.mainList = list;
    this.currentNode = list.head;
    this.writer = new Writer();
    this.writer.setOutput(this.output);
    this.container = document.createElement('center');
    this.container.id = 'ae_header_rem';
    this.style = document.createElement('style');
    this.input = document.createElement('input');
    this.input.id = 'ae_headerRem_input';
    this.container.append(this.input);
    this.style.innerHTML = `
    *:focus{
      border: dotted red 5px;
    }
    #headerText, #ae_header_rem label, #ae_header_rem code{
      color:white;
    }
    #ae_header_rem label{
      grid-row: 1/span 2
    }

      #ae_header_rem {
      overflow:scroll;
      padding:15px;
      display:grid;
      grid-template-rows: auto auto auto;
      max-height: 25vh;
      position: fixed !important;
      color: white;
      background-color: darkblue;
      border : 2px solid black;
      bottom:0px;
      width:100vw;
      z-index:2147483647;
      font-size : 24px !important;
      }
      #ae_header_rem button{
        background-color: blue;
        color:white;
        padding:25px;
        border: none;
        border-radius:10px;
        margin: 10px;

      }
      #ae_header_rem button:hover{
        background-color: darkblue;
      }
      #ae_header_rem input{
        font-size: 24px;
        border: 5px solid black;
        text-align: center;
        color: black;
        background-color:white;
      }
      #secondary > *{
        max-height:5%;
        max-width:5%;
      }
      [ae_headers_autorem]{
        background-color : bisque;
        border: 5px solid red;
      }
    `;
    document.body.append(this.style);
    this.container.innerHTML = `
      <h2 class="ae_header_exclude">"<strong id="headerText"></strong>" <span id="secondary"></span></h2>
    `;
    //////////////////
    let label = document.createElement('label');
    label.setAttribute('for','ae_headerRem_input');
    label.innerText = 'change the ' + this.currentNode.attr;
    this.container.append(label);
    this.container.append(this.input); 
    /////////
    let controls = document.createElement('div');
    controls.id = 'controls';
    this.controls_prev = document.createElement('button');
    this.controls_prev.innerText = '<< prev';
    this.controls_next = document.createElement('button');
    this.controls_next.innerText = 'next >>';
    this.nextButton = ()=>{
      if(this.currentNode.next){
        //inspect(this.currentNode.next);
        this.currentNode = this.currentNode.next; 
        this.render();
      }else{
        this.writer.display();
        this.cleanUp();
      }
    };
    this.input.addEventListener('change', (e)=>{
      this.currentNode.changeValue(e.target.value);

    }); 
    this.controls_next.addEventListener('click',this.nextButton);
    this.controls_prev.addEventListener('click',(e)=>{
      this.currentNode = this.currentNode.prev;
      this.render();
    });
    controls.append(this.controls_prev);
    controls.append(this.controls_next);
    //
    let finished = document.createElement('button');
    finished.innerText = 'finished';
    finished.addEventListener('click',(e)=>{

      this.mainList.traverse((n)=>{
        if(n.valueChanged){
          this.writer.writeLn(n);
        }
      });
      this.writer.display();
      this.cleanUp();
      //delete this;
    });
    controls.append(finished);
    this.container.append(controls);
    //extra controls

    let showLL = document.createElement('button');
    showLL.innerText = 'show header order';
    showLL.addEventListener('click',()=>this.mainList._display());
    //this.container.append(showLL);
    let showDepth = document.createElement('button');
    showDepth.innerText = 'show element depth';
    showDepth.addEventListener('click',()=>this.mainList._displayDepth());
    //this.container.append(showDepth);
    this.container.append(this.output);
    document.body.append(this.container);
    /////////////////////////////////
    this.render();
  }

  cleanUp(){
    console.log('clean up');
    this.container.remove();
    this.style.remove();
  }
  render(){
    if(window.$ae){
      window.AudioEye.focusElement(this.currentNode.element);
    }
      
    this.input.type = this.currentNode.inputType;
    this.input.value = this.currentNode.value;
    //this.input.min = 0;
    //this.input.max = 6;
    //this.input.title = 'set to 0 for presentation';
    
    if(this.currentNode){
      this.container.querySelector('#headerText').innerText = this.currentNode.element.innerText.trim() || this.currentNode.value;
      this.container.querySelector('#secondary').innerHTML = this.currentNode.display;
       
    }else{
      alert('end of list');
      this.controls_next.setAttribute('disabled','');
    }
    
  }
}