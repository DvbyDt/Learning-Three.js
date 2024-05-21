# Lights

### Ambient Light

- first takes the color and then the intensity.
- The idea of Ambient Light is to have omnidirectional lighting. It comes from everywhere.
- So, it lights up each and every part of your render. Example can be seen here:
![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/d015ed3e-ce13-4f96-b88e-6a01caffa9bd)


- Now, in newer updates of three.js the intensity has increased and so, the same can be applied to our debug UI.
- We will use ambient light to simulate light bouncing and we are applying light from a different angle like the lamp illuminating the surrounding and creating a bouncing effect with some other lights used for the non-illuminating surface or the surface that is not facing the light.
![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/8f5c7e92-0e2d-44fd-9234-778f3f2a804d)

### **Directional Light:**

- It states that lights are coming from one direction directly above the object and lights are coming in parallel to each other like the sun.

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/a3712d03-abea-451e-81de-c4c3a5f8445b)


- We can change the position in case of directional light but it always accounts to the origin and will light the objects or the scene based on how the you have positioned the light. The blue point indicates the origin i.e. 0,0,0. So, directional light behaves with respect to that.
    
  ![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/d9fce3a4-2bc3-4ee0-970b-836c34c0eb1d)

    

### **Hemisphere Light**

- It is basically light coming from two sides by default one is up and the other is down. It can create beautiful blends of both the colours and is used in case you want to display grass and also the sky.
- That is the reason why it takes two colours as arguments.

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/5bc845e3-74d8-45c7-9eda-c2b55f3cd76e)


### **Point Light**

- It works as a lighter. So, it illuminates everything near to it in all the directions.
- You can specify it’s distance and decay accordingly. Decay is nothing but the light dimming after a particular distance.
    
![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/b64f017e-463b-4b2d-a69e-1e5c81a3fa29)

    

### **RectArea Light:**

- Rect Area Light is like the lights that you have on photoshoots.
- You can even turn the head of this photoshoot light. It also has the
- It only works with **MeshStandard** and **MeshPhysicalMaterials** as it is a derivative of **MeshStandard**.

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/cee3da31-85dc-4e35-95eb-8a8e0da357bd)


- This is the coolness of RectLightArea:

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/9c665216-58d7-42c5-971e-bc7d561d3804)


### **Spot Light**

- Spot Light is a flashlight like a torch.
- More appropriate way of describing a spot light is using a torch and a wall.

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/dd7e3e0b-1216-40d3-8066-4a9fce847500)


- Most interesting part of spot light are it’s parameters: 
This is the pneumbera. Which indicates that curve is more smooth and angle is basically the curve.

![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/f7af8afd-1cc5-4787-ad0e-f4a4a719b829)


### **Performance**

- Add as few lights as possible. Adding more lights is heavy on the GPU and make render performance issues.
- The lowest performance lights are: Ambient and Hemisphere light
- The lights with moderate performance is : Directional and Point
- The lights with high cost are: RectArea Light, SpotLight

### LightHelpers

- We can use different light helpers to help us identify where the lights are coming out from. Especially cool when debugging the applications.
