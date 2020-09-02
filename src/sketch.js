var capture;

var options = 
{
    canvasWidth: 480,
    canvasHeight: 272
}

function setup() {
  createCanvas(options.canvasWidth, options.canvasHeight);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, options.canvasWidth, options.canvasHeight);

  filter(GRAY);
}