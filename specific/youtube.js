var prefs = [];
document.cookie.split('; ').forEach(function(cookie){
  if (cookie.indexOf('PREF=') === 0) {
    prefs[prefs.length] = cookie.substring(cookie.indexOf('=') + 1, cookie.length);;
  }
});

var processPref = function processPref(PREF){
  var fPrefKeys = {};
  if (PREF) {
    PREF.split('&').forEach(function(pair){
      fPrefKeys[pair.split('=')[0]] = pair.split('=')[1]
    });
  }
  fPrefKeys['f2'] = '40000000';
  
  var newPREF = '';
  var iter = -1;
  var totalLength = Object.keys(fPrefKeys).length;
  for (fpair in fPrefKeys) {
    iter++;
    newPREF += fpair + '=' + fPrefKeys[fpair];
    if (iter !== totalLength - 1) {
      newPREF += '&';
    }
  }
  return newPREF;
};

var noPath = processPref(prefs[0]);
document.cookie = 'PREF=' + noPath + '; expires=Mon, 09 Jan 2211 04:26:43 GMT; domain=youtube.com';
document.cookie = 'PREF=' + noPath + '; expires=Mon, 09 Jan 2211 04:26:43 GMT; path=/; domain=youtube.com';

if (prefs[1]) {
  document.cookie = 'PREF=' + processPref(prefs[1]) + '; expires=Mon, 09 Jan 2211 04:26:43 GMT;';
} else {
  document.cookie = 'PREF=' + noPath + '; expires=Mon, 09 Jan 2211 04:26:43 GMT;';
}

var style = document.createElement('style');
style.innerHTML = '.video-ads {display: none !important;}';
document.documentElement.appendChild(style);

if (!window.top) {
  var tryEmbedFix = function tryEmbedFix(){
    var embed = document.getElementsByTagName('embed');
    if (embed && embed.length > 0 && embed[0]) {
      embed = embed[0];
      if (embed.length > 1) {
        alert('WOAH multiple embed elements...');
      }
      console.error('FLASH VIDEO. FIX IT!');
      
      //find video id:
      var flashvars = embed.getAttribute('flashvars');
      if (flashvars && flashvars.length > 29) {
        var video_id = flashvars.lastIndexOf('&video_id=') + 10
        var id = flashvars.substring(video_id, video_id + 11);
        var embedStyle = getComputedStyle(embed);
        if (id.length === 11) {
          embed.outerHTML = '<iframe name="SUPERSCOUTHACK" id="supascouthack" type="text/html" frameborder="0" width="'+embedStyle.width+'" height="'+embedStyle.height+'" src="http://www.youtube.com/embed/'+id +'?autoplay=1&SUPERSCOUTHACK=YIPPEY" allowfullscreen></iframe>';
          setTimeout(tryEmbedFix, 3000);
        } else {
          alert('Oh no! id is: ' + id);
        }
      } else {
        alert('What... flashvars falsy/shorter than 29 chars:' + flashvars);
      }
    } else {
      setTimeout(tryEmbedFix, 160);
    }
  };
  tryEmbedFix();
}