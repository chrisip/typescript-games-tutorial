System.register("canvas", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WIDTH, HEIGHT;
    return {
        setters: [],
        execute: function () {
            exports_1("WIDTH", WIDTH = 1280);
            exports_1("HEIGHT", HEIGHT = 720);
        }
    };
});
System.register("shape", ["canvas"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Canvas, Circle, Rectangle, Point, Asteroid;
    return {
        setters: [
            function (Canvas_1) {
                Canvas = Canvas_1;
            }
        ],
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
            exports_2("Circle", Circle);
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
            exports_2("Rectangle", Rectangle);
            Point = /** @class */ (function () {
                function Point(x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this.x = x;
                    this.y = y;
                }
                return Point;
            }());
            exports_2("Point", Point);
            Asteroid = /** @class */ (function () {
                function Asteroid(x, y, size, color, lineWidth) {
                    if (x === void 0) { x = undefined; }
                    if (y === void 0) { y = undefined; }
                    if (color === void 0) { color = 'white'; }
                    if (lineWidth === void 0) { lineWidth = 2; }
                    var _this = this;
                    this.x = x;
                    this.y = y;
                    this.size = size;
                    this.color = color;
                    this.lineWidth = lineWidth;
                    this.velocityX = 0;
                    this.velocityY = 0;
                    this.rotation = 0;
                    this.rotationSpeed = 0;
                    this.pointList = new Array();
                    this.draw = function (ctx) {
                        _this.x += _this.velocityX;
                        _this.y += _this.velocityY;
                        if (_this.x < -_this.size * 2) {
                            _this.x = Canvas.WIDTH + _this.size * 2;
                        }
                        else if (_this.x > Canvas.WIDTH + _this.size * 2) {
                            _this.x = -2 * _this.size;
                        }
                        if (_this.y < -_this.size * 2) {
                            _this.y = Canvas.HEIGHT + _this.size * 2;
                        }
                        else if (_this.y > Canvas.HEIGHT + _this.size * 2) {
                            _this.y = -2 * _this.size;
                        }
                        _this.rotation += _this.rotationSpeed;
                        ctx.save();
                        ctx.translate(_this.x, _this.y);
                        ctx.rotate(_this.rotation);
                        ctx.beginPath();
                        ctx.strokeStyle = _this.color;
                        ctx.lineWidth = _this.lineWidth;
                        ctx.moveTo(_this.pointList[_this.pointList.length - 1].x, _this.pointList[_this.pointList.length - 1].y);
                        for (var i = 0; i < _this.pointList.length; i++) {
                            ctx.lineTo(_this.pointList[i].x, _this.pointList[i].y);
                        }
                        ctx.closePath();
                        ctx.stroke();
                        ctx.restore();
                    };
                    if (!x) {
                        this.x = Math.round(Math.random() * Canvas.WIDTH);
                    }
                    if (!y) {
                        this.y = Math.round(Math.random() * Canvas.HEIGHT);
                    }
                    if (!size) {
                        this.size = Math.ceil(Math.random() * 10) + 4;
                    }
                    this.velocityX = Math.round(Math.random() * 4 - 2);
                    this.velocityY = Math.round(Math.random() * 4 - 2);
                    this.rotationSpeed = Math.random() * 0.06 - 0.03;
                    var xRand = 0;
                    var yRand = 0;
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand, yRand + 3 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand - 1 * this.size, yRand + 2 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand - 2 * this.size, yRand + 2 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand - 3 * this.size, yRand + this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand - 4 * this.size, yRand));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand - 1 * this.size, yRand - 3 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand + 2 * this.size, yRand - 4 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand + 2 * this.size, yRand - 3 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand + 4 * this.size, yRand - 2 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand + 4 * this.size, yRand + this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                    this.pointList.push(new Point(xRand + 3 * this.size, yRand + 2 * this.size));
                    xRand = Math.round(Math.random() * this.size - this.size / 2);
                    yRand = Math.round(Math.random() * this.size - this.size / 2);
                }
                return Asteroid;
            }());
            exports_2("Asteroid", Asteroid);
        }
    };
});
System.register("app", ["canvas", "shape"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Canvas, Shape, canvas, ctx, circle1, circle2, gameLoop, shapeList;
    return {
        setters: [
            function (Canvas_2) {
                Canvas = Canvas_2;
            },
            function (Shape_1) {
                Shape = Shape_1;
            }
        ],
        execute: function () {
            circle1 = new Shape.Circle(200, 300, 50);
            circle2 = new Shape.Circle(400, 550, 150, 'blue', 5);
            gameLoop = function () {
                requestAnimationFrame(gameLoop);
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
                shapeList.forEach(function (shape) {
                    shape.draw(ctx);
                });
            };
            shapeList = new Array();
            window.onload = function () {
                canvas = document.getElementById('cnvs');
                shapeList.push(new Shape.Asteroid());
                shapeList.push(new Shape.Asteroid());
                shapeList.push(new Shape.Asteroid());
                shapeList.push(new Shape.Asteroid());
                shapeList.push(new Shape.Asteroid());
                shapeList.push(new Shape.Circle(20, 50, 30));
                shapeList.push(new Shape.Circle(120, 70, 50));
                shapeList.push(new Shape.Rectangle(500, 500, 80, 60));
                ctx = canvas.getContext('2d');
                gameLoop();
            };
        }
    };
});
//# sourceMappingURL=bundle.js.map