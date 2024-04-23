<script lang="ts">
  import Colorbox from "$lib/components/colorbox/colorbox.svelte";
  import { isGameMaster } from "../../stores/gameMasterStore";
  import { onMount } from "svelte";
  import { websocketStore, WsMessageType } from "../../stores/websocketStore";
  import { page } from "$app/stores";
  import type { MinRoom } from "../../helper/minRoom";
  import { goto } from "$app/navigation";

  let idFromparam = $page.url.searchParams.get("roomId");
  //let connectionUrl = "ws://10.91.141.236:3000";
  let connectionUrl = `ws://192.168.1.149:3000`;

  let generatedLink: string | null = null;

  onMount(() => {
    let unsubscribeGameMaster = isGameMaster.subscribe((value) => {
      gameMaster = value;
    });

    if (idFromparam) {
      // make the connection to ws server with url param

      connectionUrl += `/${idFromparam}`;
    }

    websocketStore.connect(connectionUrl); // \\lobby?roomId=123455

    console.log(connectionUrl);

    let unsubscribeWs = websocketStore.subscribe((wsData) => {
      if (!wsData) return;
      console.log(wsData);
      if (wsData.messageType === WsMessageType.ROOM_STATUS) {
        //generate the room url
        generatedLink = `${window.location.origin}/lobby?roomId=${(wsData.value as MinRoom).roomId}`;
      }
      if (wsData.messageType === WsMessageType.GAME_STATUS) {
        goto("/game");
      } else {
        console.log(
          "message not room_status (will be ingnored in lobby):",
          wsData
        );
      }
    });

    return () => {
      unsubscribeGameMaster();
      unsubscribeWs();
    };
  });

  function startTheGame(): void {
    console.log("sending start_game message");
    websocketStore.send(
      JSON.stringify({
        messageType: WsMessageType.START_GAME,
      })
    );
  }

  function copyLinkTextbox(): void {
    if (generatedLink && window.isSecureContext) {
      navigator.clipboard.writeText(generatedLink);
    }
  }

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
        <button class="svg-container" on:click={() => copyLinkTextbox()}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            width="33px"
            height="33px"
            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g><g id="SVGRepo_iconCarrier">
              <path
                d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                stroke="#1C274C"
                stroke-width="1.5"
              ></path>
              <path
                opacity="0.5"
                d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                stroke="#1C274C"
                stroke-width="1.5"
              ></path>
            </g></svg
          >
        </button>
      </label>
      <button class="start-game-button" on:click={startTheGame}
        >Start game</button
      >
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
