// This component hides and shows certain elements as the camera moves

let isInPortalSpace = false
let wasOutside = true
let refreshStatus = true

const portalCameraComponent = {
  schema: {
    width: {default: 10},
    height: {default: 10},
  },
  init() {
    this.camera = this.el
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')
    this.portalVideo = document.getElementById('portalVideo')
  },

  tick() {
    const recorder = document.getElementById('recorder')
    const {position} = this.camera.object3D
    const isOutside = position.z > 0
    // console.log(withinPortalBounds)
    const withinPortalBounds =
      position.y < this.data.height && Math.abs(position.x) < this.data.width / 2
    // console.log(withinPortalBounds, 'with')
    if (wasOutside !== isOutside && withinPortalBounds && refreshStatus) {
      isInPortalSpace = !isOutside
    }

    // console.log(isInPortalSpace, window.store.firstGoInPortal)

    if (isInPortalSpace && window.store.firstGoInPortal && refreshStatus) {
      // console.log(this.isInPortalSpace, window.store.firstGoInPortal)
      recorder.style.display = 'block'

      // document.getElementById('portal-contents').setAttribute('animation-mixer', "clip: *" );
      // document.getElementById('ground-b-obj').setAttribute('animation-mixer', "clip: *" );
      document.getElementById('tiger-portal').setAttribute('animation-mixer', 'clip: Animation')
      document.getElementById('portal-a-letter').setAttribute('animation-mixer', 'clip: ArmatureAction')

      document.getElementById('tiger-portal2').setAttribute('animation-mixer', 'clip: Action')
      document.getElementById('train-portal').setAttribute('animation-mixer', 'clip: Train_Anim')

      window.goToScreen('portal')
      window.store.firstGoInPortal = false
      refreshStatus = false
    }
    this.contents.object3D.visible = isInPortalSpace || isOutside
    this.walls.object3D.visible = !isInPortalSpace && isOutside
    this.portalWall.object3D.visible = isInPortalSpace && !isOutside
    this.portalVideo.object3D.visible = isOutside
    wasOutside = isOutside
    // console.log(this.wasOutside, 'wasoutside')
    // console.log(this.isInPortalSpace, 'in portal')
    // console.log(isOutside, 'is outside')
  },
}

const tapToPlacePortalComponent = {
  init() {
    const {sceneEl} = this.el
    const recenterBtn = document.getElementById('recenterButton')

    this.camera = document.getElementById('camera')
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')

    this.portalSky = document.getElementById('portal-sky')

    // this.isInPortalSpace = false
    // this.wasOutside = true

    const portalHiderRing = this.el.sceneEl.querySelector('#portalHiderRing')
    const portalRim = this.el.sceneEl.querySelector('#portalRim')
    const portalVideo = this.el.sceneEl.querySelector('#portalVideo')
    const portalShadow = this.el.sceneEl.querySelector('#portalShadow')
    const camera = document.querySelector('#camera')

    document.getElementById('screen-start').addEventListener('click', function(event) {
        if(window.portalType){
            if(window.portalType == 'portal-a'){
                window.goToScreen('before-portal');
                window.switchPortal('portalA')
            }

            if(window.portalType == 'portal-b'){
                window.goToScreen('before-portal');
                window.switchPortal('portalB')
            }
        }else{
            window.goToScreen('choose-portal');
        }
        
        
        document.getElementById('portal-audio').play();
    })

    const handleClickEvent = (e) => {
      if (!e.touches || e.touches.length < 2) {
        recenterBtn.classList.add('pulse-once')
        sceneEl.emit('recenter')
        setTimeout(() => {
          recenterBtn.classList.remove('pulse-once')
        }, 200)
      }
    }

    const firstPlaceEvent = (e) => {
      // const recorder = document.getElementById('recorder')
      // recorder.style.display = 'block'
      // window.goToScreen('portal')

      

      sceneEl.emit('recenter')
      sceneEl.emit('dismissPrompt')

      portalHiderRing.setAttribute('animation__1', {
        property: 'radius-inner',
        dur: 1500,
        from: '0.001',
        to: '3.5',
        easing: 'easeOutElastic',
      })

      portalRim.setAttribute('animation__2', {
        property: 'scale',
        dur: 1500,
        from: '0.001 0.001 0.001',
        to: '4.3 4.3 4.3',
        easing: 'easeOutElastic',
      })

      portalVideo.setAttribute('animation__3', {
        property: 'scale',
        dur: 1500,
        from: '0.001 0.001 0.001',
        to: '7 7 1',
        easing: 'easeOutElastic',
      })

      portalShadow.setAttribute('animation__4', {
        property: 'scale',
        dur: 1500,
        from: '0.001 0.001 0.001',
        to: '15.5 2 11',
        easing: 'easeOutElastic',
      })
      sceneEl.removeEventListener('click', firstPlaceEvent)
      recenterBtn.addEventListener('click', handleClickEvent, true)
    }

    window.firstPlaceEvent = firstPlaceEvent

    const refreshPortal = () => {
      portalHiderRing.removeAttribute('animation__1')

      portalRim.removeAttribute('animation__2')

      portalVideo.removeAttribute('animation__3')

      portalShadow.removeAttribute('animation__4')

      portalHiderRing.setAttribute('radius-inner', '0.001')

      portalRim.setAttribute('scale', '0.001 0.001 0.001')

      portalVideo.setAttribute('scale', '0.001 0.001 0.001')

      portalShadow.setAttribute('scale', '0.001 0.001 0.001')

      //   console.log(portalCameraComponent)
      //   console.log(portalCameraComponent.data)
      //   console.log(portalCameraComponent.wasOutside)

      

      const recorder = document.getElementById('recorder')
      const scene_content = document.getElementById('scene_content')
      recorder.style.display = 'none'
      scene_content.setAttribute('visible', false)

      XR8.XrController.recenter()

      isInPortalSpace = false
      wasOutside = true
      window.store.firstGoInPortal = true

      document.getElementById('tiger-portal').removeAttribute('animation-mixer')
      document.getElementById('portal-a-letter').removeAttribute('animation-mixer')

      document.getElementById('tiger-portal2').removeAttribute('animation-mixer')
      document.getElementById('train-portal').removeAttribute('animation-mixer')
      
      setTimeout(function(){
          refreshStatus = true
      }, 400)

      

      //   sceneEl.camera.el.removeAttribute('portal-camera')

      //   console.log(sceneEl)

      //   sceneEl.removeAttribute('responsive-immersive')

      //   camera.setAttribute('position', '0 9 11')
      //   console.log(camera)
      //   console.log(camera.getAttribute('position'))

    //   setTimeout(() => {
    //     window.store.firstGoInPortal = true
    //   }, 1000)
    }

    window.refreshPortal = refreshPortal

    // sceneEl.addEventListener('click', firstPlaceEvent)
  },
}

const promptFlowComponent = {
  init() {
    this.prompt = document.getElementById('promptText')
    this.overlay = document.getElementById('overlay')

    this.el.sceneEl.addEventListener('realityready', () => {
      this.overlay.style.display = 'block'
      this.prompt.innerHTML = 'Tap to Place<br>Moon Portal'
      this.prompt.classList.add('fly-in')
    })

    this.el.addEventListener('dismissPrompt', () => {
      this.prompt.classList.remove('fly-in')
      this.prompt.classList.add('fly-out')
    })
  },
}

const startFlowComponent = {
  init() {
    const {sceneEl} = this.el
    const recorder = document.getElementById('recorder')
    const downloadButton = document.getElementById('downloadButton')
    if (downloadButton) {
      downloadButton.style.display = 'none'
    }

    recorder.style.display = 'none'

    const kakaoButton = document.getElementById('kakao-link-btn')

    kakaoButton.addEventListener('click', (event) => {
      recorder.style.display = 'block'
    })

    const shareButton = document.getElementById('mobile-link-btn')
    //const thisUrl = window.location.href
    const thisTitle = document.title

    shareButton.addEventListener('click', (event) => {
      if (navigator.share) {
        navigator.share({
          title: thisTitle,
          url: window.location.href,
        }).then(() => {

        })
          .catch(console.error)
      } else {
        alert('Web Share API not supported')
      }
      recorder.style.display = 'block'
    })

    // window.captureButton = document.createElement("xrextras-capture-button");
    // captureButton.classList.add('captureButton');

    this.el.sceneEl.addEventListener('realityready', () => {
      goToScreen('start')

      // setTimeout(()=>{
      //   document.getElementById('screen3d_1').setAttribute('visible', 'true')
      // }, 1000);
    })
  },
}

const spinComponent = {
  schema: {
    speed: {default: 2000},
    direction: {default: 'normal'},
    axis: {default: 'y'},
  },
  init() {
    const {el} = this
    el.setAttribute('animation__spin', {
      property: `object3D.rotation.${this.data.axis}`,
      from: 0,
      to: 360,
      dur: this.data.speed,
      dir: this.data.direction,
      loop: true,
      easing: 'linear',
    })
  },

}

export {portalCameraComponent, tapToPlacePortalComponent, promptFlowComponent, spinComponent, startFlowComponent}
