var addressBarMessage = 'Hey! Google from the address bar<div style="padding-top:6px;font-size: 15px;float: right;margin-right: 20px;">-Devin, Scout</div>';

var textDiv = '<div style="position: absolute;top: 79px;font-size: 27px;width: 218px;left: -31px;font-family: sans-serif;">' + addressBarMessage + '</div>';

var animStyles = 
'<style type="text/css">'+
'@-webkit-keyframes bounce {'+
    '50% { -webkit-transform: translateY(-30px); }'+
'}'+
 
'#scoutArrow {'+
    '-webkit-animation-name: bounce;'+
    '-webkit-animation-timing-function: ease-out;'+
    '-webkit-animation-iteration-count: infinite;'+
    '-webkit-animation-duration: 4.5s;'+
'}</style>';

function goScoutin() {
/*
  if (document.getElementsByName('btnK')[0]) {
    document.getElementsByName('btnK')[0].value = 'Go Scoutin\'';
  } else {
    setTimeout(goScoutin, 4);
  }
*/
}


//OFFSET BTN
var round = 0;
function searchBarConfig() {
  console.error('google.com (homepage) script running.');
  goScoutin();
  trueSearchBarConfig();
}

function keynull() {
  
}

function trueSearchBarConfig() {
  
  window.addEventListener('keypress', keynull, false);
  window.addEventListener('keydown', keynull, false);
  window.addEventListener('keyup', keynull, false);
  var d = document;
  if (getId('gbqfq') && 
      getClass('gsib_a')[0] && 
      getClass('gsib_a')[0].firstChild && 
      getId('gbqf') && 
      getId('mngb') ) {
    console.error('boom, cs iso world');
    var searchInput = getId('gbqfq');
    getClass('gsib_a')[0].firstChild.removeChild(searchInput);
    getId('gbqf').action = 'http://www.google.com/search';
    getId('gbqf').removeAttribute('onsubmit');

    getClass('gsib_a')[0].firstChild.innerHTML = '<input id="gbqfq" class="gbqfif" name="q" type="text" autocomplete="off" value="" dir="ltr" style="left: 0px; border-top-style: none; border-right-style: none; border-bottom-style: none; border-left-style: none; border-width: initial; border-color: initial; border-image: initial; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; height: auto; width: 100%; outline-style: none; outline-width: initial; outline-color: initial; background-image: url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D); background-attachment: initial; background-origin: initial; background-clip: initial; background-color: transparent; position: absolute; z-index: 5; color: rgb(0, 0, 0); background-position: initial initial; background-repeat: initial initial; " spellcheck="false" x-webkit-speech="" x-webkit-grammar="builtin:search" lang="en">' 
    + getClass('gsib_a')[0].firstChild.innerHTML;
    console.error('scout all done');
    window.removeEventListener('keypress', keynull, false);
    window.removeEventListener('keydown', keynull, false);
    window.removeEventListener('keyup', keynull, false);
    console.error('homepage fixed!, neif nulled.');
    neif = null;
    setTimeout(function() {
      neif = null;
      console.error('neif nulled again');
      getId('gbqfq').focus();
      getid('gbqfq').addEventListener('keydown', function searchInputKeydown(e){
        if (e.which === 13) {
          getId('gbqf').submit();
        }
      }, false);
      
      getId('gbqfba').outerHTML = '<input value="Google Search" name="btnK" type="submit" style="cursor: pointer;background-image: -webkit-linear-gradient(top,#f5f5f5,#f1f1f1); -webkit-border-radius: 2px; -webkit-user-select: none; background-color: #f5f5f5; background-image: linear-gradient(top,#f5f5f5,#f1f1f1); background-image: -o-linear-gradient(top,#f5f5f5,#f1f1f1); border: 1px solid #dcdcdc; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px; color: #666; font-family: arial,sans-serif; font-size: 11px; font-weight: bold; height: 29px; line-height: 27px; margin: 11px 6px; min-width: 54px; padding: 0 8px; text-align: center;">';
      
      getId('gbqfbb').outerHTML = '<input value="I\'m Feeling Lucky" name="btnI" type="submit" style="cursor: pointer;background-image: -webkit-linear-gradient(top,#f5f5f5,#f1f1f1); -webkit-border-radius: 2px; -webkit-user-select: none; background-color: #f5f5f5; background-image: linear-gradient(top,#f5f5f5,#f1f1f1); background-image: -o-linear-gradient(top,#f5f5f5,#f1f1f1); border: 1px solid #dcdcdc; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px; color: #666; font-family: arial,sans-serif; font-size: 11px; font-weight: bold; height: 29px; line-height: 27px; margin: 11px 6px; min-width: 54px; padding: 0 8px; text-align: center;">';
    }, 30);
  } else {
    document.documentElement.setAttribute('searchBarConfig', round++);
    setTimeout(function(){
      searchBarConfig();
    }, 1);
  }
}

var offset = document.createElement('div');
offset.innerHTML = '<img id="scoutArrow" style="position: relative;left: 16px;top: 3px;z-index:99999;" src="data:image/png;base64,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" />' + textDiv + animStyles;
offset.setAttribute('style', 'position: absolute; top: 27px; left: 93px;');
offset.setAttribute('id', 'topOffset');
function hp_message() {
  if (getTag('html')[0]) {
    document.documentElement.appendChild(offset);
  } else {
    setTimeout(function() {
      hp_message();
    }, 3);
  }
}

var curUrl = location.href;
if (curUrl.contains('/webhp')) {
  if (curUrl.contains('?q=') || curUrl.contains('&q=') || curUrl.contains('sourceid=chrome-instant')) {
    //then it is definitely a serp
    //and it's not the homepage so we are not doing google homepage script.
  } else {
    searchBarConfig();
  }
} else {
  searchBarConfig();
}
//hp_message();

/*
new homepage start...
//OFFSET BTN
var round = 0;
function searchBarConfig() {
  window.onkeypress = function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  window.onkeydown = function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  };//both / and /webhp, /webhp only engages when no ?q= or &q=
  window.onkeyup = function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  if (getId('gbqfq') && 
      getClass('gsib_a')[0] && 
      getClass('gsib_a')[0].firstChild && 
      getId('gbqf')) {
    console.error('boom, cs iso world');
    var searchInput = getId('gbqfq');
    getClass('gsib_a')[0].firstChild.removeChild(searchInput);
    getId('gbqf').action = 'http://www.google.com/search';
    getId('gbqf').onsubmit = '';

    getClass('gsib_a')[0].firstChild.innerHTML = '<input id="gbqfq" class="gbqfif" name="q" type="text" autocomplete="off" value="" placeholder="" style="border-top-style: none; border-right-style: none; border-bottom-style: none; border-left-style: none; border-width: initial; border-color: initial; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-left: 2px; width: 100%; outline-style: none; outline-width: initial; outline-color: initial; left: 0px; top: 1px; overflow-x: hidden; overflow-y: hidden; background-image: url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D); background-attachment: initial; background-origin: initial; background-clip: initial; background-color: transparent; position: absolute; z-index: 5; color: transparent; background-position: initial initial; background-repeat: initial initial; " spellcheck="false" dir="ltr">' 
    + getClass('gsib_a')[0].firstChild.innerHTML;
    console.error('all done');
    window.onkeypress = null;
    window.onkeyup = null;
    window.onkeydown = null;
    console.error('homepage fixed!, neif nulled.');
    neif = null;
    setTimeout(function() {
      neif = null;
      console.error('neif nulled again');
    }, 300);
  } else {
    document.documentElement.setAttribute('searchBarConfig', round++);
    setTimeout(function(){
      searchBarConfig();
    }, 1);
  }
}

console.error('google.com.js injected..');
/*
  Needs to be updated to use has *method*
  ***has.url = location.href;
  ***if (has('/webhp')) {
  ***  if (has('?q=') || has('&q=') || has('sourceid=chrome-instant')) {

    console.error('')
  } else {
    searchBarConfig();
  }
} else {
  searchBarConfig();
}
*/