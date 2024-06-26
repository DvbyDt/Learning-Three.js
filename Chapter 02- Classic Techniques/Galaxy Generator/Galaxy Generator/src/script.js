import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI({width:360})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameters = {
    count : 100000,
    size : 0.01,
    radius: 5,
    branches:3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
}

let geometry = null;
let material = null;
let points = null;
let positions = null;

const generateGalaxy = () => {
    //Checking for null condition
    if(points !== null){
        geometry.dispose();
        material.dispose();
        //Always do these otherwise you will have frame rate issues.
        scene.remove(points);
    }
    
    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)
    
    //Create 1000 particles
    geometry = new THREE.BufferGeometry();
    positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    for(let i=0;i<parameters.count;i++){
        //Creating radius for vertices to be in a straight line
        //To get value from 0 to the radius i.e 0 - 5
        const radius = Math.random() * parameters.radius

        //For the branches
        //Parameters.branches * Math.PI * 2 --> For the full circle
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        //Random Particles
        const randomX = Math.pow(Math.random(),parameters.randomnessPower) * ( Math.random() < 0.5 ? 1 : -1) * radius * parameters.randomness
        const randomY = Math.pow(Math.random(),parameters.randomnessPower) * ( Math.random() < 0.5 ? 1 : -1) * radius * parameters.randomness
        const randomZ = Math.pow(Math.random(),parameters.randomnessPower) * ( Math.random() < 0.5 ? 1 : -1) * radius * parameters.randomness

        //For the spin
        const spinAngle = radius * parameters.spin;

        //For all the 3 dimensions
        const i3 = i * 3;
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3+1] = randomY;
        positions[i3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        //For the colors
        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor,radius/parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3+1] = mixedColor.g
        colors[i3+2] = mixedColor.b
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));//Values per vertex
    geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation:true,
        depthWrite:false,
        blending: THREE.AdditiveBlending,
        vertexColors:true
    })
    points = new THREE.Points(geometry,material);
    scene.add(points);
}

generateGalaxy();

gui.add(parameters,'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters,'size').min(0.01).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters,'radius').min(0.01).max(20).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters,'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

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
camera.position.x = 5
camera.position.y = 2
camera.position.z = 5
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

    points.rotation.y+=-0.001

    // Update the geometry attributes
    // geometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()