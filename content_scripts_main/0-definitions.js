let documentReadyCalled = false;
const documentReady = (readyCallback) => {
  if (documentReadyCalled === true) {
    throw new Error('documentReady called aleady. Only call once.');
  }
  documentReadyCalled = true
  completed = () => {
    document.removeEventListener('DOMContentLoaded', completed)
    window.removeEventListener('load', completed)
    readyCallback()
  }
  document.addEventListener('DOMContentLoaded', completed)
  window.addEventListener('load', completed)
};

const isWebSearchUrl = (url) => {
  let returnValue = 'default'
  if (url.contains('?sourceid=chrome-instant') || 
      url.contains('&q=') ||
      url.contains('&as_q=')) {
      /*Do nothing, continue*/
  } else {
    console.log('url doesnt have basic params indicating a web search...')
    returnValue = false
  }
  
  if (location.hash.length > 0) { /*this may need to go at the very beginning...! not sure. works for now.*/
    url = location.hash /*this is so that we don't analyze stuff before the '#' which would be the previous search that was done*/
  }
  
  /*bailParams. indicators by the url that we don't want to run on this page. Over time, we want to support all these views, remove these, and not bail.*/
  const bailParams = ['&tbs=sbi:', '?tbs=sbi:'] /*tbs is for searching by inputting an image, either dragging to a images.google.com tab or uploading.*/
  /*[TECHNICALLY] the tbs param is base64 encoded image data.*/
  bailParams.forEach(function forEachBailParams(param){
    if (url.contains(param)) {
      console.log('url has param:' + param + ' ')
      returnValue = false
    }
  })
  
  /*tbm is the magical param that basically indicates what type of search is being done, at this time, only plain web search is supported.*/
  const tbmBailParams = ['isch', 'shop', 'nws', 'vid', 'plcs', 'dsc', 'rcp', 'app', 'pts', 'blg', 'bus']
  tbmBailParams.forEach(function forEachTbmBailParam(search){
    if (url.contains('tbm=' + search)) {
      console.log('url has tbm= param:' + search)
      returnValue = false /*bail, don't run scout on this page.*/
    }
  })
  
  if (returnValue === 'default') {
    return true
  } else {
    if (returnValue !== false) alert('return value should be false, but is:' + returnValue)
    return returnValue
  }
}
