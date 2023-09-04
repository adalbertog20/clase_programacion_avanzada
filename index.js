const canv = document.getElementById("canv");
const ctx = canv.getContext("2d");
let color, dir = 0, speed = 10, counter = 0;

class Rectangle {
  constructor(height, width, x, y, color) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  colision(t) {
    if (
      this.x < t.x + t.width &&
      this.x + this.width > t.x &&
      this.y < t.y + t.height &&
      this.y + this.height > t.y
    ) {
      counter++;
      return true;
    }
    return false;
  }
  paint(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.strokeRect(this.x, this.y, this.height, this.width);
  }
}

let walls = [];
const player = new Rectangle(50, 50, 300, 250, "black");
const t = new Rectangle(50, 50, 350, 350,  "black");
walls.push(new Rectangle(50, 50, 100, 100, "gray"));
walls.push(new Rectangle(50, 50, 150, 100, "gray"));
walls.push(new Rectangle(50, 50, 200, 100, "gray"));
walls.push(new Rectangle(50, 50, 200, 300, "gray"));

document.addEventListener("keydown", (e) => {
  color = random_rgba();
  switch (e.keyCode) {
    case 87:
      dir = 1;
      break;
    case 65:
      dir = 2;
      break;
    case 83:
      dir = 3;
      break;
    case 68:
      dir = 4;
      break;
  }
});
function update() {
  switch (dir) {
    case 1:
      player.y -= speed;
      if (player.y < -50) player.y = 600;
      break;
    case 2:
      player.x -= speed;
      if (player.x < -50) player.x = 600;
      break;
    case 3:
      player.y += speed;
      if (player.y > 600) player.y = 0;
      break;
    case 4:
      player.x += speed;
      if (player.x > 600) player.x = 0;
      break;
  }
  if (player.colision(t)) {
    t.x = Math.random() * 560;
    t.y = Math.random() * 560;
    speed += 1;
  }
  for(const wall of walls) {
    if (wall.colision(player)) {
      switch (dir) {
        case 1:
          player.y += speed;
          break;
        case 2:
          player.x += speed;
          break;
        case 3:
          player.y -= speed;
          break;
        case 4:
          player.x -= speed;
          break;
      }
    }
  }

  repaint();
  console.log(counter);
  window.requestAnimationFrame(update);
}

function repaint() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 600, 600);
  ctx.beginPath();
  player.color = random_rgba();
  player.paint(ctx);
  t.paint(ctx);
  for (const wall of walls) {
    wall.paint(ctx);
  }
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," +
    r().toFixed(1) + ")";
}
window.requestAnimationFrame = function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 17);
    };
}();
window.requestAnimationFrame(update);
