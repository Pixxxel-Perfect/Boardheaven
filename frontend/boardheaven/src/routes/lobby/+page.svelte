<script lang="ts">
  import Colorbox from "$lib/components/colorbox/colorbox.svelte";
  import { isGameMaster } from "../../stores/gameMasterStore";
  import { onMount } from "svelte";
  import { websocketStore, WsMessageType } from "../../stores/websocketStore";
  import { page } from "$app/stores";
  import type { MinRoom } from "../../helper/minRoom";

  let idFromparam = $page.url.searchParams.get("roomId");
  let connectionUrl = "ws://localhost:3000";

  let generatedLink: string | null = null;

  onMount(() => {
    let unsubscribeGameMaster = isGameMaster.subscribe((value) => {
      gameMaster = value;
    });

    if (idFromparam) {
      // mach die Verbindung url zu ws server mit param

      connectionUrl += `/${idFromparam}`;
    }

    websocketStore.connect(connectionUrl); // \\lobby?roomId=123455

    console.log(connectionUrl);

    let unsubscribeWs = websocketStore.subscribe((wsData) => {
      if (!wsData) return;
      // check with Bachel to share his Types and enums, so I can reuse it, now for just for testing using fix values:
      // set rommId as info message = 6 ->got room id
      //console.log(wsData);
      if (wsData.messageType === WsMessageType.ROOM_STATUS) {
        //generate the room url
        generatedLink = `${window.location.origin}/lobby?roomId=${(wsData.value as MinRoom).roomId}`;
      } else {
        console.log(wsData);
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
