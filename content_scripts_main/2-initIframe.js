window.scoutIframe = undefined

let firstEverIframeLoad = true
//htmlGroup runs when the <html> element is available.
const firstDomNodes = document.createDocumentFragment()

const initIframe = (width) => {

  ////////////////////
  // RESIZE STYLES NODE
  // firstDomNodes.appendChild(window.resizeStyles = createElement('style', {
  //   innerHTML: '',
  //   id: 'resizeStyles'
  // }))
  // resizeSplitTo(width)

  const rightPaneBaseStyles = 'white-space: nowrap;position:fixed; right: 0px; z-index:111;'

  ////////
  //IFRAME
  firstDomNodes.appendChild(window.scoutIframe = createElement('iframe', {
    //explicit properties
    id: 'smartframe',
    onload() {
      if (firstEverIframeLoad) {
        //Do nothing.
        firstEverIframeLoad = false
      } else {
        //setLoadingIndicator('done')
        
        //wrap errors and warnings
        //console.groupEnd()
      }
    },
    onerror() {
      alert('iframe error!') //never happens... but just in case...
    },
    onmouseover() {
      this.focus() //HEY should I add an autofocus thing to the left pane?
    },
    className: 'rightPane',
    sandbox: 'allow-scripts allow-forms allow-same-origin',
  }, {
    //explicit attributes
    name: 'smartframe',
    style: rightPaneBaseStyles +
      'user-select:none; height:100%; width:61%;' + //(width was 100-width%)
      'background:white; border:none;'//top:31px; 
  }))

  document.documentElement.appendChild(firstDomNodes)
}