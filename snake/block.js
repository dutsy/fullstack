/*
use
let sampleBlock = new Block(5, 5);

var sampleBlock = new Block(3, 4);
sampleBlock.drawSquare("LightBlue");


var apple = new Block(2, 5);
var head = new Block(3, 5);
head.equal(apple);
false

head = new Block(2, 5);
head.equal(apple);
true
*/

// constructore
var Block = function (col, row) {
    this.col = col;
    this.row = row;
};

// methods
Block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};