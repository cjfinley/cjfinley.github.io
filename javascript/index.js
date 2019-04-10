const tempVal = 0.5;
const humidityVal = 0.5;
const lightVal = 0.5;
const movementVal = 0.5;

const synth = new Tone.Synth();

synth.toMaster();

function pause() {
  synth.triggerRelease();
}

function play() {
  synth.triggerAttack(synth.frequency.value, "8n");
}

function increaseFrequency() {
  synth.frequency.value += 10;
}

function decreaseFrequency() {
  synth.frequency.value -= 10;
}

function rhythm() {
  // If rhythm is false, set it to true
  // and the bpm equal to the value of the slider
  // If it is true, set it to false
}

function light() {
  // play a sound dependent on the input light value
}

function humidity() {
  // play a sound dependent on the input humidity
}

function motion() {
  // play a sound dependent on the motion inputs
}
