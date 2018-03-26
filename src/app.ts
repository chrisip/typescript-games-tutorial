let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 1280, 720);
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  ctx = canvas.getContext('2d');
  gameLoop();
}