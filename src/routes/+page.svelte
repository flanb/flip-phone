<script>
	import Button from "$lib/components/Button.svelte"
	import deviceOrientationPermission from "$lib/functions/deviceOrientationPermission.js"
	import handleOrientation, {  getScore } from "$lib/functions/flipCounter.js"
	import { onMount } from "svelte"

	let errorMessage = ""
	let orientationPermission = false
	let score = 0

	function handleStartClick () {
		deviceOrientationPermission(handleOrientation).then(() => {
			orientationPermission = true
		}).catch((error) => {
			errorMessage = error
		})
	}

	onMount(() => {
		addEventListener("touchstart", (event) => {
			if (event.touches.length > 1) event.preventDefault()
		}, { passive: false })
	})

	const interval = setInterval(() => {
		score = getScore()
	}, 100)


</script>

<svelte:head>
  <title>Home</title>
  <meta content="Flip phone, the best game of the universe" name="description"/>
</svelte:head>

{#if orientationPermission}
  <h1>Score: {score}</h1>

{:else}
  <div class="home">
    <h1>Flip Phone</h1>
    <div>
      <Button on:click={handleStartClick}>Start</Button>
      <p>{errorMessage}</p>
    </div>
  </div>
{/if}

<style>
  .home {
    display: grid;
    align-items: center;
    height: 100vh;
    justify-items: center;
    grid-template: 1fr 1fr / 1fr;
  }
</style>
