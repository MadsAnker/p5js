var ll = 200;
var numRange = 1000;
var drawList;
var waitTime = 1;
var osc = new p5.TriOsc();

function setTime(time) {
	document.getElementById('vid').currentTime = time;
}


async function merge(arr, start, middle, end) {
	var ll = middle-start;
	var rl = end-middle;

	var l = [];
	var r = [];
	for (var i = 0; i < ll; i++) {
		l[i] = arr[start+i];
	}
	for (var i = 0; i < rl; i++) {
		r[i] = arr[middle+i];
	}

	var put = start;
	var lindex = 0;
	var rindex = 0;

	while (lindex < ll && rindex < rl) {
		if (r[rindex] < l[lindex]) {
			arr[put] = r[rindex];
			rindex++;
		} else {
			arr[put] = l[lindex];
			lindex++;
		}
		setTime(map(arr[put], 0, numRange, 0, 200));
		put++;
		await sleep(waitTime);
	}

	if (rindex < rl) {
		for (; rindex < rl; rindex++) {
			arr[put] = r[rindex];
			setTime(map(arr[put], 0, numRange, 0, 200));
			put++;
			await sleep(waitTime);
		}
	} else {
		for (; lindex < ll; lindex++) {
			arr[put] = l[lindex];
			setTime(map(arr[put], 0, numRange, 0, 200));
			put++;
			await sleep(waitTime);
		}
	}
}

async function mergeSort(arr, start, end) {
	if (end-start < 2)
		return;

	var middle = Math.floor((start+end)/2);
	
	
	await mergeSort(arr, start, middle);
	await mergeSort(arr, middle, end);

	await merge(arr, start, middle, end);
}

function setup() {
	drawList = Array(ll);
	createCanvas(1600, 900);
	frameRate(30);
	stroke(255);
	for (var i = 0; i < ll; i++) {
		drawList[i] = int(random(1, numRange));
	}
	osc.start();
	mergeSort(drawList, 0, drawList.length).then();
}

function draw() {
	background(255);
	strokeWeight(0);
	from = color(255, 0, 0);
	to = color(0, 0, 255);
	for (var i = 0; i < ll; i++) {
		var h = drawList[i]*height/numRange;
		fill(lerpColor(from,to,h/height));
		rect(width/ll*i, height-h, width/ll, h);
	}
}

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}
