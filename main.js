video = "";
object = [];

function preload(){
video = createVideo("video.mp4");
video.hide();
}

function setup(){
canvas = createCanvas(480,380);
canvas.center();
}

function draw(){
image(video,0,0,480,380);

if (status!=""){
    objectDetector.detect(video,gotresults);
    for (i=0; i<object.length; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected!";
        document.getElementById("object").innerHTML = "Number of objects are :"+object.length;

        fill("orange");
        
        accuracy = floor(object[i].confidence*100);
        
        text(object[i].label + " " +accuracy + "%", object[i].x+15, object[i].y+15 );
        nofill();
        stroke("red");
        rect(object[i].x,object[i].y,object[i].width,object[i].height);


    }
}
}

function start(){
    object_detector = ml5.objectDetector("Cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status- Detecting object..."
}

function modelloaded(){
    console.log("Model Loaded!")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function gotresults(error,results){
    if (error){
 console.log(error)
    }
   console.log(results);
   object = results;

}
