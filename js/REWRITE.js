
(function appendREWRITE_css(s) {
  s.rel = 'stylesheet';
  s.href = chrome.extension.getURL('css/REWRITE.css');
  document.documentElement.appendChild(s);
})( document.createElement('link') );

/*adjustor
position: fixed;
display: block;
top: 30px;
left: 21.7425431711146%;
height: 100%;
width: 5px;
background: transparent;
border: none;
z-index: 9999999999999;
cursor: col-resize;
*/