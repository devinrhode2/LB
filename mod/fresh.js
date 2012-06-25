var firstEverLoad = true;
//htmlGroup runs when the <html> element is available.
var firstDomNodes = document.createDocumentFragment();
function htmlGroup() {
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
    var styleEl = document.createElement('style');
    styleEl.id = 'SearchPlusStyles';
    
    var newStyles = 
    'html, #searchform, #gb { max-width: 574px !important;min-width: 10% !important; width: '+width+'% !important;}'
    +'html { height: auto; border-bottom: none; border-top: none; }'
    +'body { z-index: 2; position: relative; }'
    +'html { overflow: hidden; height: 100%; }'
    +'body { height: 100%; }';
    styleEl.innerHTML = newStyles; //hardStyleText is the fruit of hardStyleText.js!
    firstDomNodes.appendChild(styleEl);
    
    
    ////////////////////
    //RESIZE STYLES NODE
    window.resizeStyles = document.createElement('style');
    resizeStyles.innerHTML = '';
    resizeStyles.id = 'resizeStyles';
    firstDomNodes.appendChild(resizeStyles);
    resizeSplitTo(width);
    
    
    ///////////////
    //SCOUT-CSS.CSS LINK
    var link = document.createElement('link');
    link.href = chrome.extension.getURL('css/SCOUT-CSS.css');
    link.rel = 'stylesheet';
    firstDomNodes.appendChild(link);

    
    
    ///////////////
    //SCROLLBAR CSS
/*
    var scrollbars = document.createElement('link');
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
    scrollbars.rel = 'stylesheet';
    firstDomNodes.appendChild(scrollbars);
*/
    
    
    var rightPaneBaseStyles = 'white-space: nowrap;position:fixed; right: 0px; z-index:111;';
    
    ////////
    //IFRAME
    window.iframe = document.createElement('iframe');
    iframe.id = 'smartframe';
    iframe.setAttribute('name', 'smartframe');
    iframe.onload = function() {
      if (firstEverLoad) {
        //Do nothing.
        firstEverLoad = false;
      } else {
        loading('done');
        
        //wrap errors and warnings
        console.groupEnd();
      }
    };
    iframe.onerror = function() {
      alert('iframe error!');
    };
    iframe.onmouseover = function(){
      this.focus();
    };
    iframe.className = 'rightPane';
    iframe.sandbox = 'allow-scripts allow-forms allow-same-origin';
    iframe.setAttribute(
      'style',
      rightPaneBaseStyles +
      '-webkit-user-select: none;top: 31px; height: 100%; width: '+(100 - width)+'%; background: white; border: none;'
    );
    firstDomNodes.appendChild(iframe);
    
    
    /////////
    //TOP BAR
    var topBar = document.createElement('div');
    topBar.id = 'topBar';
    topBar.className = 'rightPane topBarGradient';
    topBar.setAttribute(
      'style',
      rightPaneBaseStyles +
      '-webkit-user-select: none;padding-top: 4px; top: 0px; height: 27px;'+
      '-webkit-box-shadow: 2px 0px 5px 0px hsla(0, 0%, 29%, 0.6)'
    );

    //////////////////
    //updateTabDisplay
    window.updateTabDisplay = function updateTabDisplay(data) {
      fullSiteLink.href = data.url;
      favicon.parentNode.removeChild(favicon);
      window.favicon = null;
      favicon = $.createElement('link', {
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
    
    
    /////////////
    //--FULL SITE
    window.fullSiteLink = document.createElement('a');
    fullSiteLink.innerHTML = 'Open Full Site';
    fullSiteLink.className = 'bootstrappyGray';
    topBar.appendChild(fullSiteLink);
        
    /////////////////
    //--ON/OFF BUTTON
    window.onOffButton = document.createElement('a');
    onOffButton.innerHTML = 'Turn off Scout';
    onOffButton.onclick = function(){
      set('on', 'false');
      location.reload();
    };
    onOffButton.setAttribute('style', 'float: right;margin-right: 5px;');
    onOffButton.className = 'bootstrappyGray';
    topBar.appendChild(onOffButton);
    
    
    ///////////////////
    //--BETA GROUP LINK
    window.betaGroup = document.createElement('a');
    betaGroup.innerHTML = 'Check Beta Group';
    betaGroup.onclick = function betaGroupOnclick(){
      preview('https://www.facebook.com/groups/243105935781743/', 0);
    };
    betaGroup.setAttribute('style', 'color: #333 !important;');
    betaGroup.className = 'bootstrappyGray';
    topBar.appendChild(betaGroup);
    
    /*
    
    ///////////////////
    //--BETA GROUP LINK
    window.betaGroup = document.createElement('a');
    betaGroup.innerHTML = 'Check Beta Group';
    betaGroup.onclick = function betaGroupOnclick(){
      preview('https://www.facebook.com/groups/243105935781743/', 0);
    };
    betaGroup.setAttribute('style', 'color: #333 !important;');
    betaGroup.className = 'bootstrappyGray';
    topBar.appendChild(betaGroup);

background-color: white;
border: 1px solid #CCC;
-webkit-border-radius: 3px;
border-radius: 3px;
-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
-webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
*/
    
    //////////
    //--UPDATE
    window.updateBtn = document.createElement('a');
    updateBtn.innerText = 'Update Scout!';
    updateBtn.className = 'updateRed hidden';
    updateBtn.onclick = function updateBtnOnClick() {
      updateBtn.classList.add('hidden');
      location.href = 'http://thescoutapp.com/extension/scout.crx';
    };
    updateBtn.show = function updateBtnShow() {
      updateBtn.classList.remove('hidden');
    };
    
    topBar.appendChild(updateBtn);
    
/*
    //////
    //--AD
    window.ad = document.createElement('a');
    ad.innerText = '<advertise here>';
    ad.onclick = function(){
      alert('You are awesome! \n\nContact Devin at 218-290-8275, \nDevinRhode2@Gmail.com, \nFacebook.com/Devin.Rhode404, \n@DevinRhode2 on twitter, or \nLinkedIn.com/in/DevinRhode2 !')
    };
    ad.className = 'bootstrappyGray';
    topBar.appendChild(ad);
*/
    
    /////////
    //--SHARE
/*
    window.share = document.createElement('span');
    share.id = 'shareWrapper';
    share.setAttribute(
      'style',
      'border: 1px solid #929292; border-bottom-color: #B3B3B3;background-color: whiteSmoke;'
    );
    
    window.shareArea = document.createElement('textarea');
    shareArea.placeholder = 'Share...'; 
    share.appendChild(shareArea);
    topBar.appendChild(share);
*/
    
    
    
    firstDomNodes.appendChild(topBar);
    
    
    ///////////
    //COVER DIV - for adjustable sidebar
    //this cover div is needed so that you when you drag over the iframe mousemove still triggers.
    //Otherwise you can't drag back to the right.
    window.coverDiv = document.createElement('div');
    coverDiv.id = 'coverDiv';
    coverDiv.setAttribute(
      'style', 
      'position: fixed; width: 100%; height: 100%; z-index: -10; background: transparent; top: 0px; left:0px;'
    );
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
    var adjustor = document.createElement('div');
    adjustor.id = 'scoutAdjustor';
    adjustor.className = 'rightPane';
    adjustor.setAttribute(
      'style', 
      'position:fixed; display: block; top: 30px; left: '+width+'%; height: 100%; width: 5px; background: transparent; border: none; z-index: 9999999999999; cursor: col-resize;'
    );
    adjustor.onmousedown = function(){
      console.log('mousedown');
      dragging();
    };
    
    //not sure how necessary this
    adjustor.oncontextmenu = function(e){
      onmouseup(e);
    };
    
    //or this are
    adjustor.ondrag = function(){
      console.log('dragging');
    };
    firstDomNodes.appendChild(adjustor);
    
    
    /////////
    //FAVICON
    window.favicon = document.createElement('link');
    favicon.href = 'http://thescoutapp.com/static/img/favicon3.png';
    favicon.id = 'scoutFavicon';
    favicon.rel = 'shortcut icon';
    firstDomNodes.appendChild(favicon);
    
    
    ///////
    //TITLE append, prevents flash of 'query - Google Search' or 'http://crap'
    var title = document.createElement('title');
    title.innerText = ' ';
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
function newTitle(currentTitle) {
  if (currentTitle.has('- Google Search')) {
    document.title = currentTitle.replace('- Google Search', '');
  }
  if (document.title.indexOf(titlePrefix) !== 0) {
    document.title = titlePrefix + document.title;
  }
}
window.titlePrefix = 'Ⓢ '; //oo - 𝑺𝘤 |  - small: \u24E2 ⓢ large: \u24C8 Ⓢ - 𝑺` - 𝕊 - 
function titleEl(skipBody) {
  //looking to the second that Google produces, not the one I insert
  if (byTag('title')[1]) {
    var secondTitleText = byTag('title')[1].innerText;
    if (titleEl.initialCall && secondTitleText.indexOf('Google Search') > -1) {
      newTitle(secondTitleText);
      titleEl.initialCall = false;
    }
    newTitle(document.title);
    byTag('title')[0].addEventListener("DOMSubtreeModified", function(evt) {
      titleEl(true); //true, skipBody
    }, false);
    
    if (!skipBody) body(); //only get's called once.
    
  } else {
    setTimeout(titleEl, 5);
  }
}

var secondDomNodes = document.createDocumentFragment();
function body() {
  if (document.body && document.documentElement.offsetWidth > 0 && byTag('html')[0]) {
    
    //visible elements
        
        
    ////////////
    //SHADOW DIV (on edge of sidebar)
    var shadowDiv = document.createElement('div');
    shadowDiv.id = 'shadowDiv';
    SideBarShadowBaseStyles = 'position:fixed; display: block; left: 0px; height: 128%; width: '+width+'%; background: transparent; border: none; z-index: 113;pointer-events: none;';
    shadowDiv.setAttribute(
      'style', 
      SideBarShadowBaseStyles + 
      '-webkit-box-shadow: 1px 9px 5px 0px rgba(128, 128, 128, 0.6); top: 23px;'
    );
    secondDomNodes.appendChild(shadowDiv);
    
    
    //////////////
    //BORDER-RIGHT 1px gray border for right of sidebar, left of the shadow. Looks cleaner.
    window.border = document.createElement('div');
    border.setAttribute('style', 'position: fixed;top: 31px;left: '+width+'%;height: 100%;width: 1px;z-index: 9;border-left: 1px solid rgba(128, 128, 128, 0.6); z-index:114;');
    border.id = 'ulBorder';
    border.className = 'rightPane';
    secondDomNodes.appendChild(border);
    
            
    /////////////
    //LOADING DIV The loading notification. loading() in preview.js fades this in and out.
    var pos = (byTag('html')[0].offsetWidth - 40)/innerWidth * 100;
    window.loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingDiv';
    loadingDiv.setAttribute('style', '-webkit-user-select: none;position: absolute; width: 83px; height: 30px; background: whitesmoke; border: solid 1.5px #92C8F6; -webkit-border-radius: 4px; -webkit-box-shadow: 0 0px 7px gray; top: 68px;left: ' + pos + '%;z-index: 999999;text-align: center; font-size: 14px; display: none; -webkit-transition: opacity 0.4s; opacity: 0; ');
    
    var loadingText = document.createElement('div');
    loadingText.id = 'loadingText';
    loadingText.style.marginTop = '6px';
    loadingText.innerHTML = 'Loading...';
    loadingDiv.appendChild(loadingText);
    
    secondDomNodes.appendChild(loadingDiv);
    
    
    /////////
    //<STYLE>sidebar and right pane heights
    window.paneHeights = document.createElement('style');
    paneHeights.innerText = 'html>body{height: '+
      (window.innerHeight - getComputedStyle(document.body)['margin-top'])+
    'px !important';
    paneHeights.id = 'paneHeights';
    secondDomNodes.appendChild(paneHeights);
    
    document.documentElement.appendChild(secondDomNodes);
    
    resizeSplitTo(window.width);
    
    googleTopBar();
  } else {
    //console.log('body retry');
    setTimeout(body, 5);
  }
}

//<Always coming back to you!>
function googleTopBar() {
  if (true) {//REFERENCE domMods.js
    var help = d.createElement('li');
    help.class = 'gbt';
    help.innerHTML = ''+
      '<a class="gbzt" href="http://www.facebook.com/devin.rhode404">'+
      '  <span class="gbtb2"></span>                                 '+
      '  <span class="gbts">Help Devin</span>                        '+
      '</a>';
    
    
    startNeif();
  } else {
    setTimeout(googleTopBar, 5);
  }
}
//</Always coming back to you!>

function startNeif() {
  if (byClass('l')[byClass('l').length - 1] && document.body) {
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

function resizeSplitTo(percent) {
  resizeStyles.innerHTML = 
  '.rightPane    { left:'+ percent                                                         + '% !important;}'+
  '#loadingDiv   { left:'+ (document.documentElement.offsetWidth - 40)/innerWidth * 100    + '% !important;}'+
  '#smartframe   {width:'+ ((100 - percent) + 0.15)                                        + '% !important;}'+
  '#searchform, html, #shadowDiv, #gb               {width:'+ percent                      + '% !important;}'+
  '#smartframe, #ulBorder, #scoutAdjustor, #fullSite {left:'+ percent                      + '% !important;}';
}







