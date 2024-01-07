<script>
	import preview from '$lib/images/preview.png';
	let isOpen = false;
  	let code = '';
	let submitted = false;


  function openRoom() {
	submitted = false;
    isOpen = true;
	code = '';

  }
  function submit() {
    submitted = true;
    if (code.length === 5) {
      isOpen = false; 
    }
  }
  function closeModal() {
    isOpen = false;
  }
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
				<img src={preview} alt="Welcome" />
			</picture>
		</span>
	</h1>

	<h2>
		<button on:click={openRoom} class="button-2">Raum öffnen</button>
	</h2>
</div>
{#if isOpen}
  <div class="modal">
    <input type="text" bind:value={code} placeholder="5-stelligen Code eingeben">
    <div class="button-group">
      <button on:click={submit}>Abschicken</button>
      <button class="cancel-button" on:click={closeModal}>Abbrechen</button>
    </div>
    {#if submitted && code.length < 5}
	  <h4 id="code">Falscher Code</h4>
      <a href="https://www.thalia.at/shop/home/artikeldetails/A1062123624?ProvID=11010474&gad_source=1&gclid=Cj0KCQiA7OqrBhD9ARIsAK3UXh11Gl4PrK3k1Kdrq50fBWIhs9AUUxKQaGKFiazzDiYmEJubL16dbuoaAoYREALw_wcB" target="_blank">Kaufe das Spiel</a>
    {/if}
  </div>
{/if}

</section>

<style>
	#code {
		color: red;
		margin: 0;
		padding-top: 10px;
	}
	.modal button {
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		background-color: #007BFF;
		color: #ffffff;
		font-size: 16px;
		cursor: pointer;
	}

	.modal button:hover {
		background-color: #0056b3;
	}

	.modal .cancel-button {
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		background-color: red;
		color: #ffffff;
		font-size: 16px;
		cursor: pointer;
	}

	.modal .cancel-button:hover {
		background-color: darkred;
	}
    .modal a {
    margin-top: 10px;
    color: #007BFF;
    text-decoration: none;
  	}

  	.modal a:hover {
    color: #0056b3;
  	}
	.modal {
	position: relative;
  	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	}

	.modal input {
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
	border: 1px solid #dddddd;
	border-radius: 5px;
	font-size: 16px;
	}

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
background-color: #007BFF;
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
	background-color: #0056b3;
}

</style>
