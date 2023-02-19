gestures = "";
tospeak = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format : 'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach( '#camera' );
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/40Ujcvvib/model.json',modelLoaded);
function modelLoaded()
{
    console.log("Model is loaded!")
}
function check()
{
    img = document.getElementById('capture_img');
    classifier.classify(img, gotResult);
}
function gotResult(error, results)
{
if(error)
{
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label;
gestures = results[0].label;
if(gestures == "amazing")
{
tospeak = "it looks amazing";
document.getElementById("update_emoji").innerHTML = "&#128076;";
}
else if(gestures == "best")
{
    tospeak = "all the best";
    document.getElementById("update_emoji").innerHTML = "&#128077;";
}
else if(gestures == "victory")
{
    tospeak = "that was a marvelous victory";
    document.getElementById("update_emoji").innerHTML = "&#9996;";
}
speak();
}
}
function speak()
{
    var synth = window.speakSynthesis;
    speak_data = tospeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


