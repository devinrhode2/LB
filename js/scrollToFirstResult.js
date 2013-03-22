(function scrollToFirstResult() {
  function main() {
    scrollTo(0, 81);
  }
  if (document.readyState === 'complete') {
    console.log('no window onload');
    main();
  } else {
    window.addEventListener('load', function ScoutScrollOnload(){
      console.log('window onload');
      main();
    });
  }
})();