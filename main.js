function setup() {
  canvas = createCanvas(350, 350);
  canvas.position(700, 400);
  video = createCapture(VIDEO);
  video.hide();
  
  classifier = ml5.imageClassifier("MobileNet", modelloaded);
}

function draw(){
  image(video, 0, 0, 350, 350);
  classifier.classify(video, Gotresults);
}

function modelloaded(){
  console.log("Model has been loaded");
}

Previous_result = "";
function Gotresults(error, results){
if(error){
  console.error(error);
}
else{
  if((results[0].confidence>0.5)&& (Previous_result!=results[0].label)){
    console.log(results);
    Previous_result = results[0].label;
    document.getElementById("Resultsobject").innerHTML = results[0].label;
    document.getElementById("Resultsaccuracy").innerHTML = results[0].confidence.toFixed(3);
  
    var Speech = window.speechSynthesis;
    speck_data = "Object detected is " + results[0].label;
    var SayThis = new SpeechSynthesisUtterance(speck_data);
    Speech.speak(SayThis);
  
  }
  
}

}

