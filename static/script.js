const btn = $('.talk');
const content = $('.content').text().toString();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function(){
    console.log("Listening");
}

recognition.onresult = function(event){
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    $('#query').val(transcript);
    $('#serSub').val(1);
    $('#serSub').trigger('click');
}

$('.talk').click(function(){
    recognition.start();
})


if (content.length > 0){
    readOutLoud(content);
}
function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    window.speechSynthesis.speak(speech);
}