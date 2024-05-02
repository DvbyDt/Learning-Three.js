# Cameras

- Camera is an abstract class.
- There are different types of cameras : orthographic, perspective, ArraysCamera, StereoCamera, CubeCamera.
- ArraysCamera is used when you have variety of views on the same screen.
- CubeCameras use to do 6 renders and are used in environment map, reflection etc.
- StereoCamera is used to create depth effect useful in VR headsets. It has two cameras that mimics the eye pattern.
- Orthographic Camera is used when you want your scenes to not have a perspective or view of depth.
    - Orthographic Camera has 4 parameter left, right, top and bottom.
- Perspective Cameras have a view of depth in them.
    - If an object which is not in the range between near and far it will not be shown.
    - If your range is like 0.00000001 and 9999999999 you might end up in something called as z-fighting where two faces will be in fighting as to which one will be rendered above the other.
    - To prevent z-fighting we use smaller values like 0.1 and 100.
- For camera positions we and rotations we can use different controls built in controls in three.js
- **DeviceOrientationControl** : Can be used to orient the camera based on mobile device orientation.
- **OrbitControls**: Camera movements zoom in and out and also you can move here and there.
- Damping is used to smoothen the animation.

```jsx
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75 , sizes.width / sizes.height,0.1,100)
// const camera = new THREE.OrthographicCamera(
//     -1 * sizes.width / sizes.height,
//      1 *  sizes.width / sizes.height,
//      1,
//      -1,
//      0.1,100) 
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    controls.update();
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```
You can check the working here: [Camera's Working](https://663341a36cf4a0876eccda77--kaleidoscopic-elf-4b285d.netlify.app/)
