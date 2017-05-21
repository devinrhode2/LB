window.scoutIframe = undefined

const firstDomNodes = document.createDocumentFragment()

let lastWidth = undefined

const createIframe = (href, width) => {
  if (width === undefined) {
    if (lastWidth === undefined) {
      width = window.innerWidth - 320
      //throw new Error('width is undefined, and so is lastWidth')
    }
    width = lastWidth
  } else {
    lastWidth = width
  }
  //width = window.innerWidth-width

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
  if (window.scoutIframe && window.scoutIframe.remove) {
    window.scoutIframe.remove()
  }
  firstDomNodes.appendChild(window.scoutIframe = createElement('iframe', {
    //explicit properties
    id: 'smartframe',
    // onload() {
    //   setLoadingIndicator('done')
    // },
    onerror() {
      alert('iframe error!') //never happens... but just in case...
    },
    onmouseover() {
      this.focus() //HEY ...should I add an autofocus thing to the left pane?
    },
    className: 'rightPane',
    sandbox: 'allow-scripts allow-forms allow-same-origin'
  }, {
    //explicit attributes
    name: 'smartframe',
    style: rightPaneBaseStyles +
      'user-select:none; height:100%; width:' + (width) + ';' +
      'background:white; border:none;top:0px;' 
  }))

  document.documentElement.appendChild(firstDomNodes)
  setTimeout(() => {
    document.documentElement.appendChild(createElement('script', {
      id: 'scoutScript',
      innerHTML: "\
        setTimeout(function one(){                                                        \
          document.getElementById('smartframe').contentWindow.name = 'smartframe';        \
          setTimeout(function two(){                                                      \
            document.getElementById('smartframe').contentWindow.location.href = '"+href+"';\
            document.getElementById('smartframe').contentWindow.name = 'smartframe';      \
            setTimeout(function three(){                                                  \
              document.getElementById('smartframe').contentWindow.name = 'smartframe';    \
              var ScoutScript = document.getElementById('scoutScript');                   \
              ScoutScript.parentNode.removeChild(ScoutScript);                            \
            }, 1);                                                                        \
          }, 1);                                                                          \
        }, 1);"
    }))
  }, 1)
}