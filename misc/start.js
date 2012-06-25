var offScript = function offScript() {
  if (byClass('gbtc')[0] && !byId('scoutOn')) {
    var turnOn = document.createElement('li');
    turnOn.setAttribute('class','gbt');
    turnOn.onclick = function() {
      set('on', 'yes');
      location.reload();
    };
    turnOn.innerHTML = '<style>gbzt#scoutOn:hover { color: #4C4C4C; }</style><a class="gbzt" id="scoutOn" href="#"><span class="gbtb2"></span><span class="gbts" style="color: rgb(190, 223, 83);">Turn on Scout</span></a>'
    byClass('gbtc')[0].insertBefore(turnOn);
  } else {
    setTimeout(offScript, 5);
  }
};


var webSearch = function webSearch(url) {
  var returnValue = 'default';
  if (url.has('?sourceid=chrome-instant') || 
  
      url.has('&sourceid=chrome-instant') || 
      url.has('&q=') || url.has('?q=') || 
      url.has('&as_q=') || url.has('?as_q=')) {
      /*Do nothing, continue*/
  } else {
    console.log('url doesnt have basic params indicating a web search...');
    returnValue = false;
  }
  
  if (location.hash.length > 0) { /*this may need to go at the very beginning...! not sure. works for now.*/
    url = location.hash;/*this is so that we don't analyze stuff before the '#' which would be the previous search that was done*/
  }
  
  /*bailParams. indicators by the url that we don't want to run on this page. Over time, we want to support all these views, remove these, and not bail.*/
  var bailParams = ['&tbs=sbi:', '?tbs=sbi:']; /*tbs is for searching by inputting an image, either dragging to a images.google.com tab or uploading.*/
  /*[TECHNICALLY] the tbs param is base64 encoded image data.*/
  bailParams.forEach(function(param){
    if (url.has(param)) {
      console.log('url has param:' + param + ' ');
      returnValue = false;
    }
  });
  
  /*tbm is the magical param that basically indicates what type of search is being done, at this time, only plain web search is supported.*/
  var tbmBailParams = ['isch', 'shop', 'nws', 'vid', 'plcs', 'dsc', 'rcp', 'app', 'pts', 'blg', 'bus'];
  tbmBailParams.forEach(function(search){
    if (url.has('tbm=' + search)) {
      console.log('url has tbm= param:' + search);
      returnValue = false; /*bail, don't run scout on this page.*/
    }
  });
  
  if (returnValue === 'default') {
    return true;
  } else {
    if (returnValue !== false) alert('return value should be false, but is:' + returnValue);
    return returnValue
  }
};


var isWebSearch = webSearch(location.href);
if (isWebSearch) {
  var on = get('on');
  if (on === 'yes' || on === 'true' ) {
    htmlGroup();
  } else {
    console.log('Scout is off: ' + on);
    offScript();
  }
} else {
  //if webhp but not ?q= or &q=, then it's actually the homepage, and is handled by google.com.js
  console.log('not web search.');
}

/* try getting html.innerHTML.indexOf(google.sn=") and then see if it's google.sn="web" or ="webhp" */
/* if it's web search as this variable indicates and there is a list of results, report this URL.*/


