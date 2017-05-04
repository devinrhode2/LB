
const root = document.documentElement;

////////////////////
// SET WIDTH OF PAGE!
/*
If someone has a really large, wide display,
we could make the sidebar larger,
but I'm not sure that's very useful,
unless they have the page zoomed in, but for now,
I'm going to lock in the sidebar at 320,
which is the width of the (now) ancient iphones 1-5, http://iosres.com/

But, it might be better to set the width to
something like 320/1024 (30%) or 38.2 (golden ratio)
and with margins on left and right
or maybe not actually do any of this?
Maybe set it up to be 320 + 1024? or 320+1000? or 320+920?
*/
let existingStyles = (root.getAttribute('style') || '')
let newWidth = 320 //smallerMobileWidth
let newStyles = 'width:' + newWidth + 'px !important;'
root.setAttribute(
  'style',
  existingStyles + ';' +
  newStyles
)
// if (isWebSearchUrl(location.href)) {
//   chrome.storage.get('on:'+DOMAIN, (on) => {
//     if (on === 'yes' || on === 'true' ) {
//       htmlGroup();
//     } else {
//       console.log('Scout is off: ' + on);
//       offScript();
//     }
//   })
// } else {
//   //if webhp but not ?q= or &q=, then it's actually the homepage, and is handled by google.com.js
//   console.log('not web search.');
// }

/* try getting html.innerHTML.indexOf(google.sn=") and then see if it's google.sn="web" or ="webhp" */
/* if it's web search as this variable indicates and there is a list of results, report this URL.*/
