let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/oDDfZIcbh/';

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(100);
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is train
  let emoji = "-";
  if (label == "ambulance") {
    emoji = "🚑";
  } else if (label == "fire_truck") {
    emoji = "🚒";
  } else if (label == "human") {
    emoji = "👨👱‍♀️";
  } else if (label == "other_vehicles") {
    emoji = "🚗🚕🛺";
  }

  // Draw the emoji
  textSize(100);
  text(emoji, width/2 , height/4);
}

// STEP 3: Get the classification!
function gotResults(error, results) 
{
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}


