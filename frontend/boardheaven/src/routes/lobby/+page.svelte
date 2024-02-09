<script lang="ts">
  import Colorbox from "$lib/components/colorbox/colorbox.svelte";
  import { get } from "svelte/store";
  import { isGameMaster } from "../../stores/gameMasterStore";
  import { getContext, onMount } from "svelte";
  import { websocketStore } from "../../stores/websocketStore";

  onMount(() => {
    let unsubscribeGameMaster = isGameMaster.subscribe((value) => {
      gameMaster = value;
    });

    let unsubscribeWs = websocketStore.subscribe((ws) => {
      if (ws) {
        ws.binaryType = "arraybuffer";
        console.log("we are in lobby and got a socket");
        const test = { dummy: "here we are" };
        ws.send(JSON.stringify(test));
        ws.addEventListener("message", (e) => {
          console.log("in lobby got message from server:", e.data.toString());
        });
      }
    });

    return () => {
      unsubscribeGameMaster();
      unsubscribeWs();
    };
  });

  let gameMaster: boolean = false;

  const yellow: string = "#F9FF00";
  const green: string = "#1ED225";
  const red: string = "#FD0000";
  const black: string = "#000000";

  let generatedLink: string | null = null;
</script>

<div>
  <div>
    <h1>Lobby</h1>
    <h1>Mensch ärgere dich nicht</h1>
  </div>

  <div class="color-box-container">
    <p class="choose-color-text">Choose your color:</p>
    <div class="color-box-row">
      <Colorbox color={yellow} colorid={1}></Colorbox>
      <Colorbox color={green} colorid={2}></Colorbox>
      <Colorbox color={red} colorid={3}></Colorbox>
      <Colorbox color={black} colorid={0}></Colorbox>
    </div>
  </div>

  {#if gameMaster}
    <div>
      <label class="link-label">
        Share Link With Friends
        <br />
        <input
          bind:value={generatedLink}
          class="link-textbox"
          readonly
          type="text"
        />
      </label>
      <button class="start-game-button">Start game</button>
    </div>
  {/if}
  {#if !gameMaster}
    <div class="wait-section">Wait for game master to start</div>
  {/if}
</div>

<style>
  .color-box-container {
    background-color: #f1f1f1;
    padding: 15px;
    text-align: left;
    border-radius: 12px;
    margin: auto;
  }

  .choose-color-text {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .color-box-row {
    display: flex;
    justify-content: space-evenly;
    margin: 0 -1fr;
  }

  .link-textbox {
    width: 563px;
    height: 36px;
    border-radius: 56px;
  }

  .link-label {
    padding-top: 30px;
    font-size: 1.5rem;
    text-align: center;
    display: block;
  }

  .start-game-button {
    width: 172px;
    height: 30px;
    border-radius: 57px;
    justify-content: center;
    margin: auto;
    margin-top: 40px;
    text-align: center;
    display: block;
  }

  .wait-section {
    width: 172px;
    height: 30px;
    border-radius: 57px;
    justify-content: center;
    margin: auto;
    margin-top: 40px;
    text-align: center;
    display: block;

    background-color: #f1f1f1;
    padding: 15px;
  }
</style>
