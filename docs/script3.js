let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ⭐ Particle heart
let particles = new THREE.BufferGeometry();
let count = 2000;

let positions = new Float32Array(count * 3);

function heart(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t) - 5 * Math.cos(2*t)
        - 2 * Math.cos(3*t) - Math.cos(4*t);
  return [x, y];
}

for(let i=0;i<count;i++){
  let t = Math.random() * Math.PI * 2;
  let h = heart(t);

  positions[i*3] = h[0] * 0.2;
  positions[i*3+1] = h[1] * 0.2;
  positions[i*3+2] = (Math.random()-0.5) * 2;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

let material = new THREE.PointsMaterial({
  color: 0xff2bd6,
  size: 0.05
});

let heartMesh = new THREE.Points(particles, material);
scene.add(heartMesh);

camera.position.z = 5;

// 🖱 mouse control
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e)=>{
  mouseX = (e.clientX - window.innerWidth/2) * 0.002;
  mouseY = (e.clientY - window.innerHeight/2) * 0.002;
});

// ❤️ pulse effect
let scale = 1;
let growing = true;

function animate(){

  requestAnimationFrame(animate);

  // rotation + mouse follow
  heartMesh.rotation.y += 0.01;
  heartMesh.rotation.x += 0.005;

  heartMesh.rotation.y += mouseX * 0.05;
  heartMesh.rotation.x += mouseY * 0.05;

  // ❤️ beating
  if(growing){
    scale += 0.003;
    if(scale > 1.3) growing = false;
  } else {
    scale -= 0.003;
    if(scale < 1) growing = true;
  }

  heartMesh.scale.set(scale, scale, scale);

  renderer.render(scene, camera);
}

animate();