
const root = document.documentElement

const setSidebarWidth = (width) => {
  ////////////////////
  // SET WIDTH OF ROOT ELEMENT (sidebar)
  /*
  If someone has a really large, wide display,
  we could make the sidebar larger,
  but I'm not sure that's very useful,
  unless they have the page zoomed in, but for now,
  I'm going to lock in the sidebar at 320,
  which is the width of the (now) ancient iphones (up to and including iphone 5), http://iosres.com/

  It would be awesome to work at the browser level and really develop out a very new browsing 


  But, it might be better to set the width to
  something like 320/1024 (30%) or 38.2 (golden ratio)
  and with margins on left and right
  Maybe set it up to be 320 + 1024? or 320+1000? or 320+920? (320/837.8 is close to golden ratio)

1366x768
30.46%
1920x1080
15.56%
1440x900
6.67%
1600x900
5.93%
1280x800
5.68%
1024x768
5.49%

  https://mydevice.io/devices/837
  ***MAIN THING IS WE DON'T WANT TO GO LOWER THAN 320!!!***
  For now could just set min-width: 320
  414	is a good upper bound
  we really don't want to go past 480, where tablets kick in (like Kindle Fire HD 7)

  mobile = 320
  target = 1366                              1366 - 320 = 1046
  goldenRatio = 0.38194444
  goldenRatio = mobile/(target-mobile)
  (target-mobile) * goldenRatio = mobile                    (4-3)*2  ==>  1*2 === 8-6
  target*goldenRatio - mobile*goldenRatio = mobile
  target*goldenRatio - 122.2222208 = mobile
  target*goldenRatio = 320 + 122.2222208
  target = (mobile + mobile*goldenRatio)/goldenRatio
  target = 1157.82px or 1158..

  function calculateWidth(mobile=320, )


  320/desiredPageWidth = goldenRatio
  320 =  * desiredPageWidth
  desiredPageWidth = 837.8

  
  320/1046 = 0.3059273423
  38.194444 = mobile/(target - mobile)
  */
  let existingStyles = root.getAttribute('style') || ''
  let newWidth = width || 320 //smallerMobileWidth
  let newStyles = 'width:' + newWidth + 'px !important;'
  root.setAttribute(
    'style',
    existingStyles + ';' +
    newStyles
  )
}

// if (isWebSearchUrl(location.href)) {
//   chrome.storage.get('on:'+DOMAIN, (on) => {
//     if (on === 'yes' || on === 'true' ) {
//setWidth();
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
