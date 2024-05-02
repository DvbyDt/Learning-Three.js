# Fullscreen And Resizing

- Resizing of windows can be handled by making use of the useProjectionMatrix().
- Handling the pixel ratio: pixel ratio is nothing both how many physical pixels you have on your screen per unit of software.
- Earlier every device had pixel ratio of 1. But apple started to get devices with pixel ratio of 2. This is good for image quality but pixel ratio of 2 means 4 times more pixels to render and 3 means 9 times more pixels to render.
- Highest pixel ratios are on you mobile devices and hence, your frame rate is trash.

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/153ff747-5256-44f4-a8f9-51c83523f571)


```jsx
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
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

//Resizing the window
window.addEventListener("resize",()=>{
    // console.log("resize");
    //Updating the sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Update camera
    camera.aspect = sizes.width/sizes.height
    //Updating the projection
    camera.updateProjectionMatrix();
    //Again render
    renderer.setSize(sizes.width,sizes.height);
    //Handling pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));    
})

//Entering the full screen
window.addEventListener("dblclick",()=>{
    console.log("double click");
    if(document.fullscreenElement){
        console.log("Leave fullscreen")
        document.exitFullscreen();;
    }else{
        console.log("Go Fullscreen");        
        // We can choose what will be in full screen i.e. whole page or just one element
        canvas.requestFullscreen();        
    }
})
```
