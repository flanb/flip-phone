<script>
	import Button from "$lib/components/Button.svelte"
	import deviceOrientationPermission from "$lib/functions/deviceOrientationPermission.js"
	import handleOrientation, { getOrientation, getScore } from "$lib/functions/flipCounter.js"
	import { onDestroy, onMount } from "svelte"

	let errorMessage = ""
	let orientationPermission = false
	let score = 0
	let diff = 0
	let userAlpha = 0
	let scoreContainer = null
	let titleElement = null
	let infoElement = null
	let orientationTesterElement = null
	let getScoreInterval = null

	let randomColorAnimationStarted = false
	let randomCharacterAnimationStarted = false
	let randomZoomAnimationStarted = false
	let randomRotateAnimationStarted = false
	let randomBackgroundAnimationStarted = false
	let randomTranslateAnimationStarted = false

	function handleStartClick () {
		deviceOrientationPermission(handleOrientation).then(() => {
			init()

			scoreContainer.classList.remove("score-animation")
			getScoreInterval = setInterval(() => {
				if (score !== getScore()) {
					diff = getScore() - score
					const randomPLusRotate = Math.floor(Math.random() * 60) - 30
					scoreContainer.style.setProperty("--random-plus-rotate", randomPLusRotate + "deg")
					scoreContainer.classList.add("score-animation")
					setTimeout(() => {
						diff = 0
						scoreContainer.classList.remove("score-animation")
					}, 1000)

					if (!randomCharacterAnimationStarted && score >= 2) {
						randomCharacter()
						randomCharacterAnimationStarted = true
					}

					if (!randomColorAnimationStarted && score >= 5) {
						randomColor()
						randomColorAnimationStarted = true
					}

					if (!randomZoomAnimationStarted && score >= 8) {
						randomZoom()
						randomRotate()

						randomZoomAnimationStarted = true
						randomRotateAnimationStarted = true
					}

					if (!randomBackgroundAnimationStarted && score >= 10) {
						randomBackground()
						randomBackgroundAnimationStarted = true
					}

					if (!randomTranslateAnimationStarted && score >= 3) {
						randomTranslate()
						randomTranslateAnimationStarted = true
					}

				}
				score = getScore()
			}, 100)

		}).catch((error) => {
			errorMessage = error
		})
	}

	function randomColor () {
		setInterval(() => {
			const randomColor = Math.floor(Math.random() * 16777215).toString(16)
			document.documentElement.style.setProperty("--random-color", "#" + randomColor)
		}, 200)
	}

	function randomCharacter () {
		const characters = "abcdefghijklmnopqrstuvwxyz"
		const titleLength = titleElement.textContent.length
		const infoLength = infoElement.textContent.length
		setInterval(() => {
			let titleText = ""
			let infoText = ""
			for (let i = 0; i < titleLength; i++) {
				titleText += characters.charAt(Math.floor(Math.random() * characters.length))
			}
			for (let i = 0; i < infoLength; i++) {
				infoText += characters.charAt(Math.floor(Math.random() * characters.length))
			}
			titleElement.textContent = titleText
			infoElement.textContent = infoText
		}, 100)
	}

	function randomZoom () {
		setInterval(() => {
			const randomZoom = Math.random() * 2
			document.documentElement.style.setProperty("--random-zoom", randomZoom.toString())
		}, 400)
	}

	function randomRotate () {
		setInterval(() => {
			const randomRotate = Math.floor(Math.random() * 40) - 20
			document.documentElement.style.setProperty("--random-rotate", randomRotate + "deg")
		}, 200)
	}

	function randomTranslate () {
		setInterval(() => {
			const randomTranslateX = Math.floor(Math.random() * 100) - 50
			const randomTranslateY = Math.floor(Math.random() * 100) - 50
			document.documentElement.style.setProperty("--random-translate-x", randomTranslateX + "px")
			document.documentElement.style.setProperty("--random-translate-y", randomTranslateY + "px")
		}, 100)
	}

	function randomBackground () {
		setInterval(() => {
			const randomColor1 = Math.floor(Math.random() * 16777215).toString(16)
			const randomColor2 = Math.floor(Math.random() * 16777215).toString(16)
			const randomDeg = Math.floor(Math.random() * 360)
			const randomGradientType = Math.floor(Math.random() * 2) === 0 ? "linear-gradient" : "radial-gradient"
			document.documentElement.style.setProperty("--random-background", `${randomGradientType}(${randomDeg}deg, #${randomColor1}, #${randomColor2})`)

		}, 200)
	}

	function preventZoom (event) {
		event.preventDefault()
	}

	function init () {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen()
		} else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
			document.documentElement.mozRequestFullScreen()
		} else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			document.documentElement.webkitRequestFullscreen()
		} else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
			document.documentElement.msRequestFullscreen()
		}

		addEventListener("touchstart", preventZoom, { passive: false })
		orientationPermission = true
		userAlpha = getOrientation().alpha

		document.documentElement.style.setProperty("--random-rotate", "0deg")
		document.documentElement.style.setProperty("--random-zoom", "1")
		document.documentElement.style.setProperty("--random-translate-x", "0px")
		document.documentElement.style.setProperty("--random-translate-y", "0px")
	}

	function tick () {
		requestAnimationFrame(tick)
		const { alpha, beta, gamma } = getOrientation()

		orientationTesterElement.style.transform = `translateX(${gamma * 2}px) translateY(${beta * 2}px) rotate(${alpha - userAlpha}deg)`
	}

	onMount(() => {
		tick()
	})

	onDestroy(() => {
		clearInterval(getScoreInterval)
	})

</script>

<div class="home">
  <div class="title-container">
    <h1 bind:this={titleElement}>Flip Phone</h1>
    <div bind:this={orientationTesterElement} class="orientation-tester"></div>
  </div>
  <div style:display={orientationPermission ? "none" : null }>
    <Button on:click={handleStartClick}>Start</Button>
    <p>{errorMessage}</p>
  </div>
  <p bind:this={scoreContainer} class="score-container score-animation" data-diff={diff ? "+" + diff : null }
     style:display={orientationPermission ? null : "none" }>
    {score} <span bind:this={infoElement}>flips</span>
  </p>
</div>

<style>
  .home {
    display: grid;
    align-items: center;
    height: 100vh;
    transform: scale(var(--random-zoom)) rotate(var(--random-rotate)) translate(var(--random-translate-x), var(--random-translate-y));
    color: var(--random-color);
    justify-items: center;
    grid-template: repeat(2, 1fr) / 1fr;
    will-change: transform;

  }

  .title-container {
    position: relative;
    transform: rotate(var(--random-rotate));
  }

  .score-container {
    font-size: 5rem;
    position: relative;
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    text-align: center;
  }

  .score-animation {
    --random-plus-rotate: 0;
  }

  .score-animation::before {
    font-size: 3rem;
    position: absolute;
    display: block;
    content: attr(data-diff);
    animation: score-animation 1s ease;
  }

  .score-container span {
    font-size: 2rem;
  }

  .orientation-tester {
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
    left: 0;
    height: 4px;
    background: black;
    will-change: transform;
  }

  @keyframes score-animation {
    0% {
      transform: rotate(var(--random-plus-rotate)) translateY(0);
      opacity: 0
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(var(--random-plus-rotate)) translateY(-100%);
      opacity: 0;
    }
  }
</style>
