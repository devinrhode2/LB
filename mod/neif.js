
var firstLinkNode = '';
var neifCount = 0;
var prevBodyHeight = 0;
var prevSmartframeHeight = 0;
var linkNodes;
var numLinks;
var r;
var cachedInnerHeight = '';
var firstRealLinkIndex = 0;
//neif = Never Ending InFinite loop
function neif() {
    
    //maintain proper body height (so that you can scroll all the way to the bottom, 
    //a side effect of css at the top with the search box)
    if (window.innerHeight > 0) { //if NaN or string, results in false
      cachedInnerHeight = window.innerHeight;
      if ( (cachedInnerHeight - 83) != prevBodyHeight) { //single equals cause we don't need type co-ersion, and I suspect it would be more efficient without this. 
        //console.log('changed body height + offset');
        prevBodyHeight = cachedInnerHeight - 83;
        prevSmartframeHeight = cachedInnerHeight - 30
        window.paneHeights.innerHTML = 
          'html>body  {height:'+(prevBodyHeight + 2)       +'px !important;}'+
          '#smartframe{height:'+(prevSmartframeHeight + 2) +'px !important;}';
      }
    }
    
    r = document.getElementsByClassName('r');
    if (r && r[r.length - 1]) {
      linkNodes = getClass('r');
      numLinks = getClass('r').length;
      //if firstLinkNode differs from the known firstLinkNode, modLinks so they open in smartframe, and open first one
      if (linkNodes[0].firstChild && linkNodes[linkNodes.length - 1].firstChild) {
        if (firstLinkNode != linkNodes[0].firstChild) {
          firstLinkNode = linkNodes[0].firstChild;
          document.documentElement.setAttribute('auto-opened-result-count', neifCount++);
          while (!linkNodes[firstRealLinkIndex].firstChild.href) {
            firstRealLinkIndex++;
          }
          preview(linkNodes[firstRealLinkIndex].firstChild.href, firstRealLinkIndex, true); //true or auto-opened
        }
        if (!linkNodes[0].firstChild.onclick || !linkNodes[linkNodes.length - 1].firstChild.onclick) {
          linkMods();
        }
      } else {
        console.error('linkMods foo?');
      }
    } 
    
    setTimeout(neif, 200);
};

//Same as Instant Update
function linkMods() {
  console.log('linkMods');
  var numLinks = getClass('r').length;
  for (var i = 0; i < numLinks; i++) {
    (function(i){
      getClass('r')[i].firstChild.onclick = function (e){
        if (e.metaKey) {
          console.log('cmd is down, do nothing different, follow browser default');
        } else if(e.shiftKey) {
          console.log('shift is down, do nothing different, follow browser default.');
          
          //let alt propagate to <li>
        } else {
          console.log('no modifier keys, calling preview..');
          e.preventDefault();
          //e.stopPropagation(); //let it propagate to the <li>
          console.log('link clicked: ' + this.href + '\nli: ' + i);
          return false;
        } 
      };
    }(i))
  }
  
  var numLis = getClass('g').length;
  for (var i = 0; i < numLis; i++) { //rig onclick of all li's
    (function(i){
      getClass('g')[i].onclick = function (e){
        if (e.metaKey) {
          console.log('cmd is down, do nothing different, follow browser default.');
        } else if(e.shiftKey) {
          console.log('shift is down, do nothing different, follow browser default.');
        } else if(e.altKey) {
          console.log('alt is down, going to full site!');
          e.preventDefault(); //#d9e6ff
          e.stopPropagation();
          location.href = getClass('g')[i].getElementsByClassName('r')[0].firstChild.href;
          return false;
        } else {
          console.log('calling preview..');
          e.preventDefault(); //#d9e6ff
          e.stopPropagation();
          preview(getClass('g')[i].getElementsByClassName('r')[0].firstChild.href, i);
          return false;
        }
      };
      getClass('g')[i].setAttribute('class', getClass('g')[i].getAttribute('class') + ' result');
    }(i))
  }
  
  if (getClass('ts')[0] 
      && getClass('ts')[0].childNodes[0] 
      && getClass('ts')[0].childNodes[0].childNodes[1] 
      && getClass('ts')[0].childNodes[0].childNodes[1].childNodes[0] 
      && getClass('ts')[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0]) {
    var numVids = getClass('ts').length;
    for (var i = 0; i < numVids; i++) { //rig onclick for video li's
      (function(i){
        if (getClass('ts')[i] 
        && getClass('ts')[i].childNodes[0] 
        && getClass('ts')[i].childNodes[0].childNodes[1] 
        && getClass('ts')[i].childNodes[0].childNodes[1].childNodes[0] 
        && getClass('ts')[i].childNodes[0].childNodes[1].childNodes[0].childNodes[0]) {
          console.log('hit video unit:');
          var vidThumb = getClass('ts')[i].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
          console.log(vidThumb);
          vidThumb.onclick = function (e) {
            if (e.metaKey) {
              console.log('cmd is down, do nothing different, follow browser default.');
            } else if (e.shiftKey) {
              console.log('shift is down, do nothing different, follow browser default.');
            } else if (e.altKey) {
              console.log('alt is down, full screen!');
              e.preventDefault(); //#d9e6ff
              e.stopPropagation();
              location.href = getClass('g')[i].getElementsByClassName('r')[0].firstChild.href;
              return false;
            } else {
              console.log('calling preview..');
              e.preventDefault();
              e.stopPropagation();
              preview(this.href, i);
              console.log('vid clicked' + this.href);
              return false;
            }
          };
        }
      }(i))
    }
  }
} //end linkMods()
