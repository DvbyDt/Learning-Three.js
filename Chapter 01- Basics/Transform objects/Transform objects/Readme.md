# Transform Objects

- There are 4 properties to transform an object:
Position
Scale
Rotation 
Quarternion
- In blender the axes are different and the ones moving above are z axis but in three.js is y.
- The position can be anywhere in code only condition being it should be before the render which is obvious.
- Position inherits from Vector3, Vector is basically something with magnitude and direction.
- length() is basically the distance of center from the object.
- **distanceTo**() : It is the difference between object and the camera position.
- We can also make use of **axes helper** which is used to display the axis just for our reference.
- In Scale also it inherits Vector3 and in scale can be used to scale the images in all the directions.
- **Rotations**: The rotations in three.js are a part of euler which is a way of rotation in which you imagine a stick through the center along the y axis in your object and rotation based on it.
- **MATH.pi** means half a rotations. The rotations is in the form of radians
- We have to specify the order in which objects can be rotated along which axis and which has to be given the priority. So, do reorder(”and in a string specify your order”)
- If we don’t take into account the priority of the axis then we might get stuck in something called as gimbal lock. It looks like one axis is fixed and other are rotating.
- We can combine all the transformations into one.
- There is a scene graph which is used to move a group of objects together.

```jsx
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
```
![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/e02c70a8-3959-44e9-abda-0e6a6040b7bc)
