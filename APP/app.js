// styles
import './css/fonts.css'
import './css/main.css'

// scripts
import './store.js'
import './ui.js'


// other logic

import {LoadingFactory} from './loadingmodule/loading-module'
window.LoadingFactory = LoadingFactory()

import {loadingComponent} from './components/xrextras-custom-loading'
AFRAME.registerComponent('xrextras-custom-loading', loadingComponent)

import {cubeEnvMapComponent} from './components/cubemap-static'
import {cubeMapRealtimeComponent} from './components/cubemap-realtime'
import {responsiveImmersiveComponent} from './components/responsive-immersive'
import {
  portalCameraComponent, tapToPlacePortalComponent,
  promptFlowComponent, spinComponent, startFlowComponent,
} from './components/portal-components'

// import {clickHandlerComponent} from './components/clickHandlerComponent'
import {iceComponent} from './components/iceComponent'

AFRAME.registerComponent('portal-camera', portalCameraComponent)
AFRAME.registerComponent('spin', spinComponent)

AFRAME.registerComponent('prompt-flow', promptFlowComponent)
AFRAME.registerComponent('tap-to-place-portal', tapToPlacePortalComponent)

AFRAME.registerComponent('cubemap-static', cubeEnvMapComponent)
AFRAME.registerComponent('cubemap-realtime', cubeMapRealtimeComponent)

AFRAME.registerComponent('responsive-immersive', responsiveImmersiveComponent)

AFRAME.registerComponent('start-flow', startFlowComponent)

AFRAME.registerComponent('ice-component', iceComponent)

AFRAME.registerComponent('auto-play-video', {
  schema: {
    video: {type: 'string'},
  },
  init() {
    const v = document.querySelector(this.data.video)
    v.play()
  },
})

// AFRAME.registerComponent('no-cull', {
//   init: function(){
//     var object3D = this.el.sceneEl.object3D;
//     object3D.traverse((node) => {
//       node.frustumCulled = false
//     })
//   }
// })


// AFRAME.registerComponent('clickhandler', clickHandlerComponent);
