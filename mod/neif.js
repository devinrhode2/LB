
var firstLinkNode = ''
var neifCount = 0
var prevBodyHeight = 0
var prevSmartframeHeight = 0
var linkNodes
var numLinks
var r
var cachedInnerHeight = ''
var firstRealLinkIndex = 0
var linkNodes = document.getElementsByClassName('r')
//neif = Never Ending InFinite loop
function neif() {
    
    //maintain proper body height (so that you can scroll all the way to the bottom, 
    //a side effect of css at the top with the search box)
    if (window.innerHeight > 0) { //if NaN or string, results in false
      cachedInnerHeight = window.innerHeight
      if ( (cachedInnerHeight - 83) != prevBodyHeight) { //single equals cause we don't need type co-ersion, and I suspect it would be more efficient without this. 
        //console.log('changed body height + offset');
        prevBodyHeight = cachedInnerHeight - 83
        prevSmartframeHeight = cachedInnerHeight - 30
        window.paneHeights.innerHTML = 
          'html>body  {height:'+(prevBodyHeight + 2)       +'px !important;}'+
          '#smartframe{height:'+(prevSmartframeHeight + 2) +'px !important;}'
      }
    }
    
    if (linkNodes && linkNodes[linkNodes.length - 1]) {
      numLinks = linkNodes.length
      //if firstLinkNode differs from the known firstLinkNode, modLinks so they open in smartframe, and open first one
      if (linkNodes[0].firstChild && linkNodes[linkNodes.length - 1].firstChild) {
        if (firstLinkNode != linkNodes[0].firstChild) {
          firstLinkNode = linkNodes[0].firstChild
          document.documentElement.setAttribute('auto-opened-result-count', neifCount++)
          while (!linkNodes[firstRealLinkIndex].firstChild.href) {
            firstRealLinkIndex++
          }
          preview(linkNodes[firstRealLinkIndex].firstChild.href, firstRealLinkIndex, true) //true or auto-opened
        }
        if (!linkNodes[0].firstChild.onclick || !linkNodes[linkNodes.length - 1].firstChild.onclick) {
          linkMods()
        }
      } else {
        console.error('linkMods foo?')
      }
    } 
}

function rOnClick(e) {
  if (e.metaKey) {
    console.log('cmd is down, do nothing different, follow browser default')
  } else if(e.shiftKey) {
    console.log('shift is down, do nothing different, follow browser default.')
    
    //let alt propagate to <li>
  } else {
    console.log('no modifier keys, calling preview..')
    e.preventDefault()
    //e.stopPropagation() //let it propagate to the <li>
    console.log('link clicked: ' + this.href + '\nli: ' + i)
    return false
  } 
}

var classG = document.getElementsByClassName('g')
var classTs = document.getElementsByClassName('ts')

//Same as Instant Update
function linkMods() {
  console.log('linkMods')
  var numLinks = linkNodes.length
  for (var i = 0; i < numLinks; i++) {
    (function forEveryLink(i){
      linkNodes[i].firstChild.onclick = rOnClick
    }(i))
  }
  
  var numLis = classG.length
  for (var i = 0; i < numLis; i++) { //rig onclick of all li's
    (function forEveryLi(i) {
      classG[i].onclick = function gOnClick(e) {
        if (e.metaKey) {
          console.log('cmd is down, do nothing different, follow browser default.')
        } else if(e.shiftKey) {
          console.log('shift is down, do nothing different, follow browser default.')
        } else if(e.altKey) {
          console.log('alt is down, going to full site!')
          e.preventDefault() //#d9e6ff
          e.stopPropagation()
          location.href = classG[i].getElementsByClassName('r')[0].firstChild.href;
          return false
        } else {
          console.log('calling preview..')
          e.preventDefault() //#d9e6ff
          e.stopPropagation()
          preview(classG[i].getElementsByClassName('r')[0].firstChild.href, i)
          return false
        }
      };
      classG[i].setAttribute('class', classG[i].getAttribute('class') + ' result')
    }(i))
  }
  
  if (classTs[0] 
      && classTs[0].childNodes[0] 
      && classTs[0].childNodes[0].childNodes[1] 
      && classTs[0].childNodes[0].childNodes[1].childNodes[0] 
      && classTs[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0]) {
    var numVids = classTs.length
    for (var i = 0; i < numVids; i++) { //rig onclick for video li's
      (function forEveryTs(i){
        if (classTs[i] 
        && classTs[i].childNodes[0] 
        && classTs[i].childNodes[0].childNodes[1] 
        && classTs[i].childNodes[0].childNodes[1].childNodes[0] 
        && classTs[i].childNodes[0].childNodes[1].childNodes[0].childNodes[0]) {
          console.log('hit video unit:')
          var vidThumb = classTs[i].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
          console.log(vidThumb)
          vidThumb.onclick = function vidThumbOnclick(e) {
            if (e.metaKey) {
              console.log('cmd is down, do nothing different, follow browser default.')
            } else if (e.shiftKey) {
              console.log('shift is down, do nothing different, follow browser default.')
            } else if (e.altKey) {
              console.log('alt is down, full screen!')
              e.preventDefault() //#d9e6ff
              e.stopPropagation();
              location.href = classG[i].getElementsByClassName('r')[0].firstChild.href
              return false
            } else {
              console.log('calling preview..')
              e.preventDefault()
              e.stopPropagation()
              preview(this.href, i)
              console.log('vid clicked' + this.href)
              return false
            }
          }
        }
      }(i))
    }
  }
} //end linkMods()
