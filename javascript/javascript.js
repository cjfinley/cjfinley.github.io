// Scaled values recieved from the RPI
const tempVal = 0.5;
const humidityVal = 0.5;
const lightVal = 0.5;
const motionX = 0.5;
const motionY = 0.5;
const motionZ = 0.5;

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
var motionXVolumeSlider = document.getElementById("motionXVolumeSlider");
var motionXVolumeOutput = document.getElementById("motionXVolumeValue");
var motionYVolumeSlider = document.getElementById("motionYVolumeSlider");
var motionYVolumeOutput = document.getElementById("motionYVolumeValue");
var motionZVolumeSlider = document.getElementById("motionZVolumeSlider");
var motionZVolumeOutput = document.getElementById("motionZVolumeValue");

// Some declarations of variables
// This is the synth used currently, we'll add more here for each input
let humiditySynthKickKick;
// This should be the snare
let humiditySynthSnare;
// This is the loop used for the undertone white noise
let humidityLoopKick;

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

// Synth for the motion
let motionSynthX;
var motionLoopX;
let motionSynthY;
var motionLoopY;
let motionSynthZ;
var motionLoopZ;

// Loop for making things funky
let makeFunkyLoop;
// Make funky value changes the ocatave at random
var makeFunkyVal = false;

// A boolean variable used to tell us when to run the setup function so it is only run once
var hasStarted = false;

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

const aChord = ["a3", "c4", "e4"];
const fChord = ["a3", "c4", "f4"];
const cChord = ["g3", "c4", "e4"];
const gChord = ["g3", "b3", "d4"];

const aArpegio = ["a4", "c5", "e5", "a5"];
const fArpegio = ["f4", "a4", "c5", "f5"];
const cArpegio = ["c5", "e5", "g5", "c6"];
const gArpegio = ["g4", "b4", "d5", "g5"];
const aArpegioReverse = ["a5", "e5", "c5", "a4"];
const fArpegioReverse = ["f5", "c5", "a4", "f4"];
const cArpegioReverse = ["c6", "g5", "e5", "c5"];
const gArpegioReverse = ["g5", "d5", "b4", "g4"];

const humidityLoopSnareNotes1 = [
  [["c4"], ["c4", "c4"]], // first measure
  [["c4"], ["c4", "c4"]],
  [["c4"], ["c4"]],
  [["c4"], ["c4"]]
];
const humidityLoopSnareNotes2 = [
  [["c4", "c4"], ["c4", "c4"]], // second measure
  [["c4"], ["c4"]],
  [["c4"], ["c4", "c4"]],
  [["c4", "c4"], ["c4"]]
];
const humidityLoopSnareNotes3 = [
  [["c4", "c4"], ["c4"]], // third measure
  [["c4", "c4"], ["c4"]],
  [["c4"], ["c4", "c4"]],
  [["c4"], ["c4", "c4"]]
];
const humidityLoopSnareNotes4 = [
  [["c4", "c4"], ["c4", "c4"]], // fourth measure
  [["c4", "c4"], ["c4"]],
  [null, [null, "c4"]],
  [[["c4", "c4"], ["c4", "c4"]], [["c4", "c4"]], ["c4"]]
];

var humidityLoopSnareNotes = humidityLoopSnareNotes1;

var isMuted = false;

// Setupt
function setup() {
  // Setup humidity synth
  humiditySynthKick = new Tone.MembraneSynth().toMaster();
  humiditySynthSnare = new Tone.NoiseSynth().toMaster();
  humiditySynthSnare.volume.value = -15;

  // Sets up light synthesizer
  lightSynth = new Tone.PolySynth(4, Tone.Synth, {
    volume: -8,
    oscillator: {
      partials: [1, 2, 5]
    },
    portamento: 0.005
  }).toMaster();

  // Sets up motion synthesizers
  motionSynthX = new Tone.PolySynth(4, Tone.Synth, {
    volume: -8,
    oscillator: {
      partials: [1, 2, 5]
    },
    portamento: 0.005
  }).toMaster();
  motionSynthY = new Tone.PolySynth(4, Tone.Synth, {
    volume: -8,
    oscillator: {
      partials: [1, 2, 5]
    },
    portamento: 0.005
  }).toMaster();
  motionSynthZ = new Tone.PolySynth(4, Tone.Synth, {
    volume: -8,
    oscillator: {
      partials: [1, 2, 5]
    },
    portamento: 0.005
  }).toMaster();

  // Sets up temp synth
  tempSynth = new Tone.PolySynth(6);
  tempSynth.volume.value = -10;
  tempSynth.toMaster();

  // Sets up a sequence for the light sound, as it plays a series of notes
  lightLoop = new Tone.Sequence(
    lightLoopFunction,
    lightLoopNotes,
    "8n"
  ).start();

  motionLoopX = new Tone.Sequence(motionLoopXFunction, aArpegio, "16n").start();
  motionSynthX.volume.value = -7;
  motionLoopY = new Tone.Sequence(motionLoopYFunction, cArpegio, "16n").start();
  motionSynthY.volume.value = -7;
  motionLoopZ = new Tone.Sequence(motionLoopZFunction, gArpegio, "16n").start();
  motionSynthZ.volume.value = -7;

  // Sets up several loops and a sequence. The loop simply plays the kick every half note (hence the 2n)
  // And the sequence plays a randomly selected measure of snare (selected from humidityLoopSnareNotes1-4)
  humidityLoopKick = new Tone.Loop(humidityLoopKickFunction, "2n").start();
  humidityLoopSnare = new Tone.Sequence(
    humidityLoopSnareFunction,
    humidityLoopSnareNotes,
    "4n"
  ).start();

  // Sets up a loop for playing the the tempSynth (polySynth simply playing 4 chords);
  tempLoop = new Tone.Loop(tempLoopFunction, "1n").start();

  // A loop that randomizes the values played by the lightLoop
  makeFunkyLoop = new Tone.Loop(
    makeFunkyhumidityLoopKickFunction,
    "8n"
  ).start();

  // A loop that simply counts from iteratesa global constant from 0 - 3 so we can know what measure we're on.
  // It is 0 - 3 because the song is in 4/4 time
  timeLoop = new Tone.Loop(timeLoopFunction, "1n").start();

  // Sets the start ocatave for the light notes
  setlightLoopOctave(2);
}

function makeFunky() {
  if (makeFunkyVal) {
    makeFunkyVal = false;
    // ensures that the melody is still playing
    if (!isMuted) {
      lightLoop.mute = false;
    }
    setlightLoopOctave(2);
  } else {
    makeFunkyVal = true;
  }
}

function makeFunkyhumidityLoopKickFunction(time) {
  console.log(isMuted);
  if (makeFunkyVal && !isMuted) {
    val = Math.random();
    val *= 4;
    val = Math.floor(val) + 2;
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

function setHumidityLoopValues(measure) {
  humidityLoopSnare.at(0, measure[0]);
  humidityLoopSnare.at(1, measure[1]);
  humidityLoopSnare.at(2, measure[2]);
  humidityLoopSnare.at(3, measure[3]);
}

function changeArpegio(loop, newArpegio) {
  loop.at(0, newArpegio[0]);
  loop.at(1, newArpegio[1]);
  loop.at(2, newArpegio[2]);
  loop.at(3, newArpegio[3]);
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
  humiditySynthKick.volume.value = this.value;
  humiditySynthSnare.volume.value = this.value - 15;
};

motionXVolumeSlider.oninput = function() {
  motionXVolumeOutput.innerHTML = this.value;
  // X axis
  if (this.value < 0) {
    // play positive arpegio
    changeArpegio(motionLoopX, aArpegioReverse);
  } else if (this.value > 0) {
    // play negative arpegio
    changeArpegio(motionLoopX, aArpegio);
  }
};

motionYVolumeSlider.oninput = function() {
  motionYVolumeOutput.innerHTML = this.value;
  // y axis
  if (this.value < 0) {
    // play positive arpegio
    changeArpegio(motionLoopY, fArpegioReverse);
  } else if (this.value > 0) {
    // play negative arpegio
    changeArpegio(motionLoopY, fArpegio);
  }
};

motionZVolumeSlider.oninput = function() {
  motionZVolumeOutput.innerHTML = this.value;

  // z axis
  if (this.value < 0) {
    // play positive arpegio
    changeArpegio(motionLoopZ, gArpegioReverse);
  } else if (this.value > 0) {
    // play negative arpegio
    changeArpegio(motionLoopZ, gArpegio);
  }
};

// This determines the humidityLoopKick
function humidityLoopKickFunction(time) {
  setRandomHumidityLoopSnarePattern();
  humiditySynthKick.triggerAttackRelease("c1", "8n", time);
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

function motionLoopXFunction(time, note) {
  motionSynthX.triggerAttackRelease(note, "10hz", time);
}

function motionLoopYFunction(time, note) {
  motionSynthY.triggerAttackRelease(note, "10hz", time);
}

function motionLoopZFunction(time, note) {
  motionSynthZ.triggerAttackRelease(note, "10hz", time);
}

function timeLoopFunction(time) {
  loopLocation += 1;
  loopLocation = loopLocation % 4;
}

function humidityLoopSnareFunction(time, note) {
  humiditySynthSnare.triggerAttackRelease("8n", time);
}

function setRandomHumidityLoopSnarePattern() {
  val = Math.random();
  val *= 4;
  val = Math.floor(val);
  console.log(val);
  if (val == 0) {
    setHumidityLoopValues(humidityLoopSnareNotes1);
  } else if (val == 1) {
    setHumidityLoopValues(humidityLoopSnareNotes2);
  } else if ((val = 2)) {
    setHumidityLoopValues(humidityLoopSnareNotes3);
  } else if ((val = 3)) {
    setHumidityLoopValues(humidityLoopSnareNotes4);
  }
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
    isMuted = false;
  } else {
    lightLoop.mute = true;
    isMuted = true;
  }
}

function toggleHumidityKick() {
  if (humidityLoopKick.mute) {
    humidityLoopKick.mute = false;
  } else {
    humidityLoopKick.mute = true;
  }
}

function toggleHumiditySnare() {
  if (humidityLoopSnare.mute) {
    humidityLoopSnare.mute = false;
  } else {
    humidityLoopSnare.mute = true;
  }
}

function toggleMotionX() {
  if (motionLoopX.mute) {
    motionLoopX.mute = false;
  } else {
    motionLoopX.mute = true;
  }
}

function toggleMotionY() {
  if (motionLoopY.mute) {
    motionLoopY.mute = false;
  } else {
    motionLoopY.mute = true;
  }
}

function toggleMotionZ() {
  if (motionLoopZ.mute) {
    motionLoopZ.mute = false;
  } else {
    motionLoopZ.mute = true;
  }
}
