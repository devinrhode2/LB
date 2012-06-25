console.log('Scout started');

if (localStorage.getItem('installed') !== 'installed') {
  localStorage.setItem('installed', 'installed');
  chrome.tabs.create({
    'url': chrome.extension.getURL('welcome/index.html')
  });
  POST('http://thescoutapp.com/smartframes/post.php', 'install=occured', function(){});
}

var defaults = function defaults(defaults) {
  for (var item in defaults) {
    if (localStorage.getItem(item) === null) {
      localStorage.setItem(item, defaults[item]);
    }
  }
}

var set = function set(setting, value) {
  if (localStorage.getItem(setting) !== value.toString()) {
    if (setting !== 'sites') {
      set.message = 'localStorage['+setting+'] changed from: ' + localStorage.getItem(setting);
    }
    localStorage.setItem(setting, value);
    if (setting !== 'sites') {
      set.message += ' to: ' + localStorage.getItem(setting);
    }
    console.log(set.message);
  }
}

defaults({width:22, on: 'yes'}); //only write if they are undefined. 

var name = '';
chrome.webRequest.onHeadersReceived.addListener(
  function onHeadersReceivedListener(resp){
    resp.responseHeaders.forEach(function(header,index){
      if(header.name.toLowerCase() === 'x-frame-options')
        resp.responseHeaders.splice(index,1);
      if(header.name.toLowerCase() === 'access-control-allow-origin')
        resp.responseHeaders[index].value='*';
      if(header.name.toLowerCase() === 'x-framework-css-blocks')
        console.log(resp.responseHeaders[index].value)
      }
    );
    resp.responseHeaders[resp.responseHeaders.length] = {
      'name':'Access-Control-Allow-Origin',
      'value':'*'
    };
    return {responseHeaders:resp.responseHeaders}
  }, /*end onHeadersRecievedListener*/
  {
    urls: ['<all_urls>'],
    types:['sub_frame']
  },
  ['blocking','responseHeaders']
);

var sendData = function sendData(port) {
  var settings = {};
  for (var item in localStorage) {
    settings[item] = localStorage.getItem(item);
  }
  if (typeof sites === 'undefined') {
    sites = JSON.parse(localStorage.getItem('sites'));
  }
  port.postMessage({data: {settings: settings, sites: sites}});
}

chrome.extension.onConnect.addListener(function(port) {
  if (port.name === 'scripts') {
    
    //version check:
    GETXml('http://thescoutapp.com/extension/update.xml?cachebust=' + Math.random() * 10000000000000000, function(xml){
      var remote = parseFloat(xml.getElementsByTagName('updatecheck')[0].getAttribute('version'));
      GET('../manifest.json?cachebust=' + Math.random() * 10000000000000000, function(json){
        var local = parseFloat(JSON.parse(json).version);
        if (remote > local) {
          port.postMessage({update:'son'});
        } else {
          console.log('up to date');
        }
      });
    });
    
    //used today
    var lastUsage = localStorage.getItem('lastUsage');
    var today = new Date().getUTCDate().toString();
    if (lastUsage !== today) {
      gaEvent('used today');
      localStorage.setItem('lastUsage', today);
    }
    
    //port handler
    port.onMessage.addListener(function(msg) {
      if (msg.loadData) {
        sendData(port);
      } else if(msg.set) {
        for(key in msg.set) {
          set(key, msg.set[key]);
        }
      } else if(msg.gaEvent) {
        gaEvent(msg.gaEvent);
      } else {
        alert('unhandled message to background.html: ' + JSON.stringify(msg));
      }
    });
  } else {
    alert('unknown attempt to connect. port.name must equal \'scripts\' ');
  }
});



