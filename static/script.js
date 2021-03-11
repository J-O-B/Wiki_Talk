$(document).ready(function(){
    if ($('.content').text() != 0){
        $('#play').trigger('click');
    }
})

const btn = $('.talk');
const content = $('.content').text();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function(){
    console.log("Listening");
}

recognition.onresult = function(event){
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    $('.inputVoice').text(transcript);
    $('#query').val(transcript);
    $('#serSub').val(1);
    $('#serSub').trigger('click');
}

$('.talk').click(function(){
    recognition.start();
})

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.pitch = 0.8;
    speech.rate = 1.3;
    window.speechSynthesis.speak(speech);
    console.log("speaking");
}

$('#play').click(function(event){
    event.preventDefault();
    pause();
    let readIt = $('.content').text();
    readOutLoud(readIt);
});

function pause(){
    window.speechSynthesis.cancel();
}