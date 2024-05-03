# Geometries

- Geometries are composed of vertices.
- Vertices are nothing but points in the 2D space , it’s singular is vertex.
- Geometries can be used to create meshes, particles.
- Three.js has many geometries and each geometries inherits from BufferGeommetry class.
- We can also create our own geometry in JS or using blender.
- In Box Geometry we have 3 additional parameters of width segments, height segments and depth segments.
- Below is the representation of 1 segment:

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/b44e579b-72f0-44da-8c25-3ad792fe23bd)


- For two segments:

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/f3b37a0d-8eba-42d4-8865-8f487e9c74ac)


- For 3:

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/703cc271-dfb8-41c0-88e1-98c3663919e6)

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

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
//Creating our own shape using Buffer Geometry
const geometry = new THREE.BufferGeometry()
// const positionArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ])

// const positionAttribute = new THREE.BufferAttribute(positionArray,3)

// geometry.setAttribute('position', positionAttribute)

const count = 50
const positionArray = new Float32Array(count * 3 * 3);
for(let i=0;i<count * 3 * 3;i++){
    positionArray[i] = ( Math.random() - 0.5 ) * 4
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
geometry.setAttribute('position',positionAttribute)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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
```
