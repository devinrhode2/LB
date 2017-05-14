

//if (location.host === 'www.reddit.com') {
  activateScout()
//}
// chrome.storage.local.get(location.host, (mapOfValues) => {
//   let keys = Object.keys(mapOfValues)
//   if (keys.length === 0) {
//     //probably don't activate?
//     console.warn('site has no setting... should check if a person wants it one by default or not')
//   } else if (keys.length === 1) {
//     if (mapOfValues[keys[0]] === 1) {
//       activateScout()
//     }
//   } else if (keys.length > 1) {
//     console.error(
//       'what? why are there more than one key for this domain ('+location.host+')?', mapOfValues
//     )
//   }
// })