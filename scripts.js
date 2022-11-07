const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const points = [];
const hearts = [];
const fps = 60;
const nextFrame = 1000 / fps;

canvas.width = 375;
canvas.height = 700;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let time = 0;
let count = 1;
let past = 0;

//

class Heart {
  constructor(x, y, size) {
    this.x = x + Math.random() * 5 - 2.5;
    this.y = y + Math.random() * 5 - 2.5;
    this.size = size + Math.random() * 2 - 1;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
    this.opaciy = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opaciy -= 0.01;
  }
  draw() {
    drawHeart(this.x, this.y, this.size);
  }
}

function drawHeart(x, y, size) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + size, y - size, x + 2 * size, y);
  ctx.quadraticCurveTo(x + 3 * size, y - size, x + 4 * size, y);
  ctx.quadraticCurveTo(x + 5 * size, y + size, x + 3 * size, y + 3 * size);
  ctx.quadraticCurveTo(x + 2 * size, y + 4 * size, x + 2 * size, y + 4 * size);
  ctx.quadraticCurveTo(
    x + 2 * size,
    y + 4.2 * size,
    x + 2 * size,
    y + 4 * size
  );
  ctx.quadraticCurveTo(x - size, y + size, x, y);
  ctx.fill();
}

function getY(t) {
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t) +
    20;
  return y;
}

function getX(t) {
  return 16 * Math.sin(t) * Math.sin(t) * Math.sin(t) + 25;
}

function init() {
  for (let t = 0; t <= 500; t += 1) {
    points.push({ x: getX(t) * 10 - 70, y: -getY(t) * 10 + HEIGHT * 0.75 });
  }
  points.forEach((point) => {
    hearts.push(new Heart(point.x, point.y, 2));
  });
}

function goBack() {
  for (let i = 0; i < points.length; i++) {
    const dx = points[i].x - hearts[i].x;
    const dy = points[i].y - hearts[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance >= 10) {
      hearts[i].x = points[i].x + Math.random() * 5 - 2.5;
      hearts[i].y = points[i].y + Math.random() * 5 - 2.5;
      hearts[i].opaciy = Math.random();
    }
  }
}

function animate(now) {
  const dt = now - past;
  past = now;
  if (time > nextFrame) {
    if (count > 50) {
      goBack();
      count = 0;
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    hearts.forEach((heart) => {
      ctx.fillStyle = `rgba(235, 5, 58, ${heart.opaciy})`;
      heart.update();
      heart.draw();
    });
    time = 0;
  } else {
    time += dt;
    count++;
  }
  requestAnimationFrame(animate);
}

init();
animate(0);
