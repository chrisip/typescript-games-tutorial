var canvas;
var ctx;
var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 720;
var cCircle = /** @class */ (function () {
    function cCircle(x, y, radius, color, lineWidth) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (radius === void 0) { radius = 10; }
        if (color === void 0) { color = 'red'; }
        if (lineWidth === void 0) { lineWidth = 2; }
        var _this = this;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        };
    }
    return cCircle;
}());
var cRectangle = /** @class */ (function () {
    function cRectangle(x, y, width, height, color, lineWidth) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (color === void 0) { color = 'blue'; }
        if (lineWidth === void 0) { lineWidth = 2; }
        var _this = this;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.rect(_this.x, _this.y, _this.width, _this.height);
            ctx.stroke();
            ctx.restore();
        };
    }
    return cRectangle;
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