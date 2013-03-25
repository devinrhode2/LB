var timeout = 24;
var links = document.getElementsByClassName('l');
(function REWRITEJS() {

  (function appendStylesheet(stylesheet) {
    stylesheet.rel = 'stylesheet';
    stylesheet.href = chrome.extension.getURL('css/REWRITE.css');
  
    //append immediately to avoid twitch from normal google to the scout version
    document.documentElement.appendChild(stylesheet);
  })( document.createElement('link') );

/*
  window.addEventListener('load', function ScoutOnLoad() {
    setTimeout(function afterLoadLag() {
      console.time('scroll');
      eval("document.getElementById('main').style.setProperty('top', '81px', 'important');");
      console.timeEnd('scroll');
      console.time('scroll2');
      window.scrollTo(0, 81);
      console.timeEnd('scroll2');
    }, 1600);
  })
*/

  //faster than polling for document.body https://gist.github.com/anonymous/5219254
  document.addEventListener('DOMContentLoaded', function ScoutDOMContentLoaded() {
  //document.getElementById('main').style.setProperty('top', '0', 'important');

    //preview(links[0].href)
    //links[0].classList.add('scoutOpenedResult');
  
    /*
    handler on #rso or something
      if e.target is a link, with an href, load that in the iframe
      elseif the e.target does not have an href.. then navigate to the first <a> in the <li>.. or the 'closest' <a>..
    */
    
    //chrome.storage.local
    
    /*adjustor
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
  
  
  }, false);
  
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
  //curl "https://www.facebook.com/ajax/updatestatus.php" -H "Cookie: datr=n7pFUfzLd1sdfVyCE-8ciwnu; lu=gAJVZe902ezxqQyXXZOu1Xxg; c_user=100000381323084; csm=2; fr=0regFdmt87qGTd1Dv.AWUTOIMdWc_Ap1eICkBAj4t65mY.BRRbqs.q8.AWVWk-od; s=Aa4M1zndX02KGfWc; xs=3%3AEggPEQgMLGAgrw%3A2%3A1363524268; hz_amChecked=1; locale=en_US; sub=294925; p=13; presence=EM363714343EuserFA21B00381323084A2EstateFDsb2F1363641736500Et2F_5b_5dElm2FnullEuct2F1363641736500EtrFA2loadA2EtwF3078895989EatF1363714341984G363714343486CEchFDp_5f1B00381323084F288CC; wd=1440x384; act=1363714384116%2F18%3A2; _e_00FC_11=%5B%2200FC%22%2C1363714384117%2C%22act%22%2C1363714384116%2C18%2C%22https%3A%2F%2Fwww.facebook.com%2Fajax%2Fupdatestatus.php%22%2C%22f%22%2C%22submit%22%2C%22timeline_recent%22%2C%22r%22%2C%22%2Fdevin.rhode404%22%2C%7B%22ft%22%3A%7B%7D%2C%22gt%22%3A%7B%22profile_owner%22%3A%22100000381323084%22%2C%22ref%22%3A%22timeline%3Atimeline%22%7D%7D%2C0%2C0%2C0%2C0%2C16%5D; x-src=%2Fajax%2Fupdatestatus.php%7Ctimeline_composer" -H "Origin: https://www.facebook.com" -H "Accept-Encoding: gzip,deflate,sdch" -H "Host: www.facebook.com" -H "Accept-Language: en-US,en;q=0.8" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.33 (KHTML, like Gecko) Chrome/27.0.1438.7 Safari/537.33" -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: */*" -H "X-SVN-Rev: 760071" -H "Referer: https://www.facebook.com/devin.rhode404" -H "Connection: keep-alive" -H "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3" --data "fb_dtsg=AQBTvtvX&xhpc_context=profile&xhpc_ismeta=1&xhpc_fbx=1&xhpc_timeline=1&xhpc_composerid=u_jsonp_3_24&xhpc_targetid=100000381323084&xhpc_message_text=bb&xhpc_message=bb&backdated_date[year]=&backdated_date[month]=&backdated_date[day]=&backdated_date[hour]=&backdated_date[minute]=&is_explicit_place=&composertags_place=&composertags_place_name=&composer_session_id=1363714358&composertags_city=&disable_location_sharing=false&composer_predicted_city=&audience[0][value]=10&nctr[_mod]=pagelet_timeline_recent&__user=100000381323084&__a=1&__dyn=798aD5z5CF-&__req=k&phstamp=16581668411811611888568"
  
  
  /*
  function attemptForceTab() {
    var Podium = {};
    Podium.keyEvent = function(eventName, k) {
      var oEvent = document.createEvent('KeyboardEvent');
    
      // Chromium Hack
      Object.defineProperty(oEvent, 'keyCode', {
                  get : function() {
                      return this.keyCodeVal;
                  }
      });     
      Object.defineProperty(oEvent, 'which', {
                  get : function() {
                      return this.keyCodeVal;
                  }
      });     
    
      if (oEvent.initKeyboardEvent) {
          oEvent.initKeyboardEvent(eventName, true, true, document.defaultView, false, false, false, false, k, k);
      } else {
          oEvent.initKeyEvent(eventName, true, true, document.defaultView, false, false, false, false, k, 0);
      }
    
      oEvent.keyCodeVal = k;
    
      if (oEvent.keyCode !== k) {
          alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
      }
    
      document.dispatchEvent(oEvent);
    };
  
    Podium.keyEvent('keydown', 9);
  
    setTimeout(function() {
      Podium.keyEvent('keyup', 9);
      console.log('ran key events');
    }, 120);
  }
  var s = document.createElement('script');
  s.innerHTML = "(" + attemptForceTab.toString() + ')();';
  window.addEventListener('load', function(){
    setTimeout(function(){
      attemptForceTab();
    }, 500);
  });
  */

})();