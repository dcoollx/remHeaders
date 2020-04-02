let groupFix = (node)=>{
  console.log('searching for group changes');
  let groupWeight;
  if(node.prev){
    groupWeight = node.prev.weight;
  }else{
    return;
  }
  let lvlDiff = (node.level - node.originalLvl); //todo ensure the diff doesnt over correct, can be negative
  if(node.next){//end of list
    if(node.next.weight > groupWeight){
      let tempList = new LL();// create a new list and set head/tail ** doesnt make copies of linklist. just creates references to beginning and end and leave them in order
      tempList.head = node;
      tempList.tail = tempList.traverse((n)=>{
        if(n.weight < groupWeight)
          return true;
      }).prev;
      console.log('group', tempList);

      //start group fix
      tempList.traverse(n=>{
        if(n === tempList.head){
          return false;//skip 1st one
        }
        if(n !== tempList.tail){
          let newLvl = n.level + lvlDiff;//todo, allow number to be negative
          n.setLevel(newLvl);
          return false;
        }else
          return true;
      });
    }else{
      console.log('-------no group found');
      return;
    }
  }
  
};


let oneStepRule = (current)=>{
  let nextlvl = current.next.level;
  if(nextlvl > current.level ){
    if(Math.abs(nextlvl - current.level) >= 2 ){//out side range
    
      current.next.setLevel(current.level + 1);
      groupFix(current.next);
    }

  }else if(nextlvl < current.level){//todo this is wrong, i want a diff of more than 2
    if(Math.abs(nextlvl - current.level) >= 2){
    
      current.next.setLevel(current.level - 1);
      groupFix(current.next);
    }
  }

};

let colapse = ()=>{};

export {oneStepRule, groupFix};