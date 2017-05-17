window.inPageActivationSettings = {
  override: undefined, //Can be "NEVER_ACTIVATE" or "ALWAYS_ACTIVATE"

  //Modifier keys to hold while clicking link that will activate scout
  //(List of strings) Can be zero, one, two, three, four, just as long as each string
  //correspond EXACTLY to a property on the click event object. (Touch not yet totally supported)
  //All of the modifier keys need to be pressed in order to activate scout.
  activationModifierKeys: ['metaKey', 'altKey'],

  //If activationModifierKeys is empty,
  // then we will check whenActivationModifierKeysIsEmpty to see if it's 'NEVER_ACTIVATE' or 'ALWAYS_ACTIVATE'
  whenActivationModifierKeysIsEmpty: 'NEVER_ACTIVATE'
  //Must be set to one of these two values. (Although technically won't crash if activationModifierKeys are set)
}


const shouldActivate = (event) => {
  //First, we will check the override:
  if (inPageActivationSettings.override) {
    if (inPageActivationSettings.override === 'ALWAYS_ACTIVATE') {
      return true
    } else if (inPageActivationSettings.override === 'NEVER_ACTIVATE') {
      return false
    }
  }

  let activationModifierKeys = inPageActivationSettings.activationModifierKeys
  //First, we are going to check if there are ANY activationModifierKeys:
  if (!activationModifierKeys || activationModifierKeys.length === 0) {
    if (inPageActivationSettings.whenActivationModifierKeysIsEmpty === 'ALWAYS_ACTIVATE') {
      return true
    } else if (inPageActivationSettings.whenActivationModifierKeysIsEmpty === 'NEVER_ACTIVATE') {
      return false
    }
  } else if (activationModifierKeys.length > 0) {
    let foundFalseKey = false //(not yet)
    activationModifierKeys.forEach((modifierKeyProperty) => {
      if (event[modifierKeyProperty] !== true) { //(if undefined, it's still not true, even though it isn't *precisely* false)
        foundFalseKey = true
      }
    })
    if (foundFalseKey === false) {
      //Hey, looks like every modifier key was held down during this event. 
      return true
    } else {
      return false
    }
  }
}

const setupClickInterceptor = () => {
  //window.clickEventQ = []

  document.documentElement.addEventListener('click', (clickEvent) => {
    console.log('click:', clickEvent)
    if (clickEvent.target.tagName.toLowerCase() === 'a' && clickEvent.target.href) {
      //clicked a link with an actual href..

      if (window.isActive) {//if scout is active
        clickEvent.preventDefault()
        clickEvent.stopPropagation()
        clickEvent.stopImmediatePropagation()
        createIframe(clickEvent.target.href)
      } else { //not active, but maybe they are holding
        //the requisite modifier key(s) to activate it on this click..
        //NOTE this will only ever run (currently) when scout is already on for the current domain... so quite useless
        // if (shouldActivate(clickEvent)) {
        //   clickEvent.preventDefault()
        //   clickEvent.stopPropagation()
        //   clickEvent.stopImmediatePropagation()
        //   setIframeUrl(clickEvent.target.href)
        // }
      }
      //clickEventQ.push(clickEvent)
    }
  }, true)
}