import LL, { HNode } from './classes/linklist';
import regions from './classes/Landmarks';
import Writer from './classes/Writer';
import GUI from './classes/GUI';
import Wizard from './classes/wizard';
import {ImgNode} from './classes/linklist';


window.remHeaders = function(args = {verbose : true, suggestions: true, forcedHeader: null, analyzeOnly : false, ignore : null,  notHeaders : null, mainHeaderConfirmed : false}){//currently only take selector strings
  let {verbose, suggestions, analyzeOnly, notHeaders, mainHeaderConfirmed, forcedHeader, ignore} = args;

  let log = function(...msg){
    if(verbose){
      console.log(...msg);
    }
  };
  new Wizard(HNode, 'h1,h2,h3,h4,h5,h6, [role="heading][aria-level]');
};



window.remAlts = function(){
  new Wizard(ImgNode, 'img');
};