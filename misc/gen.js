window.doc = document;
function byClass(item) {
  return document.getElementsByClassName(item);
}

function byId(item) {
  return document.getElementById(item);
}

function byTag(item) {
  return document.getElementsByTagName(item);
}

window.d = document;

d.id = byId;
d.class = byClass;
d.tag = byTag;
d.name = function (name) {
  return d.getElementsByName(name);
}

ajax = {};
ajax.x = function() {
  return new XMLHttpRequest;
};
ajax.send = function(u, f, m, a) {
  var x = ajax.x();
  x.open(m, u, true);
  x.onreadystatechange = function() {
    if(x.readyState == 4) {
      f(x.responseText)
    }
  };
  if(m === "POST") {
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  }
  x.send(a)
};
var POST = function POST(url, func, args) {
  ajax.send(url, func, "POST", args);
};

var GET = function GET(url, callback){
  ajax.send(url,callback,'GET');
};

var GETXml = function GETXml(u, f){
  var x = new XMLHttpRequest();
  x.open('GET', u, true);
  x.onreadystatechange = function() {
    if(x.readyState == 4) {
      f(x.responseXML);
    }
  };
  x.send()
};

/**
 * guardedParse - protected JSON.parse
 */
JSON.guardedParse = function guardedParse(string) {
  var returnValue = {};
  try {
    if (string.indexOf('{') === 0 && string.charAt(string.length - 1) === '}') {
      returnValue = JSON.parse(string);
    } else {
      returnValue = false;
    }
  } catch(e) {
    returnValue = false;
  }
  return returnValue;
};

/**
 * has: Does a string have a certain substring inside it?
 * Example:
 * if ('http://google.com'.has('https://')) {
 *   console.log('This is a secure page!');
 * }
 */
String.prototype.has = function StringPrototypeHas(string) {
  return this.indexOf(string) > -1;
};


