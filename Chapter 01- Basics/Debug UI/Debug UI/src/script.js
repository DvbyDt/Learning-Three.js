import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from "lil-gui"

/**
 * Debug UI
**/ 
const gui = new GUI({
    title:'Cube Debug UI',
    width:350,
    closeFolders:false,

});

window.addEventListener("keydown",(e)=>{
    if(e.key==='h'){
        gui.show(gui._hidden)
    }
})
const debugObj = {}

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

debugObj.color = '#ff0000'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObj.color , wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Tweaking the folders
const cubeProperties = gui.addFolder('Cube Properties')

//Tweak Property of the object
//Range
cubeProperties
    .add(mesh.position,'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

//Tweaks for non properties
//Checkbox
cubeProperties
    .add(mesh,'visible')
//Wireframe
cubeProperties
    .add(material,'wireframe')
  
//For colors
//Since, only this is not working properly we have to make use of the debugObject
cubeProperties
    .addColor(debugObj,'color')
    .onChange(()=>{
        material.color.set(debugObj.color)
    })

//Adding Fucntions beacuse functions can't be added directly.
debugObj.spin = () => {
    gsap.to(mesh.rotation ,{
        y : mesh.rotation.y + Math.PI * 2
    })
}

cubeProperties
    .add(debugObj,'spin')
 
//Tweaking the geometry
debugObj.subdivision = 2;
cubeProperties 
    .add(debugObj,'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(()=>{
        mesh.geometry.dispose();
        mesh.geometry =  new THREE.BoxGeometry(
            1, 1, 1,
            debugObj.subdivision, debugObj.subdivision, debugObj.subdivision)
    })

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()