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
renderer.render(scene,camera);