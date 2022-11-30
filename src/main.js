const output = document.querySelector(".output")

let flipCount = 0
let isFlat = true
let score = 0
let setScoreTimeout = null
let stopScoringTimeout = null

function setScore () {
	score += flipCount
	flipCount = 0
}

function handleOrientation (event) {
	console.log(event)
	const absolute = event.absolute
	const beta = event.beta

	output.innerHTML = `
		<p>absolute: ${absolute}</p>
		<p>beta: ${beta}</p>
		<p>flipcount: ${flipCount}</p>
		<p>score: ${score}</p>
	`
	if ((beta >= 175 || beta <= -175) && isFlat) {
		flipCount++
		isFlat = false
		clearTimeout(setScoreTimeout)
		stopScoringTimeout = setTimeout(() => {
			flipCount = 0
		}, 1000)
	}

	if ((beta <= 5 && beta >= -5) && !isFlat) {
		isFlat = true
		setScoreTimeout = setTimeout(setScore, 1000)
		clearTimeout(stopScoringTimeout)
	}

}

addEventListener("deviceorientation", handleOrientation)