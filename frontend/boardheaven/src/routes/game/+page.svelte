<script lang="ts">
  import { chatStore } from "../../stores/chatStore";
  import settingsicon from "$lib/images/settings.png";
  import { onMount } from "svelte";
  import arrowicon from "$lib/images/arrowright.svg";
  import { websocketStore, WsMessageType } from "../../stores/websocketStore";
  import type { MinGameState } from "../../helper/minGameState";
  import { MinColor } from "../../helper/minClient";
  import type { MinGamePiece } from "../../helper/minGamePiece";
  import { WsMessage } from "../../helper/wsMessage";
  import wuerfel2 from "../../lib/images/Wuerfel.png";
  import next from "../../lib/images/next.png";
  import back from "../../lib/images/back.png";
  import pause from "../../lib/images/pause.png";
  import play from "../../lib/images/play.png";
  import volumeIcon from "../../lib/images/volume.png";
  import { selectedColorIdStore } from "../../stores/colorStore";
  import song1 from "../../lib/Songs/Hoodtrap Beat Japonsko.mp3";
  import song2 from "../../lib/Songs/AprilVibe3Mutantboy4.mp3";

  let ws: WebSocket;
  const circles = [
    "circleBlack",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleYellow",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleGreen",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleRed",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleDefault",
    "circleFullBlack",
    "circleFullBlack",
    "circleFullBlack",
    "circleFullBlack",
    "circleFullYellow",
    "circleFullYellow",
    "circleFullYellow",
    "circleFullYellow",
    "circleFullGreen",
    "circleFullGreen",
    "circleFullGreen",
    "circleFullGreen",
    "circleFullRed",
    "circleFullRed",
    "circleFullRed",
    "circleFullRed",
    "circleBlack",
    "circleBlack",
    "circleBlack",
    "circleBlack",
    "circleYellow",
    "circleYellow",
    "circleYellow",
    "circleYellow",
    "circleGreen",
    "circleGreen",
    "circleGreen",
    "circleGreen",
    "circleRed",
    "circleRed",
    "circleRed",
    "circleRed",
  ];

  let colors = [
    { id: MinColor.YELLOW, name: "Yellow", show: true },
    { id: MinColor.GREEN, name: "Green", show: true },
    { id: MinColor.RED, name: "Red", show: true },
    { id: MinColor.BLACK, name: "Black", show: true },
  ];

  let selectedColorId: number = -1;
  let turnColorId: number = 0;

  // Needs to be reactive --> Sets every non-selected color: false
  $: colors = colors.map((color) => ({
    ...color,
    show: selectedColorId !== color.id,
  }));

  /*const colorGradients: { [key: number]: string } = {
    [MinColor.YELLOW]: "linear-gradient(to right, yellow, orange)",
    [MinColor.GREEN]: "linear-gradient(to right, green, lightgreen)",
    [MinColor.RED]: "linear-gradient(to right, red, orangered)",
    [MinColor.BLACK]: "linear-gradient(to right, black, darkgray)",
  };*/

  //let gradientColor: string;

  //$: gradientColor = colorGradients[turnColorId];

  // test
  onMount(() => {
    //addPawnSVG();
    //Establish the WS connection
    //here you need to connect to WebSocket
    //check for incomming message
    // filter message (if it's a game-message or chat-message)
    // process game message or
    // pass the chat messages over the chatStore to the chatBox component as following
    chatStore.update((messages) => [
      ...messages,
      "here we are with a test message",
    ]);
    chatStore.update((messages) => [
      ...messages,
      "and this is the best game!!!! ÄöÜ?",
    ]);
    chatStore.update((messages) => [...messages, "PK"]);

    let unsubscribeSelectedColorIdStore = selectedColorIdStore.subscribe(
      (value) => {
        selectedColorId = value as number;
        console.log(selectedColorId);
      },
    );

    let unsubscribeWs = websocketStore.subscribe((wsData) => {
      if (!wsData) {
        console.log("No data received");
        return;
      }
      if (wsData.messageType === WsMessageType.GAME_STATUS) {
        var data: MinGameState = wsData.value as MinGameState;

        pawns.length = 0;

        data.pieces.forEach((piece: MinGamePiece) => {
          data.pieces.forEach((piece: MinGamePiece) => {
            pawns.push({
              pos: piece.pos,
              color: piece.color,
              homePos: piece.homePos,
              initPos: piece.initPos,
            });
          });
        });
        dice = data.diceThrow;

        /*data.currentPlayerColor.forEach((player: MinClient, index) => {
          if (data.playingPlayerIndex === index) {
            turnColorId = player.color;
          }
        });*/
        turnColorId = data.currentPlayerColor;

        console.log(data);
      } else {
        console.log(wsData);
      }
    });

    return () => {
      unsubscribeWs();
      unsubscribeSelectedColorIdStore();
    };
  });
  var dice = 999;

  let showPawn = false;
  function toggleSVG() {
    showPawn = !showPawn;
  }
  function sendMessage(message: string) {
    //use ws to send the  message!!!
    //ws.send(message);
    console.log("parent", message);
  }
  var pawns: MinGamePiece[] = [
    //  { index: -4, color: "green" },
  ];

  /*function smartIndex(pos: number) {
    const oneOffset = pos % 10;
    const tenOffset = (pos % 100) - oneOffset;

    if (pos < 0) return 55 - pos;
    if (pos < 100) return pos;

    return pos - 60 - tenOffset * 6;
  }*/

  function smartIndex(pos: number) {
    if (pos >= 110 && pos <= 113) {
      return 44 + (pos - 110);
    } else if (pos >= 100 && pos <= 103) {
      return 40 + (pos - 100);
    } else if (pos >= 120 && pos <= 123) {
      return 48 + (pos - 120);
    } else if (pos >= 130 && pos <= 133) {
      return 52 + (pos - 130);
    } else if (pos >= -16 && pos <= -1) {
      return 56 + Math.abs(pos + 1);
    }
    return pos;
  }

  function reverseSmartIndex(pos: number) {
    var varpos: number = pos;
    if (pos >= 56 && pos <= 71) {
      varpos = -1 - (pos - 56);
    }
    if (pos >= 44 && pos <= 47) {
      varpos = 110 + (pos - 44);
    } else if (pos >= 40 && pos <= 43) {
      varpos = 100 + (pos - 40);
    } else if (pos >= 48 && pos <= 51) {
      varpos = 120 + (pos - 48);
    } else if (pos >= 52 && pos <= 55) {
      varpos = 130 + (pos - 52);
    }
    const pawn = pawns.find((pawn) => pawn.pos === varpos);
    console.log(pawn);
    if (pawn == null) return;
    const message = new WsMessage<MinGamePiece>(WsMessageType.TURN_ACTION, {
      pos: varpos,
      color: pawn?.color,
      homePos: pawn?.homePos,
      initPos: pawn?.initPos,
    });
    console.log(message);
    websocketStore.send(JSON.stringify(message));
  }

  function getColorNameByColorIndex(pawn: Number) {
    switch (pawn) {
      case MinColor.BLACK:
        return "black";
      case MinColor.RED:
        return "red";
      case MinColor.YELLOW:
        return "yellow";
      case MinColor.GREEN:
        return "green";
      default:
        return "black";
    }
  }

  function pressedPawn(): any {
    throw new Error("Pressed Pawn");
  }
  let isModalOpen = false;
  let modal;

  let songs = [song1, song2];
  let currentSongIndex = 0;
  let isPlaying = false;
  let volume = 1;
  let audio: any;


  if (typeof window !== 'undefined') {
    audio = new Audio(songs[currentSongIndex]);
    audio.onended = nextSong;
  }
  function togglePlay() {
    isPlaying ? audio.pause() : audio.play();
    isPlaying = !isPlaying;
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex];
    audio.play();
    isPlaying = true;
  }

  function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentSongIndex];
    audio.play();
    isPlaying = true;
  }

  function changeVolume(event: any) {
    volume = event.target.value;
    audio.volume = volume;
  }

  let progress = 0;
  if (typeof window !== 'undefined') {
    setInterval(() => {
      if (audio.duration) {
        progress = (audio.currentTime / audio.duration) * 100;
      }
    }, 1000);
  }
</script>

{#if isModalOpen}
  <div class="modal" bind:this={modal}>
    <button class="close-button" on:click={() => (isModalOpen = false)}
      >X</button
    >
    <!-- Modal content goes here -->
    <h1>Settings</h1>
    <h2>Traditional Figures</h2>
    <label class="switch">
      <input type="checkbox" bind:checked={showPawn} />
      <span class="slider round"></span>
    </label>
    <a class="leave-button" href="/"> Leave Game</a>
  </div>
{/if}
<div class={isModalOpen ? "everything" : ""}>
  <div class="container">
    <div class="board">
      {#each circles as circleClass, index}
        <div class={`circle ${circleClass}`}>
          {#if pawns.find((pawn) => smartIndex(pawn.pos) === index)}
            <button
              on:click={() => reverseSmartIndex(index)}
              style="all: unset;"
            >
              {#if showPawn}
                <svg
                  fill={getColorNameByColorIndex(
                    pawns.find((pawn) => smartIndex(pawn.pos) === index)
                      ?.color ?? 0,
                  )}
                  stroke="white"
                  stroke-width="0.8"
                  class="pawn"
                  width="800px"
                  height="800px"
                  viewBox="-3.8 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.777 23.384c-0.147-0.983-0.91-1.857-2.058-2.507-3.059-1.95-3.595-5.268-2.184-7.45 1.799-0.518 3.028-1.562 3.028-2.766 0-1.095-1.017-2.058-2.555-2.613 0.788-0.786 1.277-1.875 1.277-3.079 0-2.396-1.933-4.338-4.318-4.338s-4.318 1.942-4.318 4.338c0 1.204 0.488 2.292 1.276 3.078-1.538 0.555-2.556 1.518-2.556 2.613 0 1.218 1.259 2.273 3.093 2.784 1.434 2.175 0.824 5.451-2.332 7.463-1.107 0.646-1.834 1.513-1.975 2.477-1.989 0.842-3.235 2.047-3.235 3.386 0 2.544 4.498 4.607 10.047 4.607s10.047-2.062 10.047-4.607c0-1.339-1.247-2.545-3.237-3.387z"
                  ></path>
                </svg>
              {:else}
                <svg
                  class="pawn"
                  width="800px"
                  height="800px"
                  viewBox="-9.5 0 25 22"
                  id="meteor-icon-kit__solid-pawn"
                  fill={getColorNameByColorIndex(
                    pawns.find((pawn) => smartIndex(pawn.pos) === index)
                      ?.color ?? 0,
                  )}
                  stroke="white"
                  stroke-width="0.8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.88138 8.90846C1.73464 7.99226 1 6.58192 1 5C1 2.23858 3.23858 0 6 0C8.7614 0 11 2.23858 11 5C11 6.5814 10.2658 7.99133 9.1198 8.90755L11.0777 13.8831C11.6866 15.4306 12.0015 17.1081 12.0015 18.8049V21C12.0015 21.5523 11.5538 22 11.0015 22H1C0.44772 22 0 21.5523 0 21L0 18.8049C0 17.1081 0.31487 15.4306 0.92382 13.8831L2.88138 8.90846z"
                  />
                </svg>
              {/if}
            </button>
          {/if}
        </div>
      {/each}
    </div>

    <div>
      <div class="pointer" hidden>
        <img src={arrowicon} alt="arrow" class="arrow-icon" />
      </div>

      <!--Switched to each block to use sveltekit animation:flip, but dropped the idea. I'll leave it as it is tho-->

      <!-- <div class="playerStats">
        <h2 class="playerHeadline">Player</h2>
        <div class="playerColorYellow">
          <h4 class:hideNonSelected={showYellow}>Me</h4>
        </div>
        <div class="playerColorGreen">
          <h4 class:hideNonSelected={showGreen}>Me</h4>
        </div>
        <div class="playerColorRed xxpulse">
          <h4 class:hideNonSelected={showRed}>Me</h4>
        </div>
        <div class="playerColorBlack">
          <h4 class:hideNonSelected={showBlack}>Me</h4>
        </div>
      </div> -->

      <div class="playerStats">
        <h2 class="playerHeadline">Player</h2>
        {#each colors as color}
          <div
            class="playerColor{color.name} {turnColorId !== color.id
              ? 'notTurn'
              : ''}"
          >
            <h4 class:hideNonSelected={color.show}>Me</h4>
          </div>
        {/each}
        <div class="flexer">
          <img src={wuerfel2} alt="Würfel" />
          <h1 class="padding">{dice !== 999 ? dice : ''}</h1>
        </div>
        <div>
          <button class="settings-button" on:click={() => (isModalOpen = true)}>
            <span class="button-text">Settings</span>
            <img src={settingsicon} alt="Settings" class="settings-icon" />
          </button>
        </div>
        <div class="player">
          <h2 style="text-align: center;">{songs[currentSongIndex]?.split('/').pop()?.replace('.mp3', '')}</h2>
          <div class="button-group">
            <button class="player-button" on:click={previousSong}>
              <img class="imgfitter" src={back} alt="back" />
            </button>
            <button class="player-button" on:click={togglePlay}>
              <img class="imgfitter" src={isPlaying ? pause : play} alt="playpause" />
            </button>
            <button class="player-button" on:click={nextSong}>
              <img class="imgfitter" src={next} alt="next" />
            </button>
          </div>
          <progress class="progress-bar" value={progress} max="100"></progress>
          <div class="button-group">
            <img class="volumefitter" src={volumeIcon} alt="Sound icon">
            <input class="player-slider" type="range" min="0" max="1" step="0.01" bind:value={volume} on:input={changeVolume} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .volumefitter{
    height: 15px;
  }
  .progress-bar {
    width: 80%;
    height: 15px;
    background-color: #f3f3f3;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 5px;
  }

  .progress-bar::-webkit-progress-bar {
    background-color: #f3f3f3;
  }

  .progress-bar::-webkit-progress-value {
    background-color: #000000;
  }

  .progress-bar::-moz-progress-bar {
    background-color: #007bff;
  }
  .imgfitter{
    width: 20px;
    height: 20px;
  }
  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
  }

  .player h2 {
    margin-bottom: 10px;
  }

  .player-button {
    margin: 4px;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    padding-top: 8px;
    background-color: #ffffff;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .player-button:hover {
    background-color: #aaaaaa;
  }

  .player-slider {
    width: 83%;
    margin-top: 10px;
  }
  .everything {
    filter: blur(10px);
    z-index: 1;
  }
  .modal {
    padding: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    height: fit-content;
    width: 300px;
  }
  .close-button {
    padding-top: 2px;
    padding-bottom: 2px;

    position: absolute;
    top: 0;
    right: 0;
    background-color: rgb(134, 134, 134);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin: 10px;
  }
  .padding {
    padding-left: 20px;
  }

  .flexer {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-bottom: 10px;
  }

  .notTurn {
    opacity: 0.3;
  }

  .hideNonSelected {
    display: none;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-bottom: 20px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #3a7bd5;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #3a7bd5;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .pawn {
    width: 80%;
    height: 80%;
  }
  .playerHeadline {
    font-size: 28px;
    color: #000000;
  }
  .playerColorYellow {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    border-radius: 40px;
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #000000;
  }
  .playerColorGreen {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: green;
    border-radius: 40px;
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #ffffff;
  }
  .playerColorRed {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    border-radius: 40px;
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #000000;
  }
  .playerColorBlack {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    border-radius: 40px;
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #ffffff;
  }
  .playerStats {
    background-color: #f1f1f1;
    border-radius: 10px;
    padding: 10px;
    height: 35vh;
  }
  .pointer {
    width: 5vh;
    height: 5vh;
    background-color: #f1f1f1;
    border-radius: 20%;
  }

  .container {
    display: flex;
    gap: 20px;
    flex-wrap: nowrap; 
  }

  @media (max-width: 600px) {
    .container {
      flex-wrap: wrap;
    }
  }
  .button-text {
    padding-right: 10px;
  }
  .settings-button {
    transition: all 0.3s ease-in-out;
    padding: 10px 20px;
    background-color: #3a7bd5;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: x-large;
    font-family: Arial, sans-serif;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  }

  .settings-button:hover {
    background-color: #3a7bd5;
    box-shadow: 0px 15px 20px rgba(30, 190, 223, 0.4);
    transform: translateY(-7px);
  }

  .settings-icon {
    width: 30px;
    height: auto;
  }
  .arrow-icon {
    width: 40px;
    height: auto;
  }

  .leave-button {
    transition: all 0.1s ease-in;
    padding: 10px 20px;
    background-color: red;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .leave-arrow {
    font-size: 24px;
    margin-right: 8px;
  }

  .leave-button:hover {
    background-color: #db0202;
    box-shadow: 0px 15px 20px rgba(188, 0, 0, 0.4);
    transform: translateY(-3px);
  }
  .board {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
    gap: 10px;
  }

  .circle {
    aspect-ratio: 1;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .circle:hover {
    background-color: rgb(202, 202, 202);
    transition: all 0.2s ease-in;
  }
  .circleDefault {
    border: 0.2vw solid black;
  }
  .circleGreen {
    border: 0.5vw solid green;
  }
  .circleRed {
    border: 0.5vw solid red;
  }
  .circleBlack {
    border: 0.5vw solid black;
  }
  .circleYellow {
    border: 0.5vw solid yellow;
  }
  .circleFullGreen {
    background-color: green;
  }
  .circleFullRed {
    background-color: red;
  }
  .circleFullBlack {
    background-color: black;
  }
  .circleFullYellow {
    background-color: yellow;
  }

  .circle:nth-child(1) {
    grid-column: 5;
    grid-row: 11;
  }
  .circle:nth-child(2) {
    grid-column: 5;
    grid-row: 10;
  }
  .circle:nth-child(3) {
    grid-column: 5;
    grid-row: 9;
  }
  .circle:nth-child(4) {
    grid-column: 5;
    grid-row: 8;
  }
  .circle:nth-child(5) {
    grid-column: 5;
    grid-row: 7;
  }
  .circle:nth-child(6) {
    grid-column: 4;
    grid-row: 7;
  }
  .circle:nth-child(7) {
    grid-column: 3;
    grid-row: 7;
  }
  .circle:nth-child(8) {
    grid-column: 2;
    grid-row: 7;
  }
  .circle:nth-child(9) {
    grid-column: 1;
    grid-row: 7;
  }
  .circle:nth-child(10) {
    grid-column: 1;
    grid-row: 6;
  }
  .circle:nth-child(11) {
    grid-column: 1;
    grid-row: 5;
  }
  .circle:nth-child(12) {
    grid-column: 2;
    grid-row: 5;
  }
  .circle:nth-child(13) {
    grid-column: 3;
    grid-row: 5;
  }
  .circle:nth-child(14) {
    grid-column: 4;
    grid-row: 5;
  }
  .circle:nth-child(15) {
    grid-column: 5;
    grid-row: 5;
  }
  .circle:nth-child(16) {
    grid-column: 5;
    grid-row: 4;
  }
  .circle:nth-child(17) {
    grid-column: 5;
    grid-row: 3;
  }
  .circle:nth-child(18) {
    grid-column: 5;
    grid-row: 2;
  }
  .circle:nth-child(19) {
    grid-column: 5;
    grid-row: 1;
  }
  .circle:nth-child(20) {
    grid-column: 6;
    grid-row: 1;
  }
  .circle:nth-child(21) {
    grid-column: 7;
    grid-row: 1;
  }
  .circle:nth-child(22) {
    grid-column: 7;
    grid-row: 2;
  }
  .circle:nth-child(23) {
    grid-column: 7;
    grid-row: 3;
  }
  .circle:nth-child(24) {
    grid-column: 7;
    grid-row: 4;
  }
  .circle:nth-child(25) {
    grid-column: 7;
    grid-row: 5;
  }
  .circle:nth-child(26) {
    grid-column: 8;
    grid-row: 5;
  }
  .circle:nth-child(27) {
    grid-column: 9;
    grid-row: 5;
  }
  .circle:nth-child(28) {
    grid-column: 10;
    grid-row: 5;
  }
  .circle:nth-child(29) {
    grid-column: 11;
    grid-row: 5;
  }
  .circle:nth-child(30) {
    grid-column: 11;
    grid-row: 6;
  }
  .circle:nth-child(31) {
    grid-column: 11;
    grid-row: 7;
  }
  .circle:nth-child(32) {
    grid-column: 10;
    grid-row: 7;
  }
  .circle:nth-child(33) {
    grid-column: 9;
    grid-row: 7;
  }
  .circle:nth-child(34) {
    grid-column: 8;
    grid-row: 7;
  }
  .circle:nth-child(35) {
    grid-column: 7;
    grid-row: 7;
  }
  .circle:nth-child(36) {
    grid-column: 7;
    grid-row: 8;
  }
  .circle:nth-child(37) {
    grid-column: 7;
    grid-row: 9;
  }
  .circle:nth-child(38) {
    grid-column: 7;
    grid-row: 10;
  }
  .circle:nth-child(39) {
    grid-column: 7;
    grid-row: 11;
  }
  .circle:nth-child(40) {
    grid-column: 6;
    grid-row: 11;
  }
  /* Full Circles */
  .circle:nth-child(41) {
    grid-column: 6;
    grid-row: 10;
  }
  .circle:nth-child(42) {
    grid-column: 6;
    grid-row: 9;
  }
  .circle:nth-child(43) {
    grid-column: 6;
    grid-row: 8;
  }
  .circle:nth-child(44) {
    grid-column: 6;
    grid-row: 7;
  }
  .circle:nth-child(45) {
    grid-column: 2;
    grid-row: 6;
  }
  .circle:nth-child(46) {
    grid-column: 3;
    grid-row: 6;
  }
  .circle:nth-child(47) {
    grid-column: 4;
    grid-row: 6;
  }
  .circle:nth-child(48) {
    grid-column: 5;
    grid-row: 6;
  }
  .circle:nth-child(49) {
    grid-column: 6;
    grid-row: 2;
  }
  .circle:nth-child(50) {
    grid-column: 6;
    grid-row: 3;
  }
  .circle:nth-child(51) {
    grid-column: 6;
    grid-row: 4;
  }
  .circle:nth-child(52) {
    grid-column: 6;
    grid-row: 5;
  }
  .circle:nth-child(53) {
    grid-column: 10;
    grid-row: 6;
  }
  .circle:nth-child(54) {
    grid-column: 9;
    grid-row: 6;
  }
  .circle:nth-child(55) {
    grid-column: 8;
    grid-row: 6;
  }
  .circle:nth-child(56) {
    grid-column: 7;
    grid-row: 6;
  }
  .circle:nth-child(57) {
    grid-column: 2;
    grid-row: 11;
  }
  .circle:nth-child(58) {
    grid-column: 1;
    grid-row: 11;
  }
  /* Home Circles */
  .circle:nth-child(59) {
    grid-column: 2;
    grid-row: 10;
  }
  .circle:nth-child(60) {
    grid-column: 1;
    grid-row: 10;
  }
  .circle:nth-child(61) {
    grid-column: 2;
    grid-row: 2;
  }
  .circle:nth-child(62) {
    grid-column: 1;
    grid-row: 2;
  }
  .circle:nth-child(63) {
    grid-column: 2;
    grid-row: 1;
  }
  .circle:nth-child(64) {
    grid-column: 1;
    grid-row: 1;
  }
  .circle:nth-child(65) {
    grid-column: 11;
    grid-row: 2;
  }
  .circle:nth-child(66) {
    grid-column: 10;
    grid-row: 2;
  }
  .circle:nth-child(67) {
    grid-column: 11;
    grid-row: 1;
  }
  .circle:nth-child(68) {
    grid-column: 10;
    grid-row: 1;
  }
  .circle:nth-child(69) {
    grid-column: 11;
    grid-row: 10;
  }
  .circle:nth-child(70) {
    grid-column: 10;
    grid-row: 10;
  }
  .circle:nth-child(71) {
    grid-column: 11;
    grid-row: 11;
  }
  .circle:nth-child(72) {
    grid-column: 10;
    grid-row: 11;
  }
</style>
