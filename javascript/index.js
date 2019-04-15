// Scaled values recieved from the RPI
const tempVal = 0.5;
const humidityVal = 0.5;
const lightVal = 0.5;
const movementVal = 0.5;

// References the Octave value
var octaveSlider = document.getElementById("octaveSlider");
var octaveOutput = document.getElementById("octaveValue");

// Some declarations of variables
// This is the loop used for the undertone white noise
let rhythm;
// This is the synth used currently, we'll add more here for each input
let tempSynth;
// bass synth
let bassSynth;

// Whether or not there should be any rhythm
let hasRhythm;
// A boolean variable used to tell us when to run the setup function so it is only run once
var hasStarted = false;
// This is a function called by Tone.Sequence that simply plays a series of notes
var baseLine;
//
baseLineNotes = [
  // A minor chord
  "a" + 1,
  "c" + 2,
  "e" + 2,
  ["d" + 2, "c" + 2],
  "a" + 1,
  "c" + 2,
  "e" + 2,
  "c" + 2,
  // f major chord
  "a" + 1,
  "c" + 2,
  "f" + 2,
  ["e" + 2, "c" + 2],
  "a" + 1,
  "c" + 2,
  "f" + 2,
  null,
  // c major chord
  "g" + 1,
  "c" + 2,
  "e" + 2,
  [null, "c" + 2],
  "g" + 1,
  "c" + 2,
  "e" + 2,
  "c" + 2,
  // g major chord
  "g" + 1,
  "b" + 1,
  "d" + 2,
  ["c" + 2, "b" + 1],
  "c" + 2,
  ["b" + 1, "c" + 2],
  ["d" + 2, "c" + 2],
  ["b" + 1, "c" + 2]
];

// Setupt
function setup() {
  // Setup synth
  tempSynth = new Tone.MembraneSynth();
  tempSynth.toMaster();
  bassSynth = new Tone.Synth();
  bassSynth.toMaster();

  tempFrequency = 100;

  // initializes the hasRhythm variable to the value of the checkbox
  hasRhythm = true;
  // the startOctave
  octave = 0;

  baseLine = new Tone.Sequence(baseLine, baseLineNotes, "8n").start();
  // Initialize the loop
  rhythm = new Tone.Loop(song, "4n").start();
}

function toggleRhythm() {
  if (hasRhythm) {
    hasRhythm = false;
    rhythm.stop();
  } else {
    hasRhythm = true;
    rhythm.start(0);
  }
}

function setBaseLineOctave(octave) {
  newValue = parseInt(octave) - 1;
  baseLine.at(0, "a" + (1 + newValue));
  baseLine.at(1, "c" + (2 + newValue));
  baseLine.at(2, "e" + (2 + newValue));
  baseLine.at(3, ["d" + (2 + newValue), "c" + (2 + newValue)]);
  baseLine.at(4, "a" + (1 + newValue));
  baseLine.at(5, "c" + (2 + newValue));
  baseLine.at(6, "e" + (2 + newValue));
  baseLine.at(7, "c" + (2 + newValue));
  // f major chord
  baseLine.at(8, "a" + (1 + newValue));
  baseLine.at(9, "c" + (2 + newValue));
  baseLine.at(10, "f" + (2 + newValue));
  baseLine.at(11, ["e" + (2 + newValue), "c" + (2 + newValue)]);
  baseLine.at(12, "a" + (1 + newValue));
  baseLine.at(13, "c" + (2 + newValue));
  baseLine.at(14, "f" + (2 + newValue));
  baseLine.at(15, null);
  // c major chord
  baseLine.at(16, "g" + (1 + newValue));
  baseLine.at(17, "c" + (2 + newValue));
  baseLine.at(18, "e" + (2 + newValue));
  baseLine.at(19, [null, "c" + (2 + newValue)]);
  baseLine.at(20, "g" + (1 + newValue));
  baseLine.at(21, "c" + (2 + newValue));
  baseLine.at(22, "e" + (2 + newValue));
  baseLine.at(23, "c" + (2 + newValue));
  // g major chord
  baseLine.at(24, "g" + (1 + newValue));
  baseLine.at(25, "b" + (1 + newValue));
  baseLine.at(26, "d" + (2 + newValue));
  baseLine.at(27, ["c" + (2 + newValue), "b" + (1 + newValue)]);
  baseLine.at(28, "c" + (2 + newValue));
  baseLine.at(29, ["b" + (1 + newValue), "c" + (2 + newValue)]);
  baseLine.at(30, ["d" + (2 + newValue), "c" + (2 + newValue)]);
  baseLine.at(31, ["b" + (1 + newValue), "c" + (2 + newValue)]);
}

octaveSlider.oninput = function() {
  octaveOutput.innerHTML = this.value;
  setBaseLineOctave(this.value);
};

// This determines the rhythm
function song(time) {
  tempSynth.triggerAttackRelease("c1", "8n", time);
}

// Music note for the base line
function baseLine(time, note) {
  bassSynth.triggerAttackRelease(note, "10hz", time);
}

// This stops all the audio output
function pause() {
  Tone.Transport.stop();
}

// This plays all the audio output
function play() {
  if (!hasStarted) {
    setup();
    hasStarted = true;
  }
  Tone.Transport.start();
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
