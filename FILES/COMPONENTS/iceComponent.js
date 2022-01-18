const toUrl = (urlOrId) => {
  const img = document.querySelector(urlOrId)
  return img ? img.src : urlOrId
}

const iceComponent = {
  init() {
    let object = this.el.object3D;
    let scene = this.el.sceneEl.object3D;

    const r = "./assets/textures/testcubemap/";

    const urls = [
					toUrl('#posx'), toUrl('#negx'),
          toUrl('#posy'), toUrl('#negy'),
          toUrl('#posz'), toUrl('#negz'),
				];

		const textureCube = new THREE.CubeTextureLoader().load( urls );
		textureCube.mapping = THREE.CubeRefractionMapping;

		scene.background = textureCube;

		const cubeMaterial = new THREE.MeshPhongMaterial({
      metalness: .9,
      roughness: .05,
      envMapIntensity: 0.9,
      clearcoat: 1,
      transparent: true,
      transmission: .95,
      opacity: .5,
      reflectivity: 0.2,
      refractionRatio: 0.985,
      ior: 0.2,
      side: THREE.BackSide,
      });

		object.children[0].material = cubeMaterial;
    
    console.log(textureCube);
    console.log(object);
    console.log(scene);
  },
}

export {iceComponent}
