/* eslint-disable no-console */
export default class GUI{
  constructor(writer,list){
    this.output = document.createElement('textarea');
    this.output.style = 'color:darkblue; background-color:darkblue;border:none;float:right';
    this.mainList = list;
    this.currentNode = list.head;
    this.writer = writer;
    this.writer.setOutput(this.output);
    this.container = document.createElement('center');
    this.container.id = 'ae_header_rem';
    this.style = document.createElement('style');
    this.style.innerHTML = `
      #ae_header_rem {
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
      #ae_header_rem input{
        font-size: 24px;
        border: 5px solid black;
        text-align: center;
      }
      [ae_headers_autorem]{
        background-color : bisque;
        border: 5px solid red;
      }
    `;
    document.body.append(this.style);
    this.container.innerHTML = `
      <h2 class="ae_header_exclude">{<strong id="headerText"></strong> }| <label for="headerLevel">current level: </label><code id="headerLevel"></code></h2>
    `;
    let label = document.createElement('label');
    label.setAttribute('for','ae_headerRem_input');
    label.innerText = 'set new heading level';
    let input = document.createElement('input');
    input.id = 'ae_headerRem_input';
    input.type = 'number';
    input.min = 0;
    input.max = 6;
    input.title = 'set to 0 for presentation';
    this.container.append(label);
    this.container.append(input);
    this.container.append(document.createElement('br'));
    this.controls_prev = document.createElement('button');
    this.controls_prev.innerText = '<< prev';
    this.controls_next = document.createElement('button');
    this.controls_next.innerText = 'next >>';
    this.nextButton = ()=>{
      console.log('original', this.currentNode.originalLvl,'input',input.value, 'node level',this.currentNode.level);
      if(Number(input.value) !== this.currentNode.level){
        this.currentNode.setLevel(input.value);
        //todo make this run on finish
        this.writer.writeLn(this.currentNode);
      }
      if(this.currentNode.next){
        this.currentNode = this.currentNode.next; 
        this.render();
      }else{
        this.writer.display();
        this.cleanUp();
      }
    }; 
    this.controls_next.addEventListener('click',this.nextButton);
    this.controls_prev.addEventListener('click',(e)=>{
      this.currentNode = this.currentNode.prev;
      this.render();
    });
    this.container.append(this.controls_prev);
    this.container.append(this.controls_next);
    //
    let finished = document.createElement('button');
    finished.innerText = 'finished';
    finished.addEventListener('click',(e)=>{
      this.writer.display();
      this.cleanUp();
      //delete this;
    });
    this.container.append(finished);
    //extra controls

    let showLL = document.createElement('button');
    showLL.innerText = 'show header order';
    showLL.addEventListener('click',()=>this.mainList._display());
    this.container.append(showLL);
    let showDepth = document.createElement('button');
    showDepth.innerText = 'show header depth';
    showDepth.addEventListener('click',()=>this.mainList._displayDepth());
    this.container.append(showDepth);
    this.container.append(this.output);
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
    let input = this.container.querySelector('#ae_headerRem_input');
    input.value = this.currentNode.level;
    if(this.currentNode){
      this.container.querySelector('#headerText').innerText = this.currentNode.element.innerText.trim();
      this.container.querySelector('#headerLevel').innerText = this.currentNode.level;
      document.body.append(this.container);
    }else{
      alert('end of list');
      this.controls_next.setAttribute('disabled','');
    }
  }
}