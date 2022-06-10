function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  console.log("this---", this);
  this.x += x;
  this.y += y;
};

function Rectangle() {
  Shape.call(this);
  this.z = 10;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle

var rect = new Rectangle();
rect.move(1, 1);
console.log("x and y", rect.x, rect.y);
console.log(rect);