import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const texture = new THREE.TextureLoader();
const particleTexture = texture.load('/textures/particles/2.png');

//Particles
// const particleGeometry = new THREE.SphereGeometry(1,32,32);

//Creating custom particles
const particleGeometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);
//Color Attribute
const colorAttribute = new Float32Array(count * 3);

for(let i=0;i<count*3;i++){
    positions[i] = (Math.random() - 0.5) * 10;
    colorAttribute[i] = Math.random();
}

particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
particleGeometry.setAttribute('color',new THREE.BufferAttribute(colorAttribute,3));

//Particle Geometry
const particleMaterial = new THREE.PointsMaterial({
    size:0.1,
    //Particle regardless of the distance are just the same if false.
    sizeAttenuation:true,
    //To tackle the edge problem
    alphaMap:particleTexture,
    // alphaTest:0.001,
    transparent:true,
    color:"#ff88cc",
    //Using depth test for the same.
    // depthTest:false
    depthWrite:false,
    blending:THREE.AdditiveBlending,
    vertexColors:true
})
//Making particles
const points = new THREE.Points(particleGeometry,particleMaterial);
scene.add(points);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    
    //Update particles
    // points.position.y = Math.cos(elapsedTime) * 0.2
    // points.position.x = Math.sin(elapsedTime) * 0.2

    //Another way to update the particles is
    for(let i=0;i<count;i++){
        let i3 = i * 3

        const x =particleGeometry.attributes.position.array[i3]
        particleGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime + x)
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()