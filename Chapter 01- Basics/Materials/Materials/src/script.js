import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/Addons.js'

//GUI
const gui = new GUI()

/**
 * Base 
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Loading all the textures
// const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

//Geometry
const sphere = new THREE.SphereGeometry(0.5,16,16);
const plane = new THREE.PlaneGeometry(1,1);
const torus = new THREE.TorusGeometry(0.3,0.2,16,32);

//Adding the lights
const ambientLights = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLights)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr',(environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

//Materials
// const mesh = new THREE.MeshBasicMaterial({ map: doorColorTexture })
//MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.roughness = 1;
// material.metalness = 1;
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)

const material = new THREE.MeshPhysicalMaterial();
material.roughness = 0;
material.metalness = 0;
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)

gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(material, 'metalness').min(0).max(1).step(0.0001);

//Clearcoat - thin layer of varnish
// material.clearcoat = 1
// material.clearcoatRoughness = 0;
// gui.add(material,'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.0001)

//Sheen -  highlight material when seen from a narrow angle
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)
// gui.add(material,'sheen').min(0).max(1).step(0.0001)
// gui.add(material,'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material,'sheenColor')

//Iridesence - relfection on laser CDs, bubbles
// material.iridescence = 1;
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100,800]
// gui.add(material,'iridescence').min(0).max(1).step(0.0001)
// gui.add(material,'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange,'0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange,'1').min(1).max(1000).step(1)

//Transmission - transparent
material.transmission = 1;
material.ior = 1.5
material.thickness = 0.5
gui.add(material,'transmission').min(0).max(1).step(0.0001)
gui.add(material,'ior').min(1).max(2.333).step(0.0001)
gui.add(material,'thickness').min(0).max(1).step(0.0001)

//Meshes
const sphereMesh = new THREE.Mesh(sphere,material);
const planeMesh = new THREE.Mesh(plane,material);
const torusMesh = new THREE.Mesh(torus,material);
//Position
sphereMesh.position.x = -1.5;
torusMesh.position.x = 1.5;
//Adding to scene
scene.add(sphereMesh,planeMesh,torusMesh)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Rotating the objects
    sphereMesh.rotation.y = 0.1 * elapsedTime
    planeMesh.rotation.y = 0.1 * elapsedTime
    torusMesh.rotation.y = 0.1 * elapsedTime

    sphereMesh.rotation.x = - 0.15 * elapsedTime
    planeMesh.rotation.x = - 0.15 * elapsedTime
    torusMesh.rotation.x = - 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()