console.log('Scout started');

if (localStorage.getItem('installed') !== 'installed') {
  localStorage.setItem('installed', 'installed');
  chrome.tabs.create({
    'url': chrome.extension.getURL('welcome/index.html')
  });
  POST('http://thescoutapp.com/smartframes/post.php', 'install=occured', function emptyPostCallbackForInstallOccured(){});
}

function defaults(defaults) {
  for (var item in defaults) {
    if (defaults.hasOwnProperty(item)) {
      if (localStorage.getItem(item) === null) {
        localStorage.setItem(item, defaults[item]);
      }
    }
  }
}

function set(setting, value) {
  //Use chrome.storage api instead
  // if setting has changed
  if (localStorage.getItem(setting).toString() !== value.toString()) {
    if (setting !== 'sites') {
      set.lastActionNote = 'localStorage['+setting+'] changed from: ' + localStorage.getItem(setting);
    }
    localStorage.setItem(setting, value);
  }
}

defaults({width:22, on: 'yes'}); //only write if they are undefined. 

chrome.webRequest.onHeadersReceived.addListener(
  function onHeadersReceivedListener(resp) {
    resp.responseHeaders.forEach(function forEachResponseHeader(header, index) {
      header = header.name.toLowerCase();
      if (header === 'x-frame-options')
        resp.responseHeaders.splice(index,1);
      if (header === 'access-control-allow-origin')
        resp.responseHeaders[index].value='*';
      if (header === 'x-framework-css-blocks')
        console.log(resp.responseHeaders[index].value)
      }
    );
    resp.responseHeaders[resp.responseHeaders.length] = {
      'name':'Access-Control-Allow-Origin',
      'value':'*'
    };
    //WHY RETURN NEW OBJECT VS resp??
    return {responseHeaders:resp.responseHeaders}
  }, //end onHeadersRecievedListener
  {
    urls: ['<all_urls>'],
    types:['sub_frame']
  },
  ['blocking','responseHeaders']
);

chrome.declarativeWebRequest.onRequest.addRules([{
  //for this stupid little google plus notifications iframe on google search.. block it. (it's not visible anyway)
  conditions: [
    new chrome.declarativeWebRequest.RequestMatcher({
      resourceType: ['sub_frame'],
      url: {
        urlContains: 'https://plus.google.com/u/0/_/notifications/frame?sourceid=1&hl=en&origin=https%3A%2F%2Fwww.google.com',
      },
      stages: ['onBeforeRequest']
    })
  ],
  actions: [
    new chrome.declarativeWebRequest.RedirectToEmptyDocument() //could also .CancelRequest(), but a GET error and strange chrome page load in place of it..
  ]
}/*,{
  conditions:[
    new chrome.declarativeWebRequest.RequestMatcher({
      resourceType: ['sub_frame']
    })
  ],
  actions: [
    new chrome.declarativeWebRequest.RemoveResponseHeader('x-frame-options')
  ]
}
*/
]);


function sendData(port) {
  var settings = {};
  for (var item in localStorage) {
    settings[item] = localStorage.getItem(item);
  }
  if (typeof sites === 'undefined') {
    sites = JSON.parse(localStorage.getItem('sites'));
  }
  port.postMessage({data: {settings: settings, sites: sites}});
}

chrome.extension.onConnect.addListener(function onConnectListener(port) {
  if (port.name === 'scripts') {
    
    //version check:
    GET('http://thescoutapp.com/extension/update.xml?cachebust=' + Math.random() * 10000000000000000, function ScoutUpdateCheckCallback(resp, xhr){
      var xml = xhr.responseXML;
      var remote = parseFloat(xml.getElementsByTagName('updatecheck')[0].getAttribute('version'));
      (function getManifestScope(json) {
        var local = parseFloat(JSON.parse(json).version);
        if (remote > local) {
          port.postMessage({update:'son'});
        } else {
          console.log('up to date');
        }
      })(chrome.runtime.getManifest());
    });
    
    //used today
    var lastUsage = localStorage.getItem('lastUsage');
    var today = new Date().getUTCDate().toString();
    if (lastUsage !== today) {
      trackEvent('used today');
      localStorage.setItem('lastUsage', today);
    }
    
    //port handler
    port.onMessage.addListener(function ScoutOnmessageListener(msg) {
      if (msg.loadData) {
        sendData(port);
      } else if(msg.set) {
        for(key in msg.set) {
          set(key, msg.set[key]);
        }
      } else if(msg.trackEvent) {
        trackEvent(msg.trackEvent);
      } else {
        alert('unhandled message to background.html: ' + JSON.stringify(msg));
      }
    });
  } else {
    alert('unknown attempt to connect. port.name must equal \'scripts\' ');
  }
});

