var canvas;
var ctx;
var gameLoop = function () {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1280, 720);
};
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext('2d');
    gameLoop();
};
//# sourceMappingURL=app.js.map