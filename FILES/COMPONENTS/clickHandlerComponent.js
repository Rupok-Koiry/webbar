const clickHandlerComponent = {
  init() {
    const {sceneEl} = this.el
    // const screen3d_1 = document.getElementById('screen3d_1')
    const scene_content = document.getElementById('scene_content')
    const before_portal = document.getElementById('screen-before-portal')

    this.el.addEventListener('click', () => {
      // screen3d_1.setAttribute('visible', false)
      scene_content.setAttribute('visible', true)

      setTimeout(() => {
        before_portal.addEventListener('click', window.firstPlaceEvent)
      }, 300)

    })
  },
}

export {clickHandlerComponent}
