import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene() 

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.y = 1;
// // mesh.position.x = -2;
// // mesh.position.z = -3;
// mesh.position.set(-2,1,-2);
// mesh.position.normalize();
// scene.add(mesh)

// //Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// //Scale
// mesh.scale.x = 3
// mesh.scale.y = 0.51
// mesh.scale.z = 0.52
// mesh.scale.set(2,0.51,0.52);


// //Rotation
// mesh.rotation.reorder("XYZ");
// mesh.rotation.x = Math.PI/2 * 0.51;
// mesh.rotation.y = Math.PI/2;

//Scene Graph
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:"red"}));
group.add(cube1);
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:"yellow"}));
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:"green"}));
cube3.position.x = 2;
group.add(cube3);

group.position.y = -1;
group.scale.set(0.8,0.5,0.5);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.lookAt(mesh.position)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)