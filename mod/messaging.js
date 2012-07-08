var message, saveData, get, set;
(function messageJS(){
'use strict';
var port = chrome.extension.connect({name: 'scripts'});
function message(data) {
  try {
    port.postMessage(data);
  } catch(e) {console.log('CAUGHT ERROR:', e); }
}

function saveData(data) {
  var settings = data.settings;
  sites = data.sites;
  localStorage.setItem('sites', JSON.stringify(data.sites));
  
  for (item in settings) {
    set(item, settings[item]);
  }
}

//request latest settings and save to localStorage (or cookies on the page
message({'loadData':1});
var defaults = {
  on:'yes', 
  width: 22, 
};

function getCookie(key) {
  var i,x,y,ARRcookies = document.cookie.split(";");
  var done = 'false';
  for (i=0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x = x.replace(/^\s+|\s+$/g,"");
    if (x === key) {
      done = true;
      return unescape(y);
    }
  }
  return done;
}

/*  function get(setting) 
 *
 *    if (cookie is false or undefined) {
 *      then check..
 *      if (localStorage is false or undefined)
 *        getReturn = default[setting];
 *      else:
 *        getReturn = localStorage[setting];
 *    } else {
 *      getReturn = getCookie(setting)
 *    }
 */

function get(setting) {
  var getReturn = 'initial';
  
  //undefined check, cause cookies and w3schools code can do that to you.
  try { if (getCookie(setting) === 'undefined' || typeof getCookie(setting) === 'undefined' || getCookie(setting) === null) alert('getCookie is returning bad values ');}
  catch(e) { alert('getCookie threw an error: ' + e); }
  
  //Main logic
  var used;
  if (getCookie(setting) === 'false') {
    if (localStorage.getItem(setting) === 'undefined' || typeof localStorage.getItem(setting) === 'undefined' ||  localStorage.getItem(setting) === null) {
      used = 'DEFAULT';
      getReturn = defaults[setting];
    } else {
      used = 'LOCAL STORAGE';
      getReturn = localStorage.getItem(setting);
    }
  } else {
    used = 'COOKIE'
    getReturn = getCookie(setting);
  }
  //End main logic
  
  if (typeof getReturn === 'undefined' || getReturn === 'undefined') {
    console.log('used ' + used + ' for ' + setting + ', returning: ' + getReturn);
    alert(setting + ' is undefined!');
    return defaults[setting];
  } else {
    set(setting, getReturn); //unify data (between cookies, localStorage, and background localStorage)
    return getReturn;
  } 
}

function set(setting, value) {
  //console.log('setting ' + setting + ' to: ' + value);
  localStorage.setItem(setting, value);
  
  if (setting !== 'sites') {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365*1.5); //just in case I want Scout to beg my attention in a year and a half? why not..
    document.cookie = ''+setting+'='+value+';domain=google.com;expires=' + exdate.toUTCString();
  }
  
  var update = {};
  update.set = {};
  update.set[setting.toString()] = value;
  message(update);
}

port.onMessage.addListener(function(msg) {
  //console.log('onMessage');
  if (msg.data) {
    saveData(msg.data);
  } else if(msg.update) {
    updateBtn.show();
  } else {
    alert('unhandled BACKGROUND message: ' + JSON.stringify(msg));
  }
});
}());