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

const player = new Rectangle(50, 50, 300, 250, "black");
const t = new Rectangle(40, 40, 350, 350, "black");

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
      //y -= 10;
      if (player.y < -50) player.y = 600;
      break;
    case 2:
      player.x -= 10;
      if (player.x < -50) player.x = 600;
      break;
    case 3:
      player.y += 10;
      if (player.y > 600) player.y = 0;
      break;
    case 4:
      player.x += 10;
      if (player.x > 600) player.x = 0;
      break;
  }
  if (player.colision(t)) {
    t.x = Math.random() * 500;
    t.y = Math.random() * 500;
    speed += 0;
  }
  repaint();
  console.log(counter);
  window.requestAnimationFrame(update);

  function repaint() {
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, 600, 600);
    ctx.beginPath();
    player.color = random_rgba();
    player.paint(ctx);
    t.paint(ctx);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
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