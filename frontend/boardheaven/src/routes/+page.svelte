<script>
  import preview from "$lib/images/preview.png";
  import { setGameMaster } from "../stores/gameMasterStore";
  import { goto } from "$app/navigation";
  import { onMount, setContext } from "svelte";
  //import { websocketStore } from "../stores/websocketStore";

  let isOpen = false;
  let code = "";
  let submitted = false;

  function openRoom() {
    submitted = false;
    isOpen = true;
    code = "";
  }
  function submit() {
    submitted = true;
    if (code.length === 5) {
      isOpen = false;
      setGameMaster(true, code);
      goto("/lobby");
    }
  }
  function closeModal() {
    isOpen = false;
  }

  onMount(() => {
    /* websocketStore.connect("ws:\\localhost:8888");
    const unsubscribeWebsocket = websocketStore.subscribe((data) => {
      if (data) {
        console.log("msg:", data);
      }
    });
    return () => {
      unsubscribeWebsocket();
    }; */
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Choose Game" />
</svelte:head>

<section>
  <div class="wrapper" style="padding: 20px; border-radius: 10px;">
    <h3 style="color: #333; font-family: 'Arial', sans-serif;">
      Mensch ärgere Dich nicht
    </h3>
    <span class="gameChooser">
      <picture>
        <img src={preview} alt="Welcome" />
      </picture>
    </span>

    <h2>
      <button on:click={openRoom} class="button-2">Raum öffnen</button>
    </h2>
  </div>
  {#if isOpen}
    <div class="modal">
      <input
        type="text"
        bind:value={code}
        placeholder="5-stelligen Code eingeben"
      />
      <div class="button-group">
        <button on:click={submit}>Abschicken</button>
        <button class="cancel-button" on:click={closeModal}>Abbrechen</button>
      </div>
      {#if submitted && code.length < 5}
        <h4 id="code">Falscher Code</h4>
        <a
          href="https://www.thalia.at/shop/home/artikeldetails/A1062123624?ProvID=11010474&gad_source=1&gclid=Cj0KCQiA7OqrBhD9ARIsAK3UXh11Gl4PrK3k1Kdrq50fBWIhs9AUUxKQaGKFiazzDiYmEJubL16dbuoaAoYREALw_wcB"
          target="_blank">Kaufe das Spiel</a
        >
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
    background-color: #007bff;
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
    color: #007bff;
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

  h3 {
    color: white;
    font-size: x-large;
  }
  .wrapper {
    background-color: rgb(234, 234, 234);
    border-radius: 10%;
    padding: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
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
    margin-top: 80px;
    transition: all 0.3s ease-in-out;
    padding: 10px 20px;
    background-color: #3a7bd5;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: large;
    font-family: Arial, sans-serif;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  }
  .button-2:hover {
    background-color: #3a7bd5;
    box-shadow: 0px 15px 20px rgba(30, 190, 223, 0.4);
    transform: translateY(-3px);
  }
</style>
