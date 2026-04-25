const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function heart(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t) - 5 * Math.cos(2*t)
        - 2 * Math.cos(3*t) - Math.cos(4*t);
  return {x, y};
}

function createParticles() {
  for (let i = 0; i < 1500; i++) {
    let t = Math.random() * Math.PI * 2;
    let pos = heart(t);

    particles.push({
      x: canvas.width/2 + pos.x * 15,
      y: canvas.height/2 - pos.y * 15,
      size: Math.random() * 2,
      alpha: Math.random(),
      speed: Math.random() * 0.02
    });
  }
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.alpha += p.speed;
    if (p.alpha > 1) p.alpha = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,0,150,${p.alpha})`;
    ctx.fill();

ctx.font = "30px Arial";
ctx.fillStyle = "#ff5fd8";
ctx.textAlign = "center";
 
ctx.fillText("Saidxonova Dinora", canvas.width/2, canvas.height/2)


  });

  requestAnimationFrame(draw);
}

createParticles();
draw();