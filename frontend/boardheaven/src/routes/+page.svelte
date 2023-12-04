<script>
	import preview from '$lib/images/preview.png';
	import { _handleButtonClick } from './+page.js';

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Choose Game" />
</svelte:head>

<section>
	<div class="wrapper">
		<h3>Mensch ärgere Dich nicht</h3>
	<h1>
		<span class="gameChooser">
			<picture>
				<!-- <source srcset={preview} type="image/webp"/> -->
				<img src={preview} alt="Welcome" />
			</picture>
		</span>
	</h1>

	<h2>
		<button class="button-2" id="createRoom" on:click={_handleButtonClick}>Raum öffnen</button>
	</h2>
	<!--<script src="+page.js"></script>-->
</div>

</section>

<style>
	h3{
		color: white;
	}
	.wrapper{
		background-color: rgb(142, 138, 138);
		border-radius: 10%;
		padding: 10px;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.gameChooser {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 130px;
	}

	.gameChooser img {
		border-radius: 10px;
		position: absolute;
		width: 100%;
		top: 0;
		display: block;
	}




.button-2 {
  background-color: #0e7f19;
  border-radius: 8px;
  border-width: 0;
  color:white ;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-2:hover {
    background-color: #32c142;
}

</style>
