

let beenActivated = false

const considerActivating = () => {
  chrome.storage.local.get(location.host, (mapOfValues) => {
    let keys = Object.keys(mapOfValues)
    if (keys.length === 0) {
      //probably don't activate?
      console.warn('site has no setting... should check if a person wants it one by default or not')
    } else if (keys.length === 1) {
      if (mapOfValues[keys[0]] === 'y') {
        if (window.isActive !== undefined) {
          confirm('reload?')
        }
        activateScout()
      } else if (mapOfValues[keys[0]] === 'n') {
        //don't activate!
        if (window.isActive === true) {
          if (confirm('Would you like to reload the page?')) {
            location.reload()
          }
        }
      } else {
        alert('these mofos need to be parseInt\'d?????')
      }
    } else if (keys.length > 1) {
      console.error(
        'what? why are there more than one key for this domain ('+location.host+')?', mapOfValues
      )
    }
  })
}
activateScout()

chrome.storage.onChanged.addListener((changes, storageAreaName) => {
  if (storageAreaName !== 'local') throw new Error('thought we were only working with chrome.storage.local')
  Object.keys(changes).forEach((key) => {
    if (key === location.host) {
      considerActivating()
    }
  })
})