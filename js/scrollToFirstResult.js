function scrollFix(theOffset) {
  theOffset = -parseInt(theOffset);
  console.log('running scrollFix..');
  document.getElementById('main').style.setProperty('top', theOffset + 'px', 'important');
  scrollTo(0, theOffset);
}
//instead of using window.onload, we could poll for hdtb and then register a DOMSubtreeModified listener to that node, waiting for the top value to be set.
window.addEventListener('load', function ScoutScrollFixOnload() {
  var hdtb = document.getElementById('hdtb');
  if (hdtb && hdtb.style.top) {
    scrollFix(hdtb.style.top);
  } else {
    //DOM is considered chill when document.getElementById('hdtb').style.top is truthy over 2 DOMSubtreeModified events
    //we want to execute the core scrollFix as fast as humanly possible.. granted there isn't a more sly
    var found = false;
    function ScoutDOMSubtreeModified() {
      hdtb = document.getElementById('hdtb');
      if (hdtb && hdtb.style.top) {
        //if already found, the execute scrollFix and quit.
        if (found) {
          document.body.removeEventListener('DOMSubtreeModified', ScoutDOMSubtreeModified, false);
          scrollFix(hdtb.style.top);
        } else {
          found = true;
        }
      }
    }
    document.body.addEventListener('DOMSubtreeModified', ScoutDOMSubtreeModified, false);
  }
}, false);