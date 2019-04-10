// Scaled values recieved from the RPI
const tempVal = 0.5;
const humidityVal = 0.5;
const lightVal = 0.5;
const movementVal = 0.5;

// References various parts of the html
// This first one gets the value of the slider
var tempoSlider = document.getElementById("tempo");
// This prints the value of the slider out
var tempoOutput = document.getElementById("tempoValue");

// Some declarations of variables
// This is the loop used for the undertone white noise
let temperatureLoop;
// This is the synth used currently, we'll add more here for each input
let tempSynth;

// Whether or not there should be any rhythm
let hasRhythm;
// A boolean variable used to tell us when to run the setup function so it is only run once
var hasStarted = false;

// This value determines the frequency
var tempFrequency;

// Setupt
function setup() {
  // Setup synth
  tempSynth = new Tone.Synth();
  tempSynth.toMaster();

  // Print the value of the slider
  tempoOutput.innerHTML = tempoSlider.value;
  tempFrequency = 100;

  // initializes the hasRhythm variable to the value of the checkbox
  hasRhythm = true;

  // Initialize the loop
  temperatureLoop = new Tone.Loop(song, "4n");
  Tone.Transport.start();
}

// This determines the rhythm
function song(time) {
  tempSynth.triggerAttackRelease(tempFrequency, "1n");
}

// Prints out the value of the slider
tempoSlider.oninput = function() {
  tempoOutput.innerHTML = this.value;
  s = "" + this.value + "n";
  temperatureLoop.interval = s;
};

// This stops all the audio output
function pause() {
  temperatureLoop.stop();
  tempSynth.triggerRelease();
  document.getElementById("rhythm").disabled = true;
}

// This plays all the audio output
function play() {
  if (!hasStarted) {
    setup();
    hasStarted = true;
  }
  if (hasRhythm) {
    temperatureLoop.start();
  } else {
    tempSynth.triggerAttack(tempFrequency, "8n");
  }
  document.getElementById("rhythm").disabled = false;
}

// This toggles the rhythm aspect
function rhythm() {
  // If rhythm is false, set it to true
  // and the bpm equal to the value of the slider
  // If it is true, set it to false
  if (hasRhythm) {
    temperatureLoop.stop();
    tempSynth.triggerAttack(tempFrequency, "8n");
    hasRhythm = false;
  } else {
    tempSynth.triggerRelease();
    temperatureLoop.start();
    hasRhythm = true;
  }
}

// This adds the sound gotten from the light value
function light() {
  // play a sound dependent on the input light value
}

// This adds the sound gotten from the humidity values
function humidity() {
  // play a sound dependent on the input humidity
}

// This adds the sound gotten from the motion values
function motion() {
  // play a sound dependent on the motion inputs
}
