import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures 
 */ 
//One way of loading images
// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;
// image.onload = () => {
//     console.log("Image loaded");
//     texture.needsUpdate = true;
// }
// image.src = "./textures/door/color.jpg"

//For multiple images it's LoadingManger - To check if all the assests have loaded or not.
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => console.log("onStart") // 1
loadingManager.onLoad = () => console.log("onLoad") // 3
loadingManager.onProgress = () => console.log("onProgress") // 2
loadingManager.onError = () => console.log("onError")

//Another way is textureLoader
const textureLoader = new THREE.TextureLoader(loadingManager);
const colortexture = textureLoader.load(
    '/textures/checkerboard-8x8.png',
    () => console.log("loading finished"),
    () => console.log("Progessing"),
    () => console.log("Erroring")
)
colortexture.colorSpace = THREE.SRGBColorSpace;
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// colortexture.repeat.x = 2;
// colortexture.repeat.y = 3;
colortexture.rotation = Math.PI / 4


//Minification Filter
//When textures is way to large comapred to the surface
// colortexture.minFilter = THREE.NearestFilter

//Magnification Filter
//Used when texture is too small compared to the surface.
//Better performance using this Nearest Filter
colortexture.magFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map:colortexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()