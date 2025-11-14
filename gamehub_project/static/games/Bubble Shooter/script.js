const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;

const bubbleRadius = 15;
let bubbles = [];
let shooter = { x: canvas.width / 2, y: canvas.height - 30, angle: 0 };
let shootingBubble = null;
let colors = ["#ff8af5", "#8ec5fc", "#a7ff83", "#f9ed69", "#ff9a8b"];
let isShooting = false;

function initBubbles() {
  bubbles = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 10; col++) {
      let x = col * bubbleRadius * 2 + bubbleRadius;
      let y = row * bubbleRadius * 2 + bubbleRadius;
      bubbles.push({
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }
}

function drawBubbles() {
  bubbles.forEach((b) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, bubbleRadius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
    ctx.closePath();
  });
}

function drawShooter() {
  ctx.beginPath();
  ctx.moveTo(shooter.x, shooter.y);
  ctx.lineTo(
    shooter.x + 30 * Math.cos(shooter.angle),
    shooter.y + 30 * Math.sin(shooter.angle)
  );
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(shooter.x, shooter.y, bubbleRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff8af5";
  ctx.fill();
  ctx.closePath();
}

function shootBubble() {
  if (isShooting) return;
  isShooting = true;
  shootingBubble = {
    x: shooter.x,
    y: shooter.y,
    dx: 5 * Math.cos(shooter.angle),
    dy: 5 * Math.sin(shooter.angle),
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBubbles();
  drawShooter();

  if (shootingBubble) {
    shootingBubble.x += shootingBubble.dx;
    shootingBubble.y += shootingBubble.dy;

    if (
      shootingBubble.x - bubbleRadius < 0 ||
      shootingBubble.x + bubbleRadius > canvas.width
    ) {
      shootingBubble.dx *= -1;
    }

    if (shootingBubble.y - bubbleRadius < 0) {
      isShooting = false;
      shootingBubble = null;
    }

    ctx.beginPath();
    ctx.arc(
      shootingBubble.x,
      shootingBubble.y,
      bubbleRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = shootingBubble.color;
    ctx.fill();
    ctx.closePath();

    // Collision with top bubbles
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      const dx = shootingBubble.x - b.x;
      const dy = shootingBubble.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < bubbleRadius * 2) {
        bubbles.push({
          x: shootingBubble.x,
          y: shootingBubble.y,
          color: shootingBubble.color,
        });
        shootingBubble = null;
        isShooting = false;
        break;
      }
    }
  }

  requestAnimationFrame(update);
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  shooter.angle = Math.atan2(mouseY - shooter.y, mouseX - shooter.x);
});

canvas.addEventListener("click", shootBubble);

document.getElementById("restartBtn").addEventListener("click", () => {
  initBubbles();
  isShooting = false;
  shootingBubble = null;
});

initBubbles();
update();
