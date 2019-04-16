// Scaled values recieved from the RPI
const tempVal = 0.5;
const humidityVal = 0.5;
const lightVal = 0.5;
const movementVal = 0.5;

var loopLocation = 0;

// References the Overall Volume value
var volumeSlider = document.getElementById("volumeSlider");
var volumeOutput = document.getElementById("volumeValue");
// References the Temperature Volume value
var tempVolumeSlider = document.getElementById("tempVolumeSlider");
var tempVolumeOutput = document.getElementById("tempVolumeValue");
// References the Light Volume value
var lightVolumeSlider = document.getElementById("lightVolumeSlider");
var lightVolumeOutput = document.getElementById("lightVolumeValue");
// References the Humidity Volume value
var humidityVolumeSlider = document.getElementById("humidityVolumeSlider");
var humidityVolumeOutput = document.getElementById("humidityVolumeValue");
// References the Motion Volume value
var motionVolumeSlider = document.getElementById("motionVolumeSlider");
var motionVolumeOutput = document.getElementById("motionVolumeValue");

// Some declarations of variables
// This is the synth used currently, we'll add more here for each input
let humiditySynth;
// This is the loop used for the undertone white noise
let humidityLoop;

// bass synth
let lightSynth;
// This is a function called by Tone.Sequence that simply plays a series of notes
var lightLoop;

// synth for temperature
let tempSynth;
// This loop simply plays chords every whole note
var tempLoop;

// Loop to keep track of which measure it is on
var timeLoop;

// Loop for making things funky
let makeFunkyLoop;
// Make funky value changes the ocatave at random
var makeFunkyVal = false;

// A boolean variable used to tell us when to run the setup function so it is only run once
var hasStarted = false;

//	PIANO
var piano = new Tone.PolySynth(4, Tone.Synth, {
  volume: -8,
  oscillator: {
    partials: [1, 2, 5]
  },
  portamento: 0.005
}).toMaster();

lightLoopNotes = [
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

var aChord = ["a3", "c4", "e4"];
var fChord = ["a3", "c4", "f4"];
var cChord = ["c4", "e4", "g4"];
var gChord = ["g3", "b3", "d4"];
// These are tone.js part objects for each chord initialized in the setup function
var aChordPart;
var fChordPart;
var cChordPart;
var gChordPart;

// Setupt
function setup() {
  // Setup synth
  humiditySynth = new Tone.MembraneSynth().toMaster();

  lightSynth = new Tone.Synth().toMaster();

  tempSynth = new Tone.PolySynth(6);
  tempSynth.volume.value = -10;
  tempSynth.toMaster();

  lightLoop = new Tone.Sequence(
    lightLoopFunction,
    lightLoopNotes,
    "8n"
  ).start();
  humidityLoop = new Tone.Loop(song, "4n").start();
  tempLoop = new Tone.Loop(tempLoopFunction, "1n").start();
  makeFunkyLoop = new Tone.Loop(makeFunkySong, "8n").start();

  timeLoop = new Tone.Loop(timeLoopFunction, "1n").start();

  setlightLoopOctave(1);
}

function makeFunky() {
  if (makeFunkyVal) {
    makeFunkyVal = false;
    // ensures that the melody is still playing
    lightLoop.mute = false;
    setlightLoopOctave(2);
  } else {
    makeFunkyVal = true;
  }
}

function makeFunkySong(time) {
  if (makeFunkyVal) {
    val = Math.random();
    val *= 5;
    val = Math.floor(val) + 1;
    if (val == 5) {
      lightLoop.mute = true;
    } else {
      lightLoop.mute = false;
      setlightLoopOctave(val);
    }
  }
}

function setlightLoopOctave(octave) {
  newValue = parseInt(octave) - 1;
  lightLoop.at(0, "a" + (1 + newValue));
  lightLoop.at(1, "c" + (2 + newValue));
  lightLoop.at(2, "e" + (2 + newValue));
  lightLoop.at(3, ["d" + (2 + newValue), "c" + (2 + newValue)]);
  lightLoop.at(4, "a" + (1 + newValue));
  lightLoop.at(5, "c" + (2 + newValue));
  lightLoop.at(6, "e" + (2 + newValue));
  lightLoop.at(7, "c" + (2 + newValue));
  // f major chord
  lightLoop.at(8, "a" + (1 + newValue));
  lightLoop.at(9, "c" + (2 + newValue));
  lightLoop.at(10, "f" + (2 + newValue));
  lightLoop.at(11, ["e" + (2 + newValue), "c" + (2 + newValue)]);
  lightLoop.at(12, "a" + (1 + newValue));
  lightLoop.at(13, "c" + (2 + newValue));
  lightLoop.at(14, "f" + (2 + newValue));
  lightLoop.at(15, null);
  // c major chord
  lightLoop.at(16, "g" + (1 + newValue));
  lightLoop.at(17, "c" + (2 + newValue));
  lightLoop.at(18, "e" + (2 + newValue));
  lightLoop.at(19, [null, "c" + (2 + newValue)]);
  lightLoop.at(20, "g" + (1 + newValue));
  lightLoop.at(21, "c" + (2 + newValue));
  lightLoop.at(22, "e" + (2 + newValue));
  lightLoop.at(23, "c" + (2 + newValue));
  // g major chord
  lightLoop.at(24, "g" + (1 + newValue));
  lightLoop.at(25, "b" + (1 + newValue));
  lightLoop.at(26, "d" + (2 + newValue));
  lightLoop.at(27, ["c" + (2 + newValue), "b" + (1 + newValue)]);
  lightLoop.at(28, "c" + (2 + newValue));
  lightLoop.at(29, ["b" + (1 + newValue), "c" + (2 + newValue)]);
  lightLoop.at(30, ["d" + (2 + newValue), "c" + (2 + newValue)]);
  lightLoop.at(31, ["b" + (1 + newValue), "c" + (2 + newValue)]);
}

volumeSlider.oninput = function() {
  volumeOutput.innerHTML = this.value;
  // Can have this change whatever value needs to be tested
  Tone.Master.volume.value = this.value;
};

tempVolumeSlider.oninput = function() {
  tempVolumeOutput.innerHTML = this.value;
  // Can have this change whatever value needs to be tested
  tempSynth.volume.value = this.value - 10;
};

lightVolumeSlider.oninput = function() {
  lightVolumeOutput.innerHTML = this.value;
  // Can have this change whatever value needs to be tested
  lightSynth.volume.value = this.value;
};

humidityVolumeSlider.oninput = function() {
  humidityVolumeOutput.innerHTML = this.value;
  // Can have this change whatever value needs to be tested
  humiditySynth.volume.value = this.value;
};

// This determines the humidityLoop
function song(time) {
  humiditySynth.triggerAttackRelease("c1", "8n", time);
}

function tempLoopFunction(time) {
  if (loopLocation == 0) {
    tempSynth.triggerAttackRelease(aChord, "2n", time);
  } else if (loopLocation == 1) {
    tempSynth.triggerAttackRelease(fChord, "2n", time);
  } else if (loopLocation == 2) {
    tempSynth.triggerAttackRelease(cChord, "2n", time);
  } else {
    tempSynth.triggerAttackRelease(gChord, "2n", time);
  }
}

// Music note for the base line
function lightLoopFunction(time, note) {
  lightSynth.triggerAttackRelease(note, "10hz", time);
}

function timeLoopFunction(time) {
  loopLocation += 1;
  loopLocation = loopLocation % 4;
  console.log(loopLocation);
}

// This stops all the audio output
function pause() {
  Tone.Transport.stop();
  loopLocation = 0;
}

// This plays all the audio output
function play() {
  if (!hasStarted) {
    setup();
    hasStarted = true;
  }
  Tone.Transport.start();
}

// This mutes the Transport
function mute() {
  if (Tone.Master.mute) {
    Tone.Master.mute = false;
  } else {
    Tone.Master.mute = true;
  }
}

function toggleTemp() {
  if (tempLoop.mute) {
    tempLoop.mute = false;
  } else {
    tempLoop.mute = true;
  }
}

function toggleLight() {
  if (lightLoop.mute) {
    lightLoop.mute = false;
  } else {
    lightLoop.mute = true;
  }
}

function toggleHumidity() {
  if (humidityLoop.mute) {
    humidityLoop.mute = false;
  } else {
    humidityLoop.mute = true;
  }
}

// This adds the sound gotten from the motion values
function motion() {
  // play a sound dependent on the motion inputs

  // X axis
  if (x < 0) {
    // play positive arpegio
  } else {
    // play negative arpegio
  }

  // y axis
  if (y < 0) {
    // play positive arpegio
  } else {
    // play negative arpegio
  }

  // z axis
  if (z < 0) {
    // play positive arpegio
  } else {
    // play negative arpegio
  }
}
