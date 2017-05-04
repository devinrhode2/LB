function src(url) {
  if (url.indexOf('http') === 0) {
    if (url !== preview.url) {
      alert('ERROR. Mixup with preview.url and the actually url being set. url: ' + url + ' preview.url: ' + preview.url)
    }
  }
  iframe.name = 'smartframe'
  iframe.setAttribute('name', 'smartframe')
  if (iframe.contentWindow) iframe.contentWindow.name = 'smartframe'
  
  document.documentElement.appendChild(createElement('script', {
    id: 'scoutScript',
    innerHTML: "\
      setTimeout(function one(){                                                        \
        document.getElementById('smartframe').contentWindow.name = 'smartframe';        \
        setTimeout(function two(){                                                      \
          document.getElementById('smartframe').contentWindow.location.href = '"+url+"';\
          document.getElementById('smartframe').contentWindow.name = 'smartframe';      \
          setTimeout(function three(){                                                  \
            document.getElementById('smartframe').contentWindow.name = 'smartframe';    \
            var ScoutScript = document.getElementById('scoutScript');                   \
            ScoutScript.parentNode.removeChild(ScoutScript);                            \
          }, 1);                                                                        \
        }, 1);                                                                          \
      }, 1);"
  }))
}

//previous <li> that was loaded.
var prevLi = ''

//preview is used to load a site, it determines whether to just set the iframe src or use altLoad
function preview(url, li, auto) {
  if (typeof auto !== 'undefined' && auto) {
    trackEvent('auto load')
  } else {
    trackEvent('manually clicked result')
  }
  if (!url) {
    console.log('preview received bad url parameter: ' + url)
    return
  }
  
  /////////////////
  //HIGHLIGHT LOGIC
  //figure out which <li> element to highlight as the loaded page. (the darker blue)
  if (classG[li]) {
    if (typeof li === 'undefined') {
      alert('please pass the li number to preview()')
    }
    if (prevLi === '') {
    
      //initial load
      prevLi = li
      classG[li].classList.add('scoutOpenedResult')
      
    } else {
    
      if (classG[prevLi]) {
      
        //swap the highlition for the loaded result.
        classG[prevLi].classList.remove('scoutOpenedResult')
        prevLi = li
        classG[li].classList.add('scoutOpenedResult')
        
      } else {
        console.log('getClass(\'g\')[prevLi] was false')
        setTimeout(function previewInTwoHundredMilliseconds(){
          preview(url, li, auto)
        }, 200)
        return
      }
    
    }
  } else {
    console.log('calling preview again.. <li> was false.')
    setTimeout(function secondPreviewInTwoHundreMilliseconds(){
      preview(url, li, auto)
    }, 200)
    return
  }

  //normalize. Sometime result url's are google.com/?url= ..this then redirects to the actual page. 
  //We need the page url though.
  url = normalizeUrl(url)
  
  if (typeof preview.justStarted === 'undefined') {
    preview.justStarted = true
  }
  
  if (preview.url === url && preview.justStarted) {
    //FAIL
    console.log('preview for: ' + url + 'returning. Already opening/opened this result!')
    return 'already opening/opened this result!'
  } else {
    preview.justStarted = true
  }
  
  setTimeout(function previewStarted(){
    preview.justStarted = false
  }, 200)
  
  //preview.url is used in multiple places for getting the current loaded url/page
  preview.url = url
  
  if (typeof fullSiteLink !== 'undefined') fullSiteLink.setAttribute('href', url)

  
  ///////////////
  //LOADING LOGIC  
  loading('start') //loading notification.
  
  window.domain = plainDomain(url)
  
  console.log('opening: ' + url)
  
  src(url)
  
  //END OF Preview
}



function loading(state) {
  if (state === 'start') {
    loadingDiv.style.display = 'block'
    setTimeout(function fadeInLoadingDiv(){
      loadingDiv.style.opacity = '1'
    }, 2)
    //setTimeout fixes bug where loading would just immediately appear without fade-in
  } else if (state === 'done') {
    loadingDiv.style.opacity = '0'
    setTimeout(function displayNoneLoadingDiv(){
      loadingDiv.style.display = 'none'
    }, 400)
  } else {
    alert('loading needs to be passed a string of start or done')
  }
}

//extract out page url from google's link wrapping/tracking mechanism.
function normalizeUrl(urlParam) {
  if (urlParam.indexOf('http://www.google.com/url?') > -1 || urlParam.indexOf('https://www.google.com/url?') > -1) {
    var startUrl = urlParam.indexOf('url=') + 4
    var endUrl = urlParam.indexOf('&', startUrl + 4)
    urlParam = urlParam.substring(startUrl, endUrl)
    urlParam = unescape(urlParam)
    console.log('normalizing down to url param: ' + urlParam)
  }
  return urlParam
}

//domain to be added to database..
function plainDomain(url) {
  //remove first 7 characters. The uniqueness of the 's' in https is preserved because a / will start the url. 
  url = url.substr(7, url.length)
  
  //cut off everything beyond the domain name
  url = url.substr(0, url.indexOf('/', 4))
  return url
}
