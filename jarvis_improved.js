// Mini Jarvis Logic

const input = document.getElementById('commandInput');
const askBtn = document.getElementById('askBtn');
const responseDiv = document.getElementById('response');
const voiceBtn = document.getElementById('voiceBtn');

// Text-to-speech function
function speak(text){
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
}

// Command logic
function handleCommand(cmd){
    cmd = cmd.toLowerCase();
    let answer = "I didn't understand that, sir.";

    if(cmd.includes("hello") || cmd.includes("hi")){
        answer = "Hello! How can I help you today?";
    }
    else if(cmd.includes("time")){
        const now = new Date();
        answer = `The time is ${now.getHours()}:${now.getMinutes()}`;
    }
    else if(cmd.includes("date")){
        const today = new Date();
        answer = `Today is ${today.toDateString()}`;
    }
    else if(cmd.includes("your name")){
        answer = "I am your mini Jarvis assistant.";
    }
    else if(cmd.includes("open google")){
        window.open("https://www.google.com","_blank");
        answer = "Opening Google for you.";
    }
    else if(cmd.includes("open youtube")){
        window.open("https://www.youtube.com","_blank");
        answer = "Opening YouTube for you.";
    }

    responseDiv.innerText = answer;
    speak(answer);
}

// Button click
askBtn.addEventListener("click", ()=>{
    const cmd = input.value;
    if(cmd) handleCommand(cmd);
    input.value = "";
});

// Voice recognition (basic)
voiceBtn.addEventListener("click", ()=>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){
        alert("Speech Recognition not supported in this browser.");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event){
        const speechResult = event.results[0][0].transcript;
        input.value = speechResult;
        handleCommand(speechResult);
    }

    recognition.onerror = function(event){
        console.error(event.error);
    }
});
