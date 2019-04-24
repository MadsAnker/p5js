const width = 500;
const height = 500;
const linecnt = 100;
function Line(x, y, string, vel) {
	this.vel = vel;
	this.x = x;
	this.y = y;
	this.string = string;
}

Line.prototype.update = function() {
	this.y += this.vel;	
}

Line.prototype.draw = function() {
	text(this.string, this.x, this.y);
}

function getRandom01(length) {
	string = "";
	for (var i = 0; i < length; i++) {
		string += random([0, 1]);
		string += '\n';
	}
	return string;
}

lines = [];

function setup() {
	createCanvas(width, height);
	background(0);
	var x = 0;
	for (var i = 0; i < linecnt; i++) {
		x += random(1, (width/linecnt)*2);
		y  = random(-1000, -900); 
		var vel = random(0.01, 2);
		lines.push(new Line(x, y, getRandom01(100), vel));
	}
}

function draw() {
	background(0)
	for (var i = 0; i < lines.length; i++) {
		fill(0, 255, 0);
		lines[i].draw();
		lines[i].update();
	}
}
