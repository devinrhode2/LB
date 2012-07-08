var firstEverLoad = true;
//htmlGroup runs when the <html> element is available.
var firstDomNodes = document.createDocumentFragment();
var htmlGroup = function htmlGroup() {
  if (document.documentElement) {
    window.width = get('width'); //save from multiple calls.. was mostly a convenience when debugging.
    
    /////////////////
    //LEAVE OUR MARK!
    document.documentElement.appendChild(document.createComment('\
      \n       @@@@@@    @@@@@@@   @@@@@@   @@@  @@@  @@@@@@@  \
      \n      @@@@@@@   @@@@@@@@  @@@@@@@@  @@@  @@@  @@@@@@@  \
      \n      !@@       !@@       @@!  @@@  @@!  @@@    @@!    \
      \n      !@!       !@!       !@!  @!@  !@!  @!@    !@!    \
      \n      !!@@!!    !@!       @!@  !@!  @!@  !@!    @!!    \
      \n       !!@!!!   !!!       !@!  !!!  !@!  !!!    !!!    \
      \n           !:!  :!!       !!:  !!!  !!:  !!!    !!:    \
      \n          !:!   :!:       :!:  !:!  :!:  !:!    :!:    \
      \n      :::: ::    ::: :::  ::::: ::  ::::: ::     ::    \
      \n      :: : :     :: :: :   : :  :    : :  :      :     \n\
      \n\n      If you\'re reading this, we should probably chat.\
      \n\n      Devin\'s email is DevinRhode2@gmail.com, I have gchat with video chat,\
      \n      we can skype (devinrhode2), twitter (devinrhode2) \
      \n      facebook (facebook.com/devin.rhode404)\
      \n      or you can call or text me at 218-290-8275\
      \n      Yes I\'m interested in getting the help of a dedicated firefox, \
      \n      safari, IE, and potentially opera developer.\
      \n      Moreso than any of these though, I\'m interested in taking the \
      \n      Scout experience to the iPad, and have ideas for mobile too.\
      \n\n      I\'m also open to any and all ideas, and just good friends, \
      \n        since I\'m still pretty new in the bay area.\
      \n\n      Of course I\'m interested in investment.\
      \n\n      I\'ve got bigger ideas too... but what ideas do you have? HIT ME UP!\n'));
    
    ///////////////////////////////////////////
    //CUSTOM STYLES W/ RESPECT TO WIDTH SETTING
    firstDomNodes.appendChild(createElement('style', {
      innerHTML:
      'html, #searchform, #gb { max-width: 574px !important;min-width: 10% !important; width: '+width+'% !important;}'
     +'html { height: auto; border-bottom: none; border-top: none; }'
     +'body { z-index: 2; position: relative; }'
     +'html { overflow: hidden; height: 100%; }'
     +'body { height: 100%; }'
    }));
    
    
    ////////////////////
    //RESIZE STYLES NODE
    window.resizeStyles = createElement('style', {
      innerHTML: '',
      id: 'resizeStyles'
    });
    firstDomNodes.appendChild(resizeStyles);
    resizeSplitTo(width);
    
    
    ///////////////
    //SCOUT-CSS.CSS LINK
    firstDomNodes.appendChild(createElement('link', {
      href: chrome.extension.getURL('css/SCOUT-CSS.css'),
      rel: 'stylesheet'
    }));

    
    
    ///////////////
    //SCROLLBAR CSS
/*
    var scrollbars = createElement('link', {
      rel: 'stylesheet'
    });
    if (/mac\sos/ig.test(navigator.userAgent) || /macintosh/ig.test(navigator.userAgent)) {
      //use antiscroll?
      if (navigator.userAgent.indexOf('Mac OS X 10_7_') > -1) {
        //do nothing
      } else {
        scrollbars.href = chrome.extension.getURL('css/scrollbar.mac.css');
      }
    } else {
      scrollbars.href = chrome.extension.getURL('css/scrollbar.windows.css');
    }
    firstDomNodes.appendChild(scrollbars);
*/
    
    
    var rightPaneBaseStyles = 'white-space: nowrap;position:fixed; right: 0px; z-index:111;';
    
    ////////
    //IFRAME
    window.iframe = createElement('iframe', {
      //explicit properties
      id: 'smartframe',
      onload: function() {
        if (firstEverLoad) {
          //Do nothing.
          firstEverLoad = false;
        } else {
          loading('done');
          
          //wrap errors and warnings
          console.groupEnd();
        }
      },
      onerror: function() {
        alert('iframe error!'); //never happens...
      },
      onmouseover: function(){
        this.focus();
      };
      className: 'rightPane',
      sandbox: 'allow-scripts allow-forms allow-same-origin',
    }, {
      //explicit attributes
      name: 'smartframe',
      style: rightPaneBaseStyles +
      '-webkit-user-select: none;top: 31px; height: 100%; width: '+(100 - width)+'%; background: white; border: none;'
    });
    firstDomNodes.appendChild(iframe);
    

    //////////////////
    //updateTabDisplay
    window.updateTabDisplay = function updateTabDisplay(data) {
      fullSiteLink.href = data.url;
      favicon.parentNode.removeChild(favicon);
      window.favicon = null;
      favicon = createElement('link', {
        href: 'chrome://favicon/' + data.url,
        id: 'scoutFavicon',
        rel: 'shortcut icon'
      });
      document.head.appendChild(favicon);
      //favicon struggles... :( 
      //if (data.title) //Yep, usually false.
      //  document.title = data.title;
    }
    
    window.addEventListener('message', function windowOnMessage(event) {
      if (event.origin !== 'https://plus.google.com') {
        if (event.data) {
          var message = JSON.guardedParse(event.data);
        }
        if (message !== false) {
          updateTabDisplay({url: message.url, title: message.title});
        }
        console.log((message ? 'good' : 'bad') + ' message from ' + event.origin + ':', event);
      }
    }, false);
    
    
    /////////
    //TOP BAR
    var topBar = createElement('div', {
      id: 'topBar',
      className: 'rightPane topBarGradient'
    }, {
      style: rightPaneBaseStyles +
        '-webkit-user-select: none;padding-top: 4px; top: 0px; height: 27px;'+
        '-webkit-box-shadow: 2px 0px 5px 0px hsla(0, 0%, 29%, 0.6)'
    });
    
        /////////////
        //--FULL SITE
        window.fullSiteLink = createElement('a', {
          innerHTML: 'Open Full Site',
          className: 'bootstrappyGray'
        });
        topBar.appendChild(fullSiteLink);
            
        /////////////////
        //--ON/OFF BUTTON
        window.onOffButton = createElement('a', {
          innerHTML: 'Turn off Scout',
          onclick = function onOffButtonOnClick(){
            set('on', 'false');
            location.reload();
          },
          className: 'bootstrappyGray'
        }, {
          style: 'float: right;margin-right: 5px;'
        });
        topBar.appendChild(onOffButton);
        
        
        ///////////////////
        //--BETA GROUP LINK
        window.betaGroup = createElement('a', {
          innerHTML: 'Check Beta Group',
          onclick = function betaGroupOnclick(){
            preview('https://www.facebook.com/groups/243105935781743/', 0);
          },
          className: 'bootstrappyGray'
        }, {
          style: 'color: #333 !important;'
        });
        topBar.appendChild(betaGroup);
        
        
        //////////
        //--UPDATE
        window.updateBtn = createElement('a', {
          innerText: 'Update Scout!',
          className: 'updateRed hidden',
          onclick: function updateBtnOnClick() {
            updateBtn.classList.add('hidden');
            location.href = 'http://thescoutapp.com/extension/scout.crx';
          },
          show: function updateBtnShow() {
            updateBtn.classList.remove('hidden');
          }
        });
        
        topBar.appendChild(updateBtn);
    
    
    firstDomNodes.appendChild(topBar);
    
    
    ///////////
    //COVER DIV - for adjustable sidebar
    //this cover div is needed so that you when you drag over the iframe mousemove still triggers.
    //Otherwise you can't drag back to the right.
    window.coverDiv = createElement('div', {
      id: 'coverDiv',
    }, {
      style: 'position: fixed; width: 100%; height: 100%; z-index: -10; background: transparent; top: 0px; left:0px;'
    });
    firstDomNodes.appendChild(coverDiv)
    
    
    ////////////////////////
    //DRAG DROP AREA DIV FIX
    window.dragging = function(){
      document.documentElement.style.webkitUserSelect = 'none';
      
      coverDiv.style.zIndex = 99999;
      
      window.onmousemove = function(e, save) {
        var pageWidth = document.documentElement.clientWidth;
        var toLeft = e.clientX;
        var percent = (toLeft/pageWidth) * 100;
        if (percent < 10) {
          percent = 10;
        }
        
        //573 is basically the max width that the text of results will flow.
        if (toLeft > 573) {
          if (percent === 10) {
            alert('You must have an awfully large screen, we hit a bug. You should make your window smaller than 5730 pixels (about the width of 4 13" macbook screens)');
          }
          percent = 573/pageWidth * 100;
        }
        resizeSplitTo(percent);
        
        //do we want to save this adjustment?
        if (save) {
          set('width', percent);
        }
      };
    };
    
    //yes, whenever we get mouseup we want to check this. Often you can mouseup when you are NOT on the dragging div.
    window.onmouseup = function(e){
      console.log('mouse up');
      document.documentElement.style.webkitUserSelect = 'text';
      //manually trigger mousemove and save width.
      if (onmousemove) onmousemove(e, true); //true will commit this width change to settings in localStorage
      doneDragging();
    };
    document.documentElement.style.webkitUserSelect = 'text';
    window.doneDragging = function(){
      window.onmousemove = null;
      //hide cover so you can still interact with the page.
      coverDiv.style.zIndex = -10;
    }
    
    
    //////////
    //ADJUSTOR (adjustor is the div you click and 'drag' to adjust the sidebar. 
    var adjustor = createElement('div', {
      id: 'scoutAdjustor',
      className: 'rightPane',
      onmousedown: function(){
        console.log('mousedown');
        dragging();
      },
      //not sure how necessary this
      oncontextmenu: function adjustorOncontextMeny(e){
        onmouseup(e);
      }
    }, {
      style: 'position:fixed; display: block; top: 30px; left: '+width+'%; height: 100%; width: 5px; background: transparent; border: none; z-index: 9999999999999; cursor: col-resize;'      
    });
    firstDomNodes.appendChild(adjustor);
    
    
    /////////
    //FAVICON
    window.favicon = document.createElement('link', {
      href: 'http://thescoutapp.com/static/img/favicon3.png',
      id: 'scoutFavicon',
      rel: 'shortcut icon'
    });
    firstDomNodes.appendChild(favicon);
    
    
    ///////
    //TITLE append, prevents flash of 'query - Google Search' or 'http://crap'
    var title = createElement('title', {
      innerText = ' '
    });
    firstDomNodes.appendChild(title);
    
    document.documentElement.appendChild(firstDomNodes);
    
    //continue on the the titleElement.
    titleEl();
  } else {
    setTimeout(function() {
      htmlGroup();
    }, 4);
  }
}

titleEl.initialCall = true;
var newTitle = function newTitle(currentTitle) {
  if (currentTitle.has('- Google Search')) {
    document.title = currentTitle.replace('- Google Search', '');
  }
  if (document.title.indexOf(titlePrefix) !== 0) {
    document.title = titlePrefix + document.title;
  }
}
window.titlePrefix = 'Ⓢ '; //oo - 𝑺𝘤 |  - small: \u24E2 ⓢ large: \u24C8 Ⓢ - 𝑺` - 𝕊 - 
var titleEl = function titleEl(skipBody) {
  //looking to the second that Google produces, not the one I insert
  if (getTag('title')[1]) {
    var secondTitleText = getTag('title')[1].innerText;
    if (titleEl.initialCall && secondTitleText.indexOf('Google Search') > -1) {
      newTitle(secondTitleText);
      titleEl.initialCall = false;
    }
    newTitle(document.title);
    getTag('title')[0].addEventListener("DOMSubtreeModified", function(evt) {
      titleEl(true); //true, skipBody
    }, false);
    
    if (!skipBody) body(); //only get's called once.
    
  } else {
    setTimeout(titleEl, 5);
  }
}

var secondDomNodes = document.createDocumentFragment();
var body = function body() {
  if (document.body && document.documentElement.offsetWidth > 0 && getTag('html')[0]) {
    
    //visible elements
    SideBarShadowBaseStyles = 'position:fixed; display: block; left: 0px; height: 128%; width: '+width+'%; background: transparent; border: none; z-index: 113;pointer-events: none;';
    
    ////////////
    //SHADOW DIV (on edge of sidebar)
    var shadowDiv = createElement('div', {
      id: 'shadowDiv',
    }, {
      style: SideBarShadowBaseStyles + 
        '-webkit-box-shadow: 1px 9px 5px 0px rgba(128, 128, 128, 0.6); top: 23px;'
    });
    secondDomNodes.appendChild(shadowDiv);
    
    
    //////////////
    //BORDER-RIGHT 1px gray border for right of sidebar, left of the shadow. Looks cleaner.
    window.border = createElement('div', {
      id: 'ulBorder',
      className: 'rightPane'
    }, {
      style: 'position: fixed;top: 31px;left: '+width+'%;height: 100%;width: 1px;z-index: 9;border-left: 1px solid rgba(128, 128, 128, 0.6); z-index:114;'
    });
    secondDomNodes.appendChild(border);
    
            
    /////////////
    //LOADING DIV The loading notification. loading() in preview.js fades this in and out.
    var pos = (getTag('html')[0].offsetWidth - 40)/innerWidth * 100;
    window.loadingDiv = createElement('div', {
      id: 'loadingDiv'
    }, {
      style: '-webkit-user-select: none;position: absolute; width: 83px; height: 30px; background: whitesmoke; border: solid 1.5px #92C8F6; -webkit-border-radius: 4px; -webkit-box-shadow: 0 0px 7px gray; top: 68px;left: ' + pos + '%;z-index: 999999;text-align: center; font-size: 14px; display: none; -webkit-transition: opacity 0.4s; opacity: 0; '
    });
    
    var loadingText = createElement('div', {
      id: 'loadingText',
      innerHTML: 'Loading...'
    }, {
      style: 'margin-top: 6px;'      
    });
    loadingDiv.appendChild(loadingText);
    
    secondDomNodes.appendChild(loadingDiv);
    
    
    /////////
    //<STYLE>sidebar and right pane heights
    window.paneHeights = createElement('style', {
      innerText:
        'html>body{height: ' + (window.innerHeight - getComputedStyle(document.body)['margin-top']) + 'px !important',
      id: 'paneHeights'
    });
    secondDomNodes.appendChild(paneHeights);
    
    document.documentElement.appendChild(secondDomNodes);
    
    resizeSplitTo(window.width);
    
    googleTopBar();
  } else {
    setTimeout(body, 5);
  }
}

//<Always coming back to you!>
var googleTopBar = function googleTopBar() {
  if (true) {//REFERENCE domMods.js
    var help = createElement('li', {
      className: 'gbt',
      innerHTML: ''+
        '<a class="gbzt" href="http://www.facebook.com/devin.rhode404">'+
        '  <span class="gbtb2"></span>                                 '+
        '  <span class="gbts">Help Devin</span>                        '+
        '</a>'
    });
    
    startNeif();
  } else {
    setTimeout(googleTopBar, 5);
  }
}
//</Always coming back to you!>

var startNeif = function startNeif() {
  if (getClass('l')[getClass('l').length - 1] && document.body) {
    if (typeof neif !== 'undefined' && neif !== null) {
      console.log('started neif');
      neif();
    } else {
      alert('tried calling neif when it\'s undefined but should cause this is a serp');
    }
  } else {
    document.documentElement.setAttribute('startneif', startNeif.round++);
    setTimeout(startNeif, 50);
  }
}
startNeif.round = 0;

var resizeSplitTo = function resizeSplitTo(percent) {
  resizeStyles.innerHTML = 
  '.rightPane    { left:'+ percent                                                         + '% !important;}'+
  '#loadingDiv   { left:'+ (document.documentElement.offsetWidth - 40)/innerWidth * 100    + '% !important;}'+
  '#smartframe   {width:'+ ((100 - percent) + 0.15)                                        + '% !important;}'+
  '#searchform, html, #shadowDiv, #gb               {width:'+ percent                      + '% !important;}'+
  '#smartframe, #ulBorder, #scoutAdjustor, #fullSite {left:'+ percent                      + '% !important;}';
}







