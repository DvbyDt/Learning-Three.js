# Textures

- What are textures? Textures are basically images our your geometry or over the surface of your geometry. Textures can have different effects on the appearance of your geometry. It need not be about the color.
- Textures follow PBR principle i.e. Physical Based Rendering. They try to follow real life based on reflection, diffusion etc. to get real life like images.
- To get images on the geometry or load textures we use different ways.Images are converted to textures as they are GPU friendly:
  - Getting URL of the image
  - Native JavaScript
  - Using TextureLoader class in THREE.js
  - Using LoadingManager
- UV wrapping is just candy rapping to make an object or geometry flat. Here is an example :
![image](https://github.com/DvbyDt/Learning-Three.js/assets/68496657/2aa06825-c0de-48ec-9137-c3d79ca1536f)
- UV coordinates are 2D and on a plane.
- MipMapping is a way of creating textures for smaller versions till we get a texture of 1 X 1. It is for smoothening the texture.
- Texture format and optimization: There are three things that should be kept in mind:
  - Weight
  - Size or resolution
  - The data

