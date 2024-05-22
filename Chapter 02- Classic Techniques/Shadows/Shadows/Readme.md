- Getting the reflection of an object onto the plane.

- This has to be done at a good frame rate like 60 frames per second.
- Three.js can do this but it’s not the most perfect solution but it’s convenient.

## How shadows Work:

- For every render that three.js does. It first renders all the lights that are projected to cast a shadow.
- These renders simulates what light sees as if it were a camera. It replaces all the meshes by **MeshDepthMaterial**.
- The result it stores as textures called as Shadow Maps.
- **Step**-**1:** Enable the renderer to cast shadow i.e. renderer.shadowMap.enabled = true;
- **Step**-**2:** Make the object cast shadow : sphere.castShadow = true;
- **Step**-**3:** Make the plane receive shadow: plane.castShadow = true;

## Shadow Map Optimization:

- We require directionalLight.shadow.mapSize.width for the optimization.
