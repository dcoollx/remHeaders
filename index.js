import LL from './classes/linklist';
import regions from './classes/Landmarks';
import Writer from './classes/Writer';
import GUI from './classes/GUI';



window.remHeaders = function(verbose = false, forcedHeader=null, analyzeOnly = true, ignore=null,  notHeaders = null, mainHeaderConfirmed = false,){//currently only take selector strings
  console.log('starting header rem');
  if(analyzeOnly){
    //updateAll = (n)=>null;
    verbose ? console.log('analyzing only... adding helpers') : null;
  }
  let landmarks = new regions();

  ////now will rem each landmark
  let mainList = new LL();
  mainList.fromArray(document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]'));
  if(landmarks.allRegions){
    for(let region of ['banner','main', 'footer']){
      console.log(region);
      landmarks.findContaining(region, mainList);
      //check for regions
    }
    verbose ? console.log(landmarks) : null;
  }
 
  // if(analyzeOnly)
  //return list;
  verbose ? console.log(mainList._displayDepth()): null;
  //////////version 3
  let output = new Writer();
  ///////end version 3
  /////////////new stuff, by landmark
  //header landmark
  if(landmarks.allRegions){
    let high = 6;
    landmarks.banner.list.traverse((n)=>{
      if(n.level < high)
        high = n.level;
      if(n === landmarks.banner.list.tail)//todo add this check to traverse
        return true;
    });
    verbose ? console.log('banner lowest level: ', high) : null;
    landmarks.banner.list.traverse((n)=>{
      if(high !== 2){//dont change if correct
        if(n.level === high){
          n.setSuggestedLevel(2); 
        }else{
          let diff = high - 2;
          verbose ? console.log('node diff = ', diff) : null;
          n.setSuggestedLevel(n.level - diff);//move down by the same 
        }
      }
      if(n === landmarks.banner.list.tail)
        return true;
    });
  }//end for now
  //landmarks.banner.list.traverse(groupFix);
  ///////////find main header
  mainList.mainHeader =  mainList.traverse(n=>n.level===1);//create sub ll
  //console.log('main list', list);
  if(mainList.mainHeader === null){
  //there is no main header
    let logoHeader = document.querySelector('header a[href="/"] > img:eq(0)');//main logo
    if(!logoHeader){
      this.console.warn('no main header found please add one to page or designate one in function');
    }
    this.console.warn('no h1 found, changing logo to h1');
    logoHeader.setAttribute('role','heading');
    logoHeader.setAttribute('aria-level','1');//todo, this doesnt trigger adding to the list of rems
    //todo wrap in function to be invokeed here
  }
  mainList.mainHeader.element.setAttribute('ae_headers_rem_main','');
  let n = mainList.mainHeader.next;
  while(n.next){
    if(n.level ===1){
      n.setSuggestedLevel(2);
    } 
    n = n.next;//increment */
  } //
  //main

  //landmarks.main.list.traverse(oneStepRule);

  //footer
  let high = 6;
  landmarks.footer.list.traverse((n)=>{
    if(n.level < high)
      high = n.level;
    if(n === landmarks.banner.list.tail)//todo add this check to traverse
      return true;
  });

  landmarks.footer.list.traverse((n)=>{
    if(high !== 2){//dont change if correct
      if(n.level === high){
        n.setSuggestedLevel(2);
      }else{
        n.setSuggestedLevel(0);//role presentation
      }
    }
    if(n === landmarks.banner.list.tail)
      return true;
  });


  //////////
  let subList = new LL();
  if(mainList.mainHeader.prev !== null){//if main is not top of list
    subList.head = mainList.mainHeader;//todo applie one step rules for sublist, for list aplly specialized checks
    subList.tail = mainList.tail;
  //set any lvl 1 other than main to lvl 2
  }else{
    //there is no sublist
    subList = mainList;
  }
  console.log('sublist',subList._display());

  //subList.traverse(n=>oneStepRule(n));//aply one ste rule to sub list
  mainList.mainHeader.setSuggestedLevel(1);
  //mainList.traverse();
  let panel = new GUI(output,mainList);
  return mainList;
};