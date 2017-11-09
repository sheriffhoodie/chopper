document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  const game = {
  	 startX: Math.floor(Math.random() * canvas.clientWidth),
  	 startY: Math.floor(Math.random() * canvas.clientHeight),
  	 ctx,
  	 draw: function() {
  	   this.ctx.fillRect(this.startX, this.startY, 10, 10);
  	 }
   };

    function step() {
  	 game.draw();
  	 requestAnimationFrame(step);
         }

  document.addEventListener('keydown', (event) => {
     game.ctx.fillStyle = randColor();
    switch (event.key) {
      case "w":
        game.startY -= 2;
        break;
      case "a":
        game.startX -= 2;
        break;
      case "s":
        game.startY += 2;
        break;
      case "d":
        game.startX += 2;
        break;
      default:
        console.log("not a valid key, bro");
    }
  });
  step();
});
function randColor() {
     return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
   }
