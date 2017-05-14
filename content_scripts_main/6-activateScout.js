const activateScout = () => {
  window.isActive = true
  
  setSidebarWidth()

  initIframe()

  setIframeWidth()

  setupClickInterceptor()
  //setIframeUrl()
}