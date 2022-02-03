var points = [];
var mult = 0.001;
var col = { r1: 0, r2: 0, g1: 0, g2: 0, b1: 0, b2: 0 };

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  angleMode(DEGREES);
  noiseDetail(1);
  var density = 50;
  var space = width / density;
  console.log(space);
  for (var i = 0; i < width; i += space) {
    for (var j = 0; j < height; j += space) {
      var p = createVector(i + random(-10, 10), j + random(-10, 10));
      console.log(p);
      points.push(p);
    }
  }
  shuffle(points, true);
  col.b1 = random(255);
  col.b2 = random(255);
  col.r1 = random(255);
  col.r2 = random(255);
  col.g1 = random(255);
  col.g2 = random(255);
  mult = random(0.002, 0.01);
}

function draw() {
  noStroke();
  var max;
  frameCount * 2 <= points.length
    ? (max = frameCount * 2)
    : (max = points.length);
  for (var k = 0; k < max; k++) {
    var r = map(points[k].x, 0, width, col.r1, col.r2);
    var g = map(points[k].y, 0, width, col.g1, col.g2);
    var b = map(points[k].x, 0, width, col.b1, col.b2);
    var alpha = map(
      dist(width / 2, height / 2, points[k].x, points[k].y),
      0,
      200,
      255,
      0
    );
    fill(r, g, b);
    var angle = map(
      noise(points[k].x * mult, points[k].y * mult),
      0,
      1,
      0,
      720
    );

    points[k].add(createVector(cos(angle), sin(angle)));

    // to limit the pattern in a circle
    // if (dist(width / 2, height / 2, points[k].x, points[k].y) < 250) {
    ellipse(points[k].x, points[k].y, 1);
    // }
  }
  if (frameCount > 5000) noLoop();
}

function mouseClicked() {
  saveCanvas('flowfeild-' + frameCount, 'png');
}
