var canvas;
var ctx;
var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 720;
var cCircle = /** @class */ (function () {
    function cCircle(x, y, radius, color, lineWidth) {
        if (color === void 0) { color = 'red'; }
        if (lineWidth === void 0) { lineWidth = 2; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.radius = 10;
        this.lineWidth = 2;
        this.color = 'red';
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    return cCircle;
}());
var circle1 = new cCircle(200, 300, 50);
var circle2 = new cCircle(400, 550, 150, 'blue', 5);
var gameLoop = function () {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (circle1.x++ >= (CANVAS_WIDTH + circle1.radius)) {
        circle1.x = -circle1.radius;
    }
    if (circle2.y++ >= (CANVAS_HEIGHT + circle2.radius)) {
        circle2.y = -circle2.radius;
    }
    circle1.draw();
    circle2.draw();
};
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext('2d');
    gameLoop();
};
//# sourceMappingURL=app.js.map