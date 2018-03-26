System.register("shape", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Circle, Rectangle;
    return {
        setters: [],
        execute: function () {
            Circle = /** @class */ (function () {
                function Circle(x, y, radius, color, lineWidth) {
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
                    this.draw = function (ctx) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.strokeStyle = _this.color;
                        ctx.lineWidth = _this.lineWidth;
                        ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.restore();
                    };
                }
                return Circle;
            }());
            exports_1("Circle", Circle);
            Rectangle = /** @class */ (function () {
                function Rectangle(x, y, width, height, color, lineWidth) {
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
                    this.draw = function (ctx) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.strokeStyle = _this.color;
                        ctx.lineWidth = _this.lineWidth;
                        ctx.rect(_this.x, _this.y, _this.width, _this.height);
                        ctx.stroke();
                        ctx.restore();
                    };
                }
                return Rectangle;
            }());
            exports_1("Rectangle", Rectangle);
        }
    };
});
System.register("app", ["shape"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Shape, canvas, ctx, CANVAS_WIDTH, CANVAS_HEIGHT, circle1, circle2, gameLoop;
    return {
        setters: [
            function (Shape_1) {
                Shape = Shape_1;
            }
        ],
        execute: function () {
            CANVAS_WIDTH = 1280;
            CANVAS_HEIGHT = 720;
            circle1 = new Shape.Circle(200, 300, 50);
            circle2 = new Shape.Circle(400, 550, 150, 'blue', 5);
            gameLoop = function () {
                requestAnimationFrame(gameLoop);
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                if (circle1.x++ >= (CANVAS_WIDTH + circle1.radius)) {
                    circle1.x = -circle1.radius;
                }
                if (circle2.y++ >= (CANVAS_HEIGHT + circle2.radius)) {
                    circle2.y = -circle2.radius;
                }
                circle1.draw(ctx);
                circle2.draw(ctx);
            };
            window.onload = function () {
                canvas = document.getElementById('cnvs');
                ctx = canvas.getContext('2d');
                gameLoop();
            };
        }
    };
});
//# sourceMappingURL=bundle.js.map