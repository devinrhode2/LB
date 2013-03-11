var runInPage;
(function subFrameJs(){
'use strict';
runInPage = function runInPage() {
  var script = document.createElement('script');
  script.innerHTML = '';
  for (var task in arguments) {
    if (typeof arguments[task] === 'string') {
      script.innerHTML += arguments[task];
    } else if (typeof arguments[task] === 'function') {
      script.innerHTML += '(' + arguments[task] + '())';
    }
  }
  try {
    document.documentElement.appendChild(script);
  } catch (e) {
    console.error('CAUGHT ERROR: ', e, 'on:', script.innerHTML);
  }
};


if (!window.top &&
    window.location.href !== 'https://www.google.com/blank.html' &&
    window.location.href !== 'http://www.google.com/blank.html') {
    
  var TheScoutAppFrameBandaidScript = function TheScoutAppFrameBandaidScript() {
      
      function AlertOverwrite() {
        if (typeof window.ScoutNativeAlert === 'undefined') {                               
          window.ScoutNativeAlert = alert;                                                  
        } else {                                                                            
          alert('window.ScoutNativeAlert is already defined! Check console.');              
          console.log('**ScoutNativeAlert is already defined as:', window.ScoutNativeAlert);
        }                                                                                   
        alert = function OverwrittenAlert(text){                                            
          console.error('Tried to alert: ' + text);                                         
          console.log('  --Scout blocked alerts on this site. '+                            
          'Use ScoutNativeAlert if you need to use alert() inside scout on your site');     
          return false;                                                                     
        };
      }
      
      /**
       * forTheseDomains(['one.com', 'two.com'], function CallThisFunction(){
       *   
       * });
       */
      var forTheseDomains = function forTheseDomains(arrayDomains, action){
        arrayDomains.forEach(function arrayDomains_forEach(domain){
          if (window.location.href.indexOf(domain + '/') > -1) {
            action();
          } else if(window.location.href.indexOf(domain) > -1) {
            action();
          }
        })
      };
      
      //always do this
      window.self = window.top;
      forTheseDomains(['pinterest.com'], function(){
        window.self = window.top;
      });
      
      forTheseDomains(
        ['stackoverflow.com',
         'serverfault.com',
         'superuser.com',
         'askubuntu.com',
         'stackapps.com',
         'answer.onstartups.com',
         'stackexchange.com',
         'twitter.com'
        ], /*do this:*/ function(){
          console.error('OVERWRITTEN: ' + location.hostname);
          window.self = window.top;
          AlertOverwrite();
        }
      );
      
      forTheseDomains(['github.com'], function(){
        AlertOverwrite();
      });
      
      /*if not all of accounts.google.com, definitely https://accounts.google.com/o/openid2/auth
      just google.com causes an error on: https://www.google.com/webhp?sourceid=chrome-instant&ie=UTF-8&ion=1#hl=en&sugexp=cfis&gs_nf=1&tok=QompQjU3L5RqRZzZJSxGTQ&cp=12&gs_id=0&xhr=t&q=rotten+tomatoes&pf=p&output=search&sclient=psy-ab&oq=rotten+tomat&aq=0&aqi=g4&aql=f&gs_l=&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=e2ea4b53f91d9d2d&biw=1307&bih=689&ion=1*/
      forTheseDomains(['youtube.com', '://accounts.google.com', '://www.google.com/a/SelectSession'], function(){
        window.parent = this;
        window.ScoutDocumentWrite = document.write;
        document.write = function ScoutDocumentWriteOverwrite(string){
          if (string === '--><plaintext style=display:none><!--' || string === '--\><plaintext style=display:none><\!--') {
            return false;
          } else {
            window.ScoutDocumentWrite(string);
          }
        };
        window.ScoutDocumentWrite = window.document.write;
        window.document.write = function ScoutDocumentWriteOverwrite(string){
          if (string === '--><plaintext style=display:none><!--' || string === '--\><plaintext style=display:none><\!--') {
            return false;
          } else {
            window.ScoutDocumentWrite(string);
          }
        };
      });
      
      forTheseDomains(['facebook.com'], function(){
        window.ScoutDocumentWrite = document.write;
        window.document.write = function(string){
          if (/go\sto\sfacebook\.com/ig.test(string)) {
            return false;
          } else {
            window.ScoutDocumentWrite(string);
          }
        };
      });
      
      
      //special/protected actions
      if (window.name === 'smartframe' || window.name === 'data-group-key' || window.name === 'ytsmartframe') {
          console.log('sub_frame.js injected in: ' + location.href);
          window.addEventListener('click', function ScoutWindowOnClick(e){
            /*if safe*/
            if (e && e.target) {
              if ('_top' === e.target.target) {
                //then open in this frame
                //e.target.target = '_self';
                
              } else if('_blank' === e.target.target) {
                //then do window.open to new tab
                //window.open(e.target.href); //being lazy.
                
              } else if('_self' === e.target.target) {
                /*DO NOTHING*/
                
              } else if(/*name*/e.target.target && e.target.target.length > 0) {
                //window.open(e.target.href); //being lazy.
              }
              e.target.target = '_self';
            } else {
              alert('WHAT! e or e.target are falsy, see console.');
              console.log('e and e.target:', e, e.target);
            }
          }, false);
          
          if (window.name === 'smartframe' || window.name === 'data-group-key') {  
            var ScoutMessageUp = function ScoutMessageUp(step){
              var data = {};
              data.step = step;
              data.url = window.location.href;
              data.title = document.title;
              data = JSON.stringify(data);
              console.log('Messaging up from ' + window.name + ': ' + window.location.href);
              window.top.postMessage(data, 'http://www.google.com');
              window.top.postMessage(data, 'https://www.google.com');
            };
            ScoutMessageUp('init');
            document.addEventListener( "DOMContentLoaded", function ScoutDOMContentLoaded(){
              ScoutMessageUp('DOMContentLoaded');
            }, false );
            window.addEventListener( "load", function ScoutWindowOnLoad(){
              ScoutMessageUp('load');
            }, false );
          } else if (window.name === 'ytsmartframe') {
            
          } else {
            alert('you goof shit devin!');
          }
          
          /*prevent window.name === 'smartframe' from being changed!*/
          window.__defineSetter__("name", function() {});
      }
  };//end TheScoutAppFrameBandaidScript definition
  
  runInPage('window.TheScoutAppFrameBandaidScript = ' + TheScoutAppFrameBandaidScript.toString() + ';');
  runInPage('TheScoutAppFrameBandaidScript();');
  
  //in background: chrome.history.addUrl({url: location.href});//causes permission: Can access 'Your browsing history'
}
})();