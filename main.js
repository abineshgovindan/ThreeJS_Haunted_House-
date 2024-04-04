// console.time('start')
//43.3310546875 ms 
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene();
const fog = new THREE.Fog('#262837', 1, 15);

scene.fog = fog; 

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
//DoorTexture
const doorColorTexture = textureLoader.load('./static/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./static/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./static/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./static/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./static/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./static/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./static/textures/door/roughness.jpg');

//WallBricksTexture
const bricksColorTexture = textureLoader.load('./static/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('./static/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('./static/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('./static/textures/bricks/roughness.jpg');


//Grass
const grassColorTexture = textureLoader.load('./static/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('./static/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('./static/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('./static/textures/grass/roughness.jpg');

grassColorTexture.repeat.set(8,8);
grassAmbientOcclusionTexture.repeat.set(8,8);
grassNormalTexture.repeat.set(8,8);
grassRoughnessTexture.repeat.set(8,8);


grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping


grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping







/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

//Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.geometry.setAttribute('uv2',
new THREE.Float16BufferAttribute(walls.geometry.attributes.uv.array, 2));
walls.position.y = 2.5 / 2;
house.add(walls);

//Roof 
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({color: '#b35f45'})
);
 roof.position.y = 2.5 + .5;
 roof.rotation.y = Math.PI / 4;
house.add(roof);



//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2,2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
   
  })
)
door.geometry.setAttribute('uv2',
new THREE.Float16BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1;
door.position.z = 2 + 0.01 ;
house.add(door);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture
     })
);
floor.geometry.setAttribute('uv2',new THREE.Float16BufferAttribute(floor.geometry.attributes.uv.array, 2));
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor)



const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'});

const bushData = [
  { 
    scale: 0.5,
    position : {x: 0.8, y:  0.2, z: 2.2 }
  },
  { 
    scale: 0.25,
    position : {x: 1.4, y:  0.1, z: 2.1 }
  },
  { 
    scale: 0.4,
    position : {x: -0.8, y:  0.1, z: 2.2}
  },
   { 
    scale: 0.15,
    position : {x: -1, y:  0.05, z: 2.6}
  }
];

for(let i = 0; i < bushData.length; i++){
  const bush = new THREE.Mesh(bushGeometry, bushMaterial);
  const scale = bushData[i].scale;
  bush.scale.set(scale, scale, scale);
  const position = bushData[i].position;
  bush.position.set( position.x, position.y, position.z);
  bush.castShadow = true;
  house.add(bush);
  

}


// const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
// bush2.scale.set(0.25, 0.25, 0.25);
// bush2.position.set(1.4, 0.1, 2.1);
// house.add(bush2);

// const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
// bush3.scale.set(0.4, 0.4, 0.4);
// bush3.position.set(-0.8, 0.1, 2.2);
// house.add(bush1, bush2, bush3);


//Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'})
 

const numOfGraves = 50;
for(let i = 0; i < numOfGraves; i++){
  const graveMesh = new THREE.Mesh(graveGeometry, graveMaterial);
  const angle = Math.random() * Math.PI *2;
  const radius = 4 +  Math.random() * 6;
  const x = Math.sin(angle) *  radius;
  const z = Math.cos(angle) * radius;
  graveMesh.position.set(x, 0.3, z); 
  graveMesh.rotation.y = (Math.random() -0.5) * 0.5;
  graveMesh.rotation.z = (Math.random() -0.5) * 0.5;
  graveMesh.castShadow = true;
  graves.add(graveMesh);

}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)


//Door light

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight)

//Ghost

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
scene.add(ghost3);





/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
console.log("hello")
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//Shadows
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 7;


doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;



walls.castShadow = true;

ghost1.castShadow = true;
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;




ghost2.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.castShadow = true;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;






/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //UpdateGhost
    const ghost1Angle =  elapsedTime * 0.5 ;
    ghost1.position.x =  Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.cos(ghost1Angle * 3);

    const ghost2Angle = - elapsedTime * 0.3 ;
    ghost2.position.x =  Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.cos(ghost2Angle * 4) + Math.cos(ghost2Angle * 2.5);


    const ghost3Angle = - elapsedTime * 0.3 ;
    ghost3.position.x =  Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.cos(elapsedTime * 0.5));
    ghost3.position.y = Math.cos(ghost3Angle * 5) + Math.sin(ghost3Angle * 2);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
//console.timeEnd('start'); 
tick()
