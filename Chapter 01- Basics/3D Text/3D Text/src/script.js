import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axis helper
// const axisHelper = new THREE.AxesHelper();
// scene.add(axisHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/1.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const matcapTexture2 = textureLoader.load('textures/matcaps/2.png');
matcapTexture2.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json',(font)=>{
    const textGeometry = new TextGeometry("Hello Three.js",{
        font:font,
        size:0.5,
        height:0.2,
        curveSegments:2,
        bevelEnabled:true,
        bevelThickness:0.03,
        bevelSize:0.02,
        bevelOffset:0,
        bevelSegments:5
    })
    //Bounding to find the size of the geometry can be in sphere or cube.
    // textGeometry.computeBoundingBox();
    // textGeometry.translate(
    //    - textGeometry.boundingBox.max.x *0.5,
    //    - textGeometry.boundingBox.max.y *0.5,
    //    - textGeometry.boundingBox.max.z *0.5
    // );
    textGeometry.center();
    const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture});
    const text = new THREE.Mesh(textGeometry,material);
    // text.position.x = -2.5;
    scene.add(text);

    console.time('Start')
    //Adding donuts in your canvas
    for(let i=0;i<150;i++){
        const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45);
        const donut = new THREE.Mesh(donutGeometry,material);
        scene.add(donut);

        donut.position.x = (Math.random() - 0.5) * 10;
        donut.position.y = (Math.random() - 0.5) * 10;
        donut.position.z = (Math.random() - 0.5) * 10;

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI

        const scale = Math.random();
        donut.scale.set(scale,scale,scale)
    }

    for(let i=0;i<150;i++){
        const donutGeometry = new THREE.TorusGeometry(0.5,0.2,30,30);
        const donutMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture2})
        const donut = new THREE.Mesh(donutGeometry,donutMaterial);
        scene.add(donut);

        donut.position.x = (Math.random() - 0.5) * 10;
        donut.position.y = (Math.random() - 0.5) * 10;
        donut.position.z = (Math.random() - 0.5) * 10;

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI

        const scale = Math.random();
        donut.scale.set(scale,scale,scale)
    }
    console.timeEnd('Start')

})

/**
 * Object
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
renderer.setClearColor("#132a31",1);
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