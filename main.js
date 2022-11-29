NoseX = 0;
NoseY = 0;
diff = 0;
rightwristx = 0;
leftwristx = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(650, 650);
    canvas = createCanvas(750, 550);
    canvas.position(660, 120);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('posenet is intialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;
        console.log(NoseX, NoseY);
        leftwristx = results[0].pose.leftWrist.x;
        rightwristx = results[0].pose.rightWrist.x;
        diff = floor(leftwristx - rightwristx);
        console.log(leftwristx, rightwristx, diff);
    }
}


function draw() {
    background('#808080');
    document.getElementById("square_side").innerHTML = "Width and height of the square will be " + diff + " px";
    fill("pink");
    stroke("pink");
    square(NoseX, NoseY, diff);
}