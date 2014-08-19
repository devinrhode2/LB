if (top.location.href === undefined &&
        location.href !== 'https://www.google.com/blank.html' &&
        location.href !== 'http://www.google.com/blank.html')
{
  (function subFrameAddScript() {
    var s = document.createElement('script');
    s.textContent = "(" +
    (function TheScoutAppFrameBandaidScript() {
    /*THIS FUNCTION CANNOT CONTAIN THE CHARACTERS "//" AT ALL ANYWHERE, it gets turned into a string,
    which gets rid of newlines, and then the // is interpreted as a comment ending the thread of execution.*/

        function isDomain(domain) {
          return location.href.indexOf(domain) > -1;
        }

        /* basically always spoof frames (self = top), except on some gplus iframes, where it causes errors*/
        if (! (isDomain(':/'+'/plus.google.com/') && isDomain('/u/0/_'))) {
          self = top;
          console.warn('set self to top on ' + location.href);
        }


        if (isDomain('://github.com')) {
          alert = function OverwrittenAlert(text) {
            console.error('Tried to alert: ' + text);
            console.log('  --Scout blocked alerts on this site. ');
            return false;
          };
          /*if not all of accounts.google.com, definitely https://accounts.google.com/o/openid2/auth
          just google.com causes an error on: https://www.google.com/webhp?sourceid=chrome-instant
          &ie=UTF-8&ion=1#hl=en&sugexp=cfis&gs_nf=1&tok=QompQjU3L5RqRZzZJSxGTQ&cp=12&gs_id=0
          &xhr=t&q=rotten+tomatoes&pf=p&output=search&sclient=psy-ab&oq=rotten+tomat&aq=0
          &aqi=g4&aql=f&gs_l=&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=e2ea4b53f91d9d2d&biw=1307&bih=689&ion=1*/
        } else if(isDomain('youtube.com') || isDomain('://accounts.google.com') || isDomain('://www.google.com/a/SelectSession') || isDomain('facebook.com')) {
          var ScoutDocumentWrite = document.write;
          document.write = function ScoutDocumentWriteOverwrite(string){
            if (string === '--><plaintext style=display:none><!--' || string === '--\><plaintext style=display:none><\!--' ||
                /go\sto\sfacebook\.com/ig.test(string) ) {
              return false;
            } else {
              ScoutDocumentWrite.apply(document, arguments);
            }
          };
        }

        /*special/protected actions*/
        if (window.name === 'smartframe' || window.name === 'data-group-key') {
          (function windowNameScope() {
            function ScoutMessageUp(step) {
              var data = JSON.stringify({step:step, url: location.href, title: document.title});
              console.log('Messaging up from ' + window.name + ': ' + window.location.href);
              window.top.postMessage(data, 'http://www.google.com');
              window.top.postMessage(data, 'https://www.google.com');
            }
            ScoutMessageUp('init');
            document.addEventListener('DOMContentLoaded', function ScoutDOMContentLoaded() {
              ScoutMessageUp('DOMContentLoaded');
            });
            window.addEventListener('load', function ScoutWindowOnLoad() {
              ScoutMessageUp('load');
            });

            /*prevent window.name === 'smartframe' from being changed!*/
            window.__defineSetter__('name', function nameSetter() {});
          }());
        }
    }).toString()+ ")();";
    document.documentElement.appendChild(s);
  })();
  //in background: `chrome.history.addUrl({url: location.href})` causes permission: Can access 'Your browsing history'
}