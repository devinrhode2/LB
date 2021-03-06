//based on jquery document ready
let documentReadyCalled = false
const documentReady = (readyCallback) => {
  if (documentReadyCalled === true) {
    throw new Error('documentReady called aleady. Only call once.');
  }
  documentReadyCalled = true

  const completed = () => {
    document.removeEventListener('DOMContentLoaded', completed)
    window.removeEventListener('load', completed)
    readyCallback()
  }
  document.addEventListener('DOMContentLoaded', completed)
  window.addEventListener('load', completed)
}


//faster than polling for document.body https://gist.github.com/anonymous/5219254
documentReady(() => {
  
  //skeleton copied from:https://www.sitepoint.com/track-outbound-links-google-analytics/
  //   // abandon if link already aborted or analytics is not available??
  //   if ( e.isDefaultPrevented() ) return;

  //   // abandon if no active link or link within domain
  //   let link = $(e.target).closest("a");
  //   if (link.length != 1 || baseURI == link[0].host) return;

  //   // cancel event and record outbound link
  //   e.preventDefault();

  //preview(links[0].href)
  //links[0].classList.add('scoutOpenedResult');

  /*
  handler on #rso or something
    if e.target is a link, with an href, load that in the iframe
    elseif the e.target does not have an href.. then navigate to the first <a> in the <li>.. or the 'closest' <a>..
  */
      
  /*adjustor bar css:
  position: fixed;
  display: block;
  top: 30px;
  left: 21.7425431711146%;
  height: 100%;
  width: 5px;
  background: transparent;
  border: none;
  z-index: 9999999999999;
  cursor: col-resize;
  */

   
  //css selector targetting main links
  //let linkSelector = chrome.storage.get(location.hostname)
  //use jQuery delegation? off of body to keep things simple and stable

}, false)

/*

clean up search engine url:

Starting from this url:
{google:baseURL}search?q=%s&{google:RLZ}{google:acceptedSuggestion}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}ie={inputEncoding}

1. remove "q=%s&"
2. remove "{google:acceptedSuggestion}{google:originalQueryForSuggestion}{google:assistedQueryStats}"
3. append "&q=%s"

to get:
{google:baseURL}search?{google:RLZ}{google:searchFieldtrialParameter}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}ie={inputEncoding}&q=%s

*/