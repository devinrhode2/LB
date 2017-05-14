console.log('Scout started')

// if (NOT_INSTALLED) {
//   SET_INSTALLED_TRUE
//   chrome.tabs.create({
//     'url': chrome.extension.getURL('welcome/index.html')
//   });
//   //POST('http://thescoutapp.com/smartframes/post.php', 'install=occured', function emptyPostCallbackForInstallOccured(){});
// }

// var defaults = {width:22, on: 'yes'}; //only write if they are undefined. 
// for (var item in defaults) {
//   if (defaults.hasOwnProperty(item)) {
//     if (CHROME_STORAGE.getItem(item) is null?) {
//       CHROME_STORAGE.setItem(item, defaults[item]);
//     }
//   }
// }

// function set(setting, value) {
//   // first get setting to see if it has changed
//   chrome.storage.local.get(setting, function(settingValue) {
//     //only set if setting is actually different
//     if (settingValue.toString() !== value.toString()) {
//       // if (setting !== 'sites') {
//       //   set.lastActionNote = 'chrome.storage.local setting:'+setting+' changed from: ' + settingValue + ' to:'+value.toString();
//       // }
//       const newSettings = {}
//       newSettings[setting] = value
//       chrome.storage.local.set(newSettings)
//     }
//   })
// }

// chrome.browserAction.onClicked.addListener(function(tab) {
//   //turn off or turn on for site actively being viewed, then reload tab
//   console.log('browser action clicked... tab:', tab);
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     if (!tabs || !tabs[0]) {return }
//     const activeTab = tabs[0];

//     chrome.storage.local.get('all_active_sites', function (all_active_sites) {
//       if (all_active_sites['reddit.com'] === 'true') {
//         //turn off
//       } else {
//         //turn on
//       }
//     })
//   })
// })

//Allow iframes to load from any site, remove x-frame-options restrictions
chrome.webRequest.onHeadersReceived.addListener(
  function (resp) {

    //ONLY IF response is for site which scout is active on
    resp.responseHeaders.forEach(function(header, index) {
      header = header.name.toLowerCase()

             if (header === 'x-frame-options') {
        resp.responseHeaders.splice(index,1)
      } else if (header === 'access-control-allow-origin') {
        resp.responseHeaders[index].value = '*'
      } else if (header === 'x-framework-css-blocks') {
        console.log(resp.responseHeaders[index].value)
      }

    })
    resp.responseHeaders[resp.responseHeaders.length] = {
      'name': 'Access-Control-Allow-Origin',
      'value': '*'
    }
    //WHY RETURN NEW OBJECT VS resp??
    return {responseHeaders:resp.responseHeaders}
  }, //end onHeadersRecievedListener
  {
    urls: ['<all_urls>'],
    types:['sub_frame']
  },
  ['blocking','responseHeaders']
)

/*
Desktop:
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4)            AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36

Mobile:
Mozilla/5.0 (Linux; Android 4.4.4; SGH-M919 Build/KTU84Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.135 Mobile Safari/537.36
*/

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (req) {
    console.log('onBeforeSendHeaders', req)
    var parser = document.createElement('a')
    parser.href = req.url
    //if (parser.host === 'www.reddit.com') {
      req.requestHeaders.forEach(function(header, index){
        console.log(header.name, header.value)
        if (header.name === 'User-Agent') {
          if (header.value.indexOf('Mobile Safari') === -1) {
            req.requestHeaders[index].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D201'
            console.log('fixed?', req.requestHeaders[index].value)
          }
        }
      })
    //}
    return {requestHeaders: req.requestHeaders}
  },
  {
    urls: ['<all_urls>'],
    types:['main_frame']
  },
  ['blocking', 'requestHeaders']
)


// function sendData(port) {
//   var settings = {};
//   for (var item in localStorage) {
//     settings[item] = localStorage.getItem(item);
//   }
//   if (typeof sites === 'undefined') {
//     sites = JSON.parse(localStorage.getItem('sites'));
//   }
//   port.postMessage({data: {settings: settings, sites: sites}});
// }

// chrome.extension.onConnect.addListener(function onConnectListener(port) {
//   if (port.name === 'scripts') {
    
//     //version check:
//     GET('http://thescoutapp.com/extension/update.xml?cachebust=' + Math.random() * 10000000000000000, function ScoutUpdateCheckCallback(resp, xhr){
//       var xml = xhr.responseXML;
//       var remote = parseFloat(xml.getElementsByTagName('updatecheck')[0].getAttribute('version'));
//       (function getManifestScope(json) {
//         var local = parseFloat(JSON.parse(json).version);
//         if (remote > local) {
//           port.postMessage({update:'son'});
//         } else {
//           console.log('up to date');
//         }
//       })(chrome.runtime.getManifest());
//     });
    
//     //used today
//     var lastUsage = localStorage.getItem('lastUsage');
//     var today = new Date().getUTCDate().toString();
//     if (lastUsage !== today) {
//       trackEvent('used today');
//       localStorage.setItem('lastUsage', today);
//     }
    
//     //port handler
//     port.onMessage.addListener(function ScoutOnmessageListener(msg) {
//       if (msg.loadData) {
//         sendData(port);
//       } else if(msg.set) {
//         for(key in msg.set) {
//           set(key, msg.set[key]);
//         }
//       } else if(msg.trackEvent) {
//         trackEvent(msg.trackEvent);
//       } else {
//         alert('unhandled message to background.html: ' + JSON.stringify(msg));
//       }
//     });
//   } else {
//     alert('unknown attempt to connect. port.name must equal \'scripts\' ');
//   }
// });

