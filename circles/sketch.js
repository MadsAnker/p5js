const width = 1500;
const height = 800;
const fps = 200;

function cir(r, spinrate) {
	this.x = 0;
	this.y = 0;
	this.radius = r;
	this.spinrate = spinrate;
	this.angle = 0;
}

cir.prototype.spinx = function() {
	return this.x+cos(this.angle)*this.radius;
}

cir.prototype.spiny = function() {
	return this.y+sin(this.angle)*this.radius;
}

cir.prototype.draw = function() {
	noFill();
	circle(this.x, this.y, 2*this.radius);
	line(this.x, this.y, this.spinx(), this.spiny());
}

cir.prototype.update = function() {
	this.angle += (this.spinrate*TWO_PI)/fps;
}


var circles = [];
var points = [];

function setup() {
	createCanvas(width, height);
	frameRate(fps);
	circles.push(new cir(200, 1));
	circles[0].x = 300;
	circles[0].y = height/2;
	for (var i = 2; i < 10; i++) {
		circles.push(new cir(200/((2*i)-1), (2*i)-1));
	}
}

function draw() {
	background(150, 250, 100);

	for (var i = 1; i < circles.length; i++) {
		circles[i].x = circles[i-1].spinx();
		circles[i].y = circles[i-1].spiny();
	}

	var finalx = circles[circles.length-1].spinx();
	var finaly = circles[circles.length-1].spiny();

	line(finalx, finaly, 700, finaly);
	points.push([700, finaly]);

	strokeWeight(2);
	for (var i = points.length-2; i > -1; i--) {
		var offset = points.length-i;
		line(points[i][0]+offset, points[i][1], points[i+1][0]+offset-1, points[i+1][1]);
	}

	for (var i = 0, len = circles.length; i < len; i++) {

		circles[i].draw();
	}

	for (var i = 0, len = circles.length; i < len; i++) {
		circles[i].update();
	}

}

