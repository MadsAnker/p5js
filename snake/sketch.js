const width = 500;
const height = 500;

function Snake() {
	this.size = 20;
	this.length = 1;
	this.x = Math.floor(random(1, width/this.size))*this.size;
	this.y = Math.floor(random(1, height/this.size))*this.size;
	this.xvel = 1;
	this.yvel = 0;
	this.tail = [[this.x, this.y]]
}

Snake.prototype.draw = function() {
	for (var i = 0; i < this.length; i++) {
		fill(100, 255, 0);
		rect(this.tail[i][0], this.tail[i][1], this.size, this.size);
	}
}

Snake.prototype.update = function() {
	var prev = this.tail[0].slice();
	this.tail[0][0] += this.xvel*this.size;
	this.tail[0][1] += this.yvel*this.size;
	for (var i = 1; i < this.tail.length; i++) {
		var temp = this.tail[i].slice();
		this.tail[i] = prev;
		prev = temp;
	}
}

Snake.prototype.add = function() {
	this.tail.push(this.tail[0].slice());
	this.length += 1;
}

Snake.prototype.up = function() {
	if (this.yvel != 1) {
		this.yvel = -1;
		this.xvel = 0;
	}
}

Snake.prototype.down = function() {
	if (this.yvel != -1) {
		this.yvel = 1;
		this.xvel = 0;
	}
}

Snake.prototype.right = function() {
	if (this.xvel != -1) {
		this.yvel = 0;
		this.xvel = 1;
	}
}

Snake.prototype.left = function() {
	if (this.xvel != 1) {
		this.yvel = 0;
		this.xvel = -1;
	}
}

Snake.prototype.insnake = function(point, start = 0) {
	for (var i = start; i < this.length; i++) {
		if (this.tail[i][0] == point[0] && this.tail[i][1] == point[1])
			return true;
	}
	return false;
}

Snake.prototype.selfcollide = function() {
	var head = this.tail[0].slice();
	return this.insnake(head, 1);
}

Snake.prototype.reset = function() {
	this.length = 1;
	this.x = Math.floor(random(1, width/this.size))*this.size;
	this.y = Math.floor(random(1, height/this.size))*this.size;
	this.tail = [[this.x, this.y]];
}

Snake.prototype.foodcollide = function(foodarr) {
	for (var i = 0; i < foodarr.length; i++) {
		if (this.tail[0][0] == foodarr[i][0] && this.tail[0][1] == foodarr[i][1]) {
			this.add();
			foodarr.splice(i, 1);
			return true;
		}
	}
	return false;
}

Snake.prototype.outofbounds = function() {
	return (this.tail[0][0] > width ||
		this.tail[0][1] > height ||
		this.tail[0][0] < 0 ||
		this.tail[0][1] < 0);
}

function spawnFood() {
	var x = Math.floor(random(1, width/s.size))*s.size;
	var y = Math.floor(random(1, height/s.size))*s.size;
	food.push([x,y]);
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		s.up();
	} else if (keyCode == DOWN_ARROW) {
		s.down();
	} else if (keyCode == LEFT_ARROW) {
		s.left();
	} else if (keyCode == RIGHT_ARROW) {
		s.right();
	}
}

function gameover() {
	s.reset();
}

var s;
var food = [];

function setup() {
	createCanvas(width, height);
	frameRate(15);
	s = new Snake();
	spawnFood();
}

function draw() {
	background(0, 200, 100);
	fill(255, 0, 0);
	for (var i = 0; i < food.length; i++) {
		rect(food[i][0],food[i][1], s.size, s.size);
	}
	s.draw();
	s.update();
	if (s.selfcollide())
		gameover();
	if (s.foodcollide(food)) {
		spawnFood();
	}
	if (s.outofbounds()) {
		gameover();
	}
}
