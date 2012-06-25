
//GOOGLE ANALYTICS!
window.initGa = function initGa(UA, nickname) {
    document.documentElement.setAttribute('scout-ga-initialized', 'yes, request sent');
    window._gaq = [['_setAccount', UA]];
    if (chrome.browserAction) {//chrome.browserAction means we're not a content script, because content scripts arent' given this api
      (function(d,t){
        var g = d.createElement(t);
        g.id = 'initGa_for_' + nickname + ' (' + UA + ')';
        g.src = 'https://ssl.google-analytics.com/ga.js';
        document.documentElement.appendChild(g)
      }(document,'script'));
    } else {
      alert('analytics.js is not intended for use in content scripts. use cs_analytics.js and gaEvent(someEventIdString)');
    }
}

//initGa('UA-31868209-1', 'NOTHA TEST');
//initGa('UA-31828297-1', 'testing UA');
initGa('UA-31831223-1', 'beta UA');

//USAGE: gaEvent('SOME DANK SHITZ HAPPENZ');
window.gaEvent = function gaEvent(event_name){
  event_name = event_name.replace(/\s/gi, '_');
  window._gaq.push(['_trackPageview', event_name]);
};