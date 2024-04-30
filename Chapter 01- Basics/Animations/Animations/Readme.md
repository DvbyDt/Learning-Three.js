# Animation Basics in Three.js

- RequestAnimationFrame is for calling the function mentioned in the next frame. It is not for doing animation but solely for calling the function on the next frame.
- Put the renderer.render() inside the requestAnimationFrame() so, that it gets rendered on the next frame.
- We can use the clock method that is there in three.clock() and get the elapsedTime from it as it is the time starting from 0 and apply different position and rotations to it.
- We can also use the GSAP library for animating the values the objects.
- Whatever you want to choose entirely depends on your use case.

```jsx
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Using clock which is a three.js class
const clock = new THREE.Clock();

//Request Animation Frame
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime)
    mesh.position.x = Math.sin(elapsedTime)
    mesh.position.y = Math.cos(elapsedTime)
    // console.log("Yo");
    //Move the render here:
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}

tick();

```

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/13ae4119-4475-4832-b761-805d6bef8a1e)
