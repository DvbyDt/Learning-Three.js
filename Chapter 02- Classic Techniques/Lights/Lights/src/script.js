import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight)
const al = gui.addFolder('Ambient Light');
al.add(ambientLight,'intensity').min(0).max(3).step(0.01)

const directionalLight = new THREE.DirectionalLight(0x00fffc,0.3);
directionalLight.position.set(1,0.25,0);
scene.add(directionalLight)
const dl = gui.addFolder('Directional Light');
dl.add(directionalLight,'intensity').min(0).max(3).step(0.01);

//0xff0000, 0x0000ff
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff,0.9);
scene.add(hemisphereLight);
const hl = gui.addFolder('Hemisphere Light');
hl.add(hemisphereLight,'intensity').min(0).max(3).step(0.01);

const pointLight = new THREE.PointLight(0xff9000,1,10,2);
pointLight.position.set(1,-0.5,1);
scene.add(pointLight);
const pl = gui.addFolder('Point Light');
pl.add(pointLight,'intensity').min(0).max(3).step(0.01);

const rectLightArea = new THREE.RectAreaLight(0x4e00ff,6,1,1);
rectLightArea.position.set(-1.5,0,1.5);
//Now to rotate the photolight
rectLightArea.lookAt(new THREE.Vector3());
scene.add(rectLightArea);
const ra = gui.addFolder('RectLight Area');
ra.add(rectLightArea,'intensity').min(0).max(10).step(0.01);

const spotLight = new THREE.SpotLight(0x78ff00,4.5,10,Math.PI*0.1,0.25,1);
spotLight.position.set(0,2,3);
scene.add(spotLight);
const sl = gui.addFolder('Spot Light');
sl.add(spotLight,'intensity').min(0).max(10).step(0.01);

//Light Helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.2);
scene.add(directionalLightHelper)

const hemisphereLighthelper = new THREE.HemisphereLightHelper(hemisphereLight,0.2);
scene.add(hemisphereLighthelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight,0.2);
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectLightAreaHelper = new RectAreaLightHelper(rectLightArea);
scene.add(rectLightAreaHelper);



/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()