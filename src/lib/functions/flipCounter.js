let flipCount = 0;
let score = 0;
let isFlat = true;
let setScoreTimeout = null;
let stopScoringTimeout = null;
let beta = 0;

function setScore() {
  score += flipCount;
  flipCount = 0;
}

function handleFlip() {
  flipCount++;
  isFlat = false;
  clearTimeout(setScoreTimeout);
  stopScoringTimeout = setTimeout(() => {
    flipCount = 0;
  }, 500);
}

function handleStopFlip() {
  isFlat = true;
  setScoreTimeout = setTimeout(setScore, 1000);
  clearTimeout(stopScoringTimeout);
}

export function getScore() {
  return score;
}
export function getBeta() {
  return beta;
}

export default function handleOrientation(event) {
  beta = event.beta;

  if ((beta >= 120 || beta <= -120) && isFlat) {
    handleFlip();
  }

  if (beta <= 60 && beta >= -60 && !isFlat) {
    handleStopFlip();
  }
}
