'use strict';
var port = chrome.extension.connect({name: 'scripts'})

message = function message(data) {
  try {
    port.postMessage(update)
  } catch(e) {
    port = chrome.extension.connect({name: 'scripts'})
    try {
      port.postMessage(update)
    } catch (e) {
      console.log('FAILED TO RECONNECT:', e.stack)
    }
  }
}

//request latest settings and save to localStorage
message({'loadData':1})
var defaults = {
  on:'yes', 
  width: 22, 
}

/*  function get(setting) 
 *
 *    if (localStorage is false or undefined)
 *      getReturn = default[setting];
 *    else:
 *      getReturn = localStorage[setting];
 */

function get(setting, callback) {
  chrome.storage.sync.get('foo', callback)
}

function set(setting, value) {
  //console.log('setting ' + setting + ' to: ' + value);
  chrome.storage.sync.set({
    [setting.toString()]: value
  })
}

port.onMessage.addListener(function onMessage(msg) {
  if (msg.data) {
    var settings = msg.data.settings;
    for (var item in settings) {
      set(item, settings[item]);
    }
  } else if(msg.update) {
    updateBtn.show();
  } else {
    alert('unhandled BACKGROUND message: ' + JSON.stringify(msg));
  }
})