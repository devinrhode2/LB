firstEverLoad = true
//htmlGroup runs when the <html> element is available.
firstDomNodes = document.createDocumentFragment()

htmlGroup = (width) => {
  if (!document.documentElement) {
    return setTimeout(() => {
      htmlGroup()
    }, 10)
  }
  if (width == null) {
    throw new Error('width was not defined before htmlGroup was called')
  }
  
  /////////////////
  //LEAVE OUR MARK!
  document.documentElement.appendChild(document.createComment())


  ///////////////////////////////////////////
  //CUSTOM STYLES W/ RESPECT TO WIDTH SETTING
  firstDomNodes.appendChild(createElement('style', {
    innerHTML:
    'html, #searchform, #gb { max-width: 574px !important;min-width: 10% !important; width: #{width}% !important;}'
   +'html { height: auto; border-bottom: none; border-top: none; }'
   +'body { z-index: 2; position: relative; }'
   +'html { overflow: hidden; height: 100%; }'
   +'body { height: 100%; }'
  }))

  ////////////////////
  // RESIZE STYLES NODE
  firstDomNodes.appendChild(window.resizeStyles = createElement('style', {
    innerHTML: '',
    id: 'resizeStyles'
  }))
  resizeSplitTo(width)

  ///////////////
  // General-styles.css link
  // firstDomNodes.appendChild(createElement('link', {
  //   href: chrome.extension.getURL('general-styles.css'),
  //   rel: 'stylesheet'
  // }))

  rightPaneBaseStyles = 'white-space: nowrap;position:fixed; right: 0px; z-index:111;'

  ////////
  //IFRAME
  firstDomNodes.appendChild(window.iframe = createElement('iframe', {
    //explicit properties
    id: 'smartframe',
    onload() {
      if (firstEverLoad) {
        //Do nothing.
        firstEverLoad = false
      } else {
        loading('done')
        
        //wrap errors and warnings
        console.groupEnd()
      }
    },
    onerror() {
      alert('iframe error!') //never happens... but just in case...
    },
    onmouseover() {
      this.focus()
    },
    className: 'rightPane',
    sandbox: 'allow-scripts allow-forms allow-same-origin',
  }, {
    //explicit attributes
    name: 'smartframe',
    style: rightPaneBaseStyles +
    '-webkit-user-select: none;top: 31px; height: 100%; width: #{100 - width}%; background: white; border: none;'
  }))


  //////////////////
  //updateTabDisplay
  window.updateTabDisplay = (data) => {
    fullSiteLink.href = data.url
    favicon.parentNode.removeChild(favicon)
    window.favicon = null
    favicon = createElement('link', {
      href: 'chrome://favicon/' + data.url,
      id: 'scoutFavicon',
      rel: 'shortcut icon'
    })
    document.head.appendChild(favicon)
    //favicon struggles... :( 
    //if (data.title) //Yep, usually false.
    //  document.title = data.title;
  }

  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://plus.google.com') {
      if (event.data) {
        message = JSON.guardedParse(event.data)
      }
      if (message !== false) {
        updateTabDisplay({
          url: message.url,
          title: message.title
        })
      }
      console.log((message ? 'good' : 'bad') + ' message from ' + event.origin + ':', event)
    }
  }, false)

  /////////
  //TOP BAR
  topBar = createElement('div', {
    id: 'topBar',
    className: 'rightPane topBarGradient'
  }, {
    style: rightPaneBaseStyles +
      '-webkit-user-select: none;padding-top: 4px; top: 0px; height: 27px;'+
      '-webkit-box-shadow: 2px 0px 5px 0px hsla(0, 0%, 29%, 0.6)'
  })

  /////////////
  //--FULL SITE
  topBar.appendChild(window.fullSiteLink = createElement('a', {
    innerHTML: 'Open Full Site',
    className: 'bootstrappyGray'
  }))

  /////////////////
  //--ON/OFF BUTTON
  topBar.appendChild(window.onOffButton = createElement('a', {
    innerHTML: 'Turn off Scout',
    onclick (){
      set('on', 'false')
      location.reload()
    },
    className: 'bootstrappyGray'
  }, {
    style: 'float: right;margin-right: 5px;'
  }))

  ///////////////////
  //--BETA GROUP LINK
  topBar.appendChild(window.betaGroup = createElement('a', {
    innerHTML: 'Check Beta Group',
    onclick (){
      preview('https://www.facebook.com/groups/243105935781743/', 0)
    },
    className: 'bootstrappyGray'
  }, {
    style: 'color: #333 !important;'
  })

  //////////
  //--UPDATE
  topBar.appendChild(window.updateBtn = createElement('a', {
    innerText: 'Update Scout!',
    className: 'updateRed hidden',
    onclick: () => {
      updateBtn.classList.add('hidden')
      location.href = 'http://thescoutapp.com/extension/scout.crx'
    },
    show: () => {
      updateBtn.classList.remove('hidden')
    }
  }))

  firstDomNodes.appendChild(topBar)


  ///////////
  //COVER DIV - for adjustable sidebar
  //this cover div is needed so that you when you drag over the iframe mousemove still triggers.
  //Otherwise you can't drag back to the right.
  firstDomNodes.appendChild(window.coverDiv = createElement('div', {
    id: 'coverDiv',
  }, {
    style: 'position: fixed; width: 100%; height: 100%; z-index: -10; background: transparent; top: 0px; left:0px;'
  }))


  ////////////////////////
  //DRAG DROP AREA DIV FIX
  window.dragging = () => {
    document.documentElement.style.webkitUserSelect = 'none'

    coverDiv.style.zIndex = 99999

    window.onmousemove = (e, save) => {
      pageWidth = document.documentElement.clientWidth
      toLeft = e.clientX
      percent = (toLeft/pageWidth) * 100
      if (percent < 10) {
        percent = 10
      }
  
      //573 is basically the max width that the text of results will flow.
      if (toLeft > 573) {
        if (percent === 10) {
          alert('You must have an awfully large screen, we hit a bug. You should make your window smaller than 5730 pixels (about the width of 4 13" macbook screens)');
        }
        percent = 573/pageWidth * 100
      }
      resizeSplitTo(percent)
  
      //do we want to save this adjustment?
      if (save) {
        set('width', percent)
      }
    }
  }

  //yes, whenever we get mouseup we want to check this. Often you can mouseup when you are NOT on the dragging div.
  window.onmouseup = (e) => {
    console.log('mouse up')
    document.documentElement.style.webkitUserSelect = 'text'
    //manually trigger mousemove and save width.
    if (onmousemove) onmousemove(e, true) //true will commit this width change to settings in localStorage
    doneDragging()
  }
  document.documentElement.style.webkitUserSelect = 'text'
  window.doneDragging = () => {
    window.onmousemove = null
    //hide cover so you can still interact with the page.
    coverDiv.style.zIndex = -10
  }


  //////////
  //ADJUSTOR (adjustor is the div you click and 'drag' to adjust the sidebar. 
  firstDomNodes.appendChild(adjustor = createElement('div', {
    id: 'scoutAdjustor',
    className: 'rightPane',
    onmousedown() {
      console.log('mousedown')
      dragging()
    },
    //not sure how necessary this
    oncontextmenu(e) {
      onmouseup(e)
    }
  }, {
    style: 'position:fixed; display: block; top: 30px; left: '+width+'%; height: 100%; width: 5px; background: transparent; border: none; z-index: 9999999999999; cursor: col-resize;'      
  }))


  /////////
  //FAVICON
  firstDomNodes.appendChild(window.favicon = document.createElement('link', {
    href: 'http://thescoutapp.com/static/img/favicon3.png',
    id: 'scoutFavicon',
    rel: 'shortcut icon'
  }))

  ///////
  //TITLE append, prevents flash of 'query - Google Search' or 'http://crap'
  fisrstDomNodes.appendChild(title = createElement('title', {
    innerText: ' '
  }))
  
  document.documentElement.appendChild(firstDomNodes)
  
  //continue on the the titleElement.
  titleEl()
} // End htmlGroup

newTitle = (currentTitle) => {
  if (currentTitle.contains('- Google Search')) {
    document.title = currentTitle.replace('- Google Search', '')
  }
  if (document.title.indexOf(titlePrefix) !== 0) {
    document.title = titlePrefix + document.title
  }
}
window.titlePrefix = 'Ⓢ ' //oo - 𝑺𝘤 |  - small: \u24E2 ⓢ large: \u24C8 Ⓢ - 𝑺` - 𝕊 - 

titleEl = (skipBody) => {
  //looking to the second that Google produces, not the one I insert
  if (!getTag('title')[1]) {
    return setTimeout(titleEl, 5)
  }
  secondTitleText = getTag('title')[1].innerText
  if (titleEl.initialCall && secondTitleText.indexOf('Google Search') > -1) {
    newTitle(secondTitleText)
    titleEl.initialCall = false
  }
  newTitle(document.title)
  getTag('title')[0].addEventListener("DOMSubtreeModified", (evt) => {
    titleEl(true) //true, skipBody
  }, false)
  
  if (!skipBody) body() //only get's called once.
}
titleEl.initialCall = true


secondDomNodes = document.createDocumentFragment()
body = () => {
  if (!(document.body && document.documentElement.offsetWidth > 0 && getTag('html')[0])) {
    return setTimeout(body, 5)
  }

  //visible elements
  SideBarShadowBaseStyles = 'position:fixed; display: block; left: 0px; height: 128%; width: #{width}%; background: transparent; border: none; z-index: 113;pointer-events: none;'

  ////////////
  //SHADOW DIV (on edge of sidebar)
  secondDomNodes.appendChild(shadowDiv = createElement('div', {
    id: 'shadowDiv',
  }, {
    style: SideBarShadowBaseStyles + 
      '-webkit-box-shadow: 1px 9px 5px 0px rgba(128, 128, 128, 0.6); top: 23px;'
  }))


  //////////////
  //BORDER-RIGHT 1px gray border for right of sidebar, left of the shadow. Looks cleaner.
  secondDomNodes.appendChild(window.border = createElement('div', {
    id: 'ulBorder',
    className: 'rightPane'
  }, {
    style: 'position: fixed;top: 31px;left: '+width+'%;height: 100%;width: 1px;z-index: 9;border-left: 1px solid rgba(128, 128, 128, 0.6); z-index:114;'
  }))


  /////////////
  //LOADING DIV The loading notification. loading() in preview.js fades this in and out.
  pos = (getTag('html')[0].offsetWidth - 40)/innerWidth * 100
  window.loadingDiv = createElement('div', {
    id: 'loadingDiv'
  }, {
    style: '-webkit-user-select: none;' +
      'position: absolute;'+
      'width: 83px; height: 30px;'+
      'background: whitesmoke; border: solid 1.5px #92C8F6;'+
      '-webkit-border-radius: 4px;'+
      '-webkit-box-shadow: 0 0px 7px gray;'+
      'top: 68px;left: #{pos}%;z-index: 999999;'+
      'text-align: center; font-size: 14px;'+
      'display: none;'+
      '-webkit-transition: opacity 0.4s; opacity: 0; '
  })

  loadingDiv.appendChild(loadingText = createElement('div', {
    id: 'loadingText',
    innerHTML: 'Loading...'
  }, {
    style: 'margin-top: 6px;'      
  }))

  secondDomNodes.appendChild(loadingDiv)

  /////////
  //<STYLE>sidebar and right pane heights
  secondDomNodes.appendChild(window.paneHeights = createElement('style', {
    innerText:
      'html>body{height: ' + (window.innerHeight - getComputedStyle(document.body)['margin-top']) + 'px !important',
    id: 'paneHeights'
  }))

  document.documentElement.appendChild(secondDomNodes)

  resizeSplitTo(window.width)

  //googleTopBar()
}

//<Always coming back to you!>
// googleTopBar = () => {
//   if (true) {//REFERENCE domMods.js
//     help = createElement('li', {
//       className: 'gbt',
//       innerHTML: ''+
//         '<a class="gbzt" href="http://www.facebook.com/devin.rhode404">'+
//         '  <span class="gbtb2"></span>                                 '+
//         '  <span class="gbts">Help Devin</span>                        '+
//         '</a>'
//     })
//     startNeif()
//   } else {
//     setTimeout(googleTopBar, 5)
//   }
// }
//</Always coming back to you!>

classL = document.getElementsByClassName('l')
startNeif = () => {
  if (classL[classL.length - 1] && document.body) {
    if (neif != null) {
      console.log('started neif')
      setInterval(neif, 200)
    } else {
      alert('tried calling neif when it\'s undefined but should cause this is a serp (search results page)')
    }
  } else {
    document.documentElement.setAttribute('startneif', startNeif.round++)
    setTimeout(startNeif, 50)
  }
}
startNeif.round = 0

resizeSplitTo = (percent) => {
  resizeStyles.innerHTML = [
    '.rightPane    { left:'+ percent                                                     
   ,'#loadingDiv   { left:'+ (document.documentElement.offsetWidth - 40)/innerWidth * 100
   ,'#smartframe   {width:'+ ((100 - percent) + 0.15)                                    
   ,'#searchform, html, #shadowDiv, #gb               {width:'+ percent                  
   ,'#smartframe, #ulBorder, #scoutAdjustor, #fullSite {left:'+ percent + '% !important;}'
  ].join('% !important;}')
}

