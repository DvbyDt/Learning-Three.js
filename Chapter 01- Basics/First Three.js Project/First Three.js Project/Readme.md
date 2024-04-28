# First Three.js Project

- We are using a bundler that is Vite, in French it means Fast.
- The dependencies that we have added are Vite and Three.js
- For Vite: 
npm install vite
- For three:
npm install three
- Our First Scene that we will create will have:
**Scene** - Scene is something you want to be rendered on the screen, it’s like a container that you want the user to view it.
**Object** - It is primitive geometric shapes, particles etc.
**Camera** - How we position the object that we want to see if we move the camera will also move with respect to our view.
**Renderer** - It is to render or show the object with respect to the camera view.

```jsx
import * as THREE from "three"

console.log("THis is three.js website",THREE);
//Creating a canvas
const canvas = document.querySelector("canvas.webgl");

//Scene
const scene = new THREE.Scene();

//Objects
const cubeGeometry = new THREE.BoxGeometry(1,1,1);//height,width and depth
//Mesh is basically the objects that we see on the screen i.e. the visible shap and how they look 
//i.e. the material
// SO, MESH = Visible shape + How they look 
const material = new THREE.MeshBasicMaterial({color:"red"});
//Creating a Mesh
const mesh = new THREE.Mesh(cubeGeometry,material);
//Adding the scene to the Mesh
scene.add(mesh);

//Camera - is the Point of view
const size = {
    height:600,
    width:800
};
//The parameters are FOV and the aspect ratio
const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 3;
scene.add(camera);

//Renderer - Rendering from camera POV.
const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(size.width,size.height);
renderer.render(scene,camera);ne,camera);
```

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/9884616f-de97-4867-b174-b4098c13bc3e)
