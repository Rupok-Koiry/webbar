// Display loading screen.
const onxrloaded = () => {
  XR8.addCameraPipelineModule(window.LoadingFactory.pipelineModule())
}
const loadingComponent = {
  schema: {
    loadBackgroundColor: {default: ''},
    cameraBackgroundColor: {default: ''},
    loadImage: {default: ''},
    loadAnimation: {default: ''},
  },
  init() {
  /*
    let aframeLoaded = false
    this.el.addEventListener('loaded', () => {
      aframeLoaded = true
    })
    const aframeDidLoad = () => aframeLoaded
    const load = () => {
      LoadingFactory.setAppLoadedProvider(aframeDidLoad)
      const waitForRealityTexture =
          !!(this.el.sceneEl.attributes.xrweb || this.el.sceneEl.attributes.xrface)
      LoadingFactory.showLoading({onxrloaded, waitForRealityTexture})
    }
    window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load, {once: true})

    const loadImg = document.querySelector('#loadImage')

    if (loadImg) {
      if (this.data.loadImage !== '') {
        loadImg.src = document.querySelector(this.data.loadImage).src
      }

      if (this.data.loadAnimation !== '') {
        loadImg.classList.remove('spin')
        if (this.data.loadAnimation !== 'none') {
          loadImg.classList.add(this.data.loadAnimation)
        }
      }
    }

    const loadBackground = document.querySelector('#loadBackground')

    if (loadBackground) {
      loadBackground.style.backgroundColor = this.data.loadBackgroundColor
    }

    const requestingCameraPermissions = document.querySelector('#requestingCameraPermissions')

    if (requestingCameraPermissions) {
      requestingCameraPermissions.style.backgroundColor = this.data.cameraBackgroundColor
    }
  },
  remove() {
    XR8.removeCameraPipelineModule('loading')
  },*/
   const splash = document.querySelector('#splashimage')
    const addXRWeb = () => {
      if (this.data.requestGyro === true && this.data.disableWorldTracking === true) {
        // If world tracking is disabled, and you still want gyro enabled (i.e. 3DoF mode)
        // Request motion and orientation sensor via XR8's permission API
        XR8.addCameraPipelineModule({
          name: 'request-gyro',
          requiredPermissions: () => ([XR8.XrPermissions.permissions().DEVICE_ORIENTATION]),
        })
      }
      this.el.sceneEl.setAttribute('xrweb', `disableWorldTracking: ${this.data.disableWorldTracking}`)
       const waitForRealityTexture =
          !!(this.el.sceneEl.attributes.xrweb || this.el.sceneEl.attributes.xrface)
      LoadingFactory.showLoading({onxrloaded, waitForRealityTexture})
      window.addEventListener('xrextrasloaded', {once: true})
      setTimeout(() => {
        splash.style.display = 'none'
        console.log('exec')
       

    const loadImg = document.querySelector('#loadImage')

    if (loadImg) {
      if (this.data.loadImage !== '') {
        loadImg.src = document.querySelector(this.data.loadImage).src
      }

      if (this.data.loadAnimation !== '') {
        loadImg.classList.remove('spin')
        if (this.data.loadAnimation !== 'none') {
          loadImg.classList.add(this.data.loadAnimation)
        }
      }
    }

    const loadBackground = document.querySelector('#loadBackground')

    if (loadBackground) {
      loadBackground.style.backgroundColor = this.data.loadBackgroundColor
    }

    const requestingCameraPermissions = document.querySelector('#requestingCameraPermissions')

    if (requestingCameraPermissions) {
      requestingCameraPermissions.style.backgroundColor = this.data.cameraBackgroundColor
    }
      // document.getElementById('scn-ui').style.display = 'block'
      }, 3000)
      // splashimage.classList.add('hidden')

      // Play background music (mp3) after user has clicked "Start AR" and the scene has loaded.
      this.el.sceneEl.addEventListener('realityready', () => {
       // const snd = document.querySelector('[sound]')
       // snd.components.sound.playSound()
      })
    }
    setTimeout(() => {
      addXRWeb()
    }, 100)
},
}

export {loadingComponent}
