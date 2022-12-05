let flipCount = 0;
let score = 0;
let isFlat = true;
let setScoreTimeout = null;
let stopScoringTimeout = null;
let alpha = 0;
let beta = 0;
let gamma = 0;

function setScore() {
  score += flipCount;
  flipCount = 0;
}

function handleFlip() {
  flipCount++;
  isFlat = false;
  clearTimeout(setScoreTimeout);
  // stopScoringTimeout = setTimeout(() => {
  //   flipCount = 0;
  // }, 500);
}

function handleStopFlip() {
  isFlat = true;
  setScoreTimeout = setTimeout(setScore, 1000);
  clearTimeout(stopScoringTimeout);
}

export function getScore() {
  return score;
}

export function getOrientation() {
  return {
    alpha,
    beta,
    gamma,
  };
}

export default function handleOrientation(event) {
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;

  if ((beta >= 160 || beta <= -160) && isFlat) {
    handleFlip();
  }

  if (beta <= 20 && beta >= -20 && !isFlat) {
    handleStopFlip();
  }
}
