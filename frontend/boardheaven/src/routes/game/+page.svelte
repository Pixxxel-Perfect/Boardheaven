<script lang="ts">
  import Wuerfel from "$lib/images/Wuerfel.png";
  import Chatbox from "$lib/components/chatbox/chatbox.svelte";
  import { chatStore } from "../../stores/chatStore";
  import settingsicon from "$lib/images/settings.png";
  import { onMount } from "svelte";
  import arrowicon from "$lib/images/arrowright.svg";
  import pawn from "$lib/images/pawn.svg";
  import { websocketStore, WsMessageType } from "../../stores/websocketStore";
  import type { GameState } from "../../helper/gameState";

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

    let unsubscribeWs = websocketStore.subscribe((wsData) => {
      if (!wsData) {
        console.log("No data received");
        return;
      }
      if (wsData.messageType === WsMessageType.GAME_STATUS) {
        var data: GameState = wsData.value as GameState;

        pawns.length = 0; 

        data.pieces.forEach((piece) => {
          pawns.push({ index: piece.pos, color: `${piece.color}` });
        });

        console.log(data);
      } else {
        console.log(wsData);
      }
    });
  });

  let showPawn = true;
  function toggleSVG() {
    showPawn = !showPawn; 
  }
  function sendMessage(message: string) {
    //use ws to send the  message!!!
    //ws.send(message);
    console.log("parent", message);
  }
  var pawns = [
    //{ index: -10, color: "green" },
    /*
    { index: 56, color: 'green' },
    { index: 57, color: 'green' },
    { index: 58, color: 'green' },
    { index: 59, color: 'green' },

    { index: 60, color: 'red' },
    { index: 61, color: 'red' },
    { index: 62, color: 'red' },
    { index: 63, color: 'red' },

    { index: 68, color: 'yellow' },
    { index: 69, color: 'yellow' },
    { index: 70, color: 'yellow' },
    { index: 71, color: 'yellow' },

    { index: 64, color: 'black' },
    { index: 65, color: 'black' },
    { index: 66, color: 'black' },
    { index: 67, color: 'black' },
    */
  ];
  function smartIndex(pawn: { index: any; color?: string }) {
    if (pawn.index >= 110 && pawn.index <= 113) {
      return 44 + (pawn.index - 110);
    } else if (pawn.index >= 100 && pawn.index <= 103) {
      return 40 + (pawn.index - 100);
    } else if (pawn.index >= 120 && pawn.index <= 123) {
      return 48 + (pawn.index - 120);
    } else if (pawn.index >= 130 && pawn.index <= 133) {
      return 52 + (pawn.index - 130);
    } else if (pawn.index >= -16 && pawn.index <= -1) {
      return 56 + Math.abs(pawn.index + 1);
    }
    return pawn.index;
  }
</script>

<div>
  <div class="container">
    <div>
      <h4>Change Skin</h4>
      <label class="switch">
        <input type="checkbox" bind:checked={showPawn} />
        <span class="slider round"></span>
      </label>
      <button class="leave-button">
        <span class="leave-arrow">&#10132;</span> Leave
      </button>
      <button class="settings-button">
        <img src={settingsicon} alt="Settings" class="settings-icon" />
      </button>
    </div>

    <div class="board">
      {#each circles as circleClass, index}
        <div class={`circle ${circleClass}`}>
          {#if pawns.find((pawn) => smartIndex(pawn) === index)}
            {#if showPawn}
              <svg
                class="pawn"
                width="800px"
                height="800px"
                viewBox="-5 0 22 22"
                id="meteor-icon-kit__solid-pawn"
                fill={pawns.find((pawn) => smartIndex(pawn) === index)?.color}
                stroke="black"
                stroke-width="0.4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.88138 8.90846C1.73464 7.99226 1 6.58192 1 5C1 2.23858 3.23858 0 6 0C8.7614 0 11 2.23858 11 5C11 6.5814 10.2658 7.99133 9.1198 8.90755L11.0777 13.8831C11.6866 15.4306 12.0015 17.1081 12.0015 18.8049V21C12.0015 21.5523 11.5538 22 11.0015 22H1C0.44772 22 0 21.5523 0 21L0 18.8049C0 17.1081 0.31487 15.4306 0.92382 13.8831L2.88138 8.90846z"
                />
              </svg>
            {:else}
              <svg
                fill={pawns.find((pawn) => smartIndex(pawn) === index)?.color}
                stroke="black"
                stroke-width="0.4"
                class="pawn"
                width="800px"
                height="800px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.777 23.384c-0.147-0.983-0.91-1.857-2.058-2.507-3.059-1.95-3.595-5.268-2.184-7.45 1.799-0.518 3.028-1.562 3.028-2.766 0-1.095-1.017-2.058-2.555-2.613 0.788-0.786 1.277-1.875 1.277-3.079 0-2.396-1.933-4.338-4.318-4.338s-4.318 1.942-4.318 4.338c0 1.204 0.488 2.292 1.276 3.078-1.538 0.555-2.556 1.518-2.556 2.613 0 1.218 1.259 2.273 3.093 2.784 1.434 2.175 0.824 5.451-2.332 7.463-1.107 0.646-1.834 1.513-1.975 2.477-1.989 0.842-3.235 2.047-3.235 3.386 0 2.544 4.498 4.607 10.047 4.607s10.047-2.062 10.047-4.607c0-1.339-1.247-2.545-3.237-3.387z"
                ></path>
              </svg>
            {/if}
          {/if}
        </div>
      {/each}
    </div>
    <div class="container">
      <div class="pointer">
        <img src={arrowicon} alt="arrow" class="arrow-icon" />
      </div>

      <div class="playerStats">
        <h2 class="playerHeadline">Player</h2>
        <div class="playerColorYellow">
          <h4>You</h4>
        </div>
        <div class="playerColorGreen">
          <!-- <h4>You</h4> -->
        </div>
        <div class="playerColorRed">
          <!-- <h4>You</h4> -->
        </div>
        <div class="playerColorBlack">
          <!-- <h4>You</h4> -->
        </div>
      </div>
    </div>
  </div>

  <!--   if we mange to solve the problem as described in chatbox.svelte, we can than use the psendMsg property to expose
  the sendMessage functon to the child components
 -->
  <!--<Chatbox wsSendMessage={sendMessage}></Chatbox>-->
</div>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-bottom: 30px;
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
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
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
    color: #000000;
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
    border-radius: 12px;
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
  }

  .settings-button {
    transition: all 0.1s ease-in;
    padding-top: 5px;
    background-color: rgb(197, 197, 197);
    border: none;
    cursor: pointer;
    border-radius: 50px;
  }
  .settings-button:hover {
    background-color: rgb(166, 166, 166);
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
    margin-bottom: 10px;
    transition: all 0.1s ease-in;
    padding: 10px 20px;
    background-color: red;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .leave-arrow {
    font-size: 24px;
    margin-right: 8px;
  }

  .leave-button:hover {
    background-color: #db0202;
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

  /*
  .circle:nth-child(1) {
    grid-column: 5;
    grid-row: 1;
  }
  .circle:nth-child(2) {
    grid-column: 6;
    grid-row: 1;
  }
  .circle:nth-child(3) {
    grid-column: 7;
    grid-row: 1;
  }
  .circle:nth-child(4) {
    grid-column: 7;
    grid-row: 2;
  }
  .circle:nth-child(5) {
    grid-column: 7;
    grid-row: 3;
  }
  .circle:nth-child(6) {
    grid-column: 7;
    grid-row: 4;
  }
  .circle:nth-child(7) {
    grid-column: 7;
    grid-row: 5;
  }
  .circle:nth-child(8) {
    grid-column: 8;
    grid-row: 5;
  }
  .circle:nth-child(9) {
    grid-column: 9;
    grid-row: 5;
  }
  .circle:nth-child(10) {
    grid-column: 10;
    grid-row: 5;
  }
  .circle:nth-child(11) {
    grid-column: 11;
    grid-row: 5;
  }
  .circle:nth-child(12) {
    grid-column: 11;
    grid-row: 6;
  }
  .circle:nth-child(13) {
    grid-column: 11;
    grid-row: 7;
  }
  .circle:nth-child(14) {
    grid-column: 10;
    grid-row: 7;
  }
  .circle:nth-child(15) {
    grid-column: 9;
    grid-row: 7;
  }
  .circle:nth-child(16) {
    grid-column: 8;
    grid-row: 7;
  }
  .circle:nth-child(17) {
    grid-column: 7;
    grid-row: 7;
  }
  .circle:nth-child(18) {
    grid-column: 7;
    grid-row: 8;
  }
  .circle:nth-child(19) {
    grid-column: 7;
    grid-row: 9;
  }
  .circle:nth-child(20) {
    grid-column: 7;
    grid-row: 10;
  }
  .circle:nth-child(21) {
    grid-column: 7;
    grid-row: 11;
  }
  .circle:nth-child(22) {
    grid-column: 6;
    grid-row: 11;
  }
  .circle:nth-child(23) {
    grid-column: 5;
    grid-row: 11;
  }
  .circle:nth-child(24) {
    grid-column: 5;
    grid-row: 10;
  }
  .circle:nth-child(25) {
    grid-column: 5;
    grid-row: 9;
  }
  .circle:nth-child(26) {
    grid-column: 5;
    grid-row: 8;
  }
  .circle:nth-child(27) {
    grid-column: 5;
    grid-row: 7;
  }
  .circle:nth-child(28) {
    grid-column: 4;
    grid-row: 7;
  }
  .circle:nth-child(29) {
    grid-column: 3;
    grid-row: 7;
  }
  .circle:nth-child(30) {
    grid-column: 2;
    grid-row: 7;
  }
  .circle:nth-child(31) {
    grid-column: 1;
    grid-row: 7;
  }
  .circle:nth-child(32) {
    grid-column: 1;
    grid-row: 6;
  }
  .circle:nth-child(33) {
    grid-column: 1;
    grid-row: 5;
  }
  .circle:nth-child(34) {
    grid-column: 2;
    grid-row: 5;
  }
  .circle:nth-child(35) {
    grid-column: 3;
    grid-row: 5;
  }
  .circle:nth-child(36) {
    grid-column: 4;
    grid-row: 5;
  }
  .circle:nth-child(37) {
    grid-column: 5;
    grid-row: 5;
  }
  .circle:nth-child(38) {
    grid-column: 5;
    grid-row: 4;
  }
  .circle:nth-child(39) {
    grid-column: 5;
    grid-row: 3;
  }
  .circle:nth-child(40) {
    grid-column: 5;
    grid-row: 2;
  }
*/
  /*
Full Circles
*/
  /*
  .circle:nth-child(41) {
    grid-column: 6;
    grid-row: 2;
  }
  .circle:nth-child(42) {
    grid-column: 6;
    grid-row: 3;
  }
  .circle:nth-child(43) {
    grid-column: 6;
    grid-row: 4;
  }
  .circle:nth-child(44) {
    grid-column: 6;
    grid-row: 5;
  }

  .circle:nth-child(45) {
    grid-column: 7;
    grid-row: 6;
  }
  .circle:nth-child(46) {
    grid-column: 8;
    grid-row: 6;
  }
  .circle:nth-child(47) {
    grid-column: 9;
    grid-row: 6;
  }
  .circle:nth-child(48) {
    grid-column: 10;
    grid-row: 6;
  }

  .circle:nth-child(49) {
    grid-column: 6;
    grid-row: 7;
  }
  .circle:nth-child(50) {
    grid-column: 6;
    grid-row: 8;
  }
  .circle:nth-child(51) {
    grid-column: 6;
    grid-row: 9;
  }
  .circle:nth-child(52) {
    grid-column: 6;
    grid-row: 10;
  }

  .circle:nth-child(53) {
    grid-column: 2;
    grid-row: 6;
  }
  .circle:nth-child(54) {
    grid-column: 3;
    grid-row: 6;
  }
  .circle:nth-child(55) {
    grid-column: 4;
    grid-row: 6;
  }
  .circle:nth-child(56) {
    grid-column: 5;
    grid-row: 6;
  }
*/
  /*
Home Circles
*/
  /*
  .circle:nth-child(57) {
    grid-column: 10;
    grid-row: 1;
  }
  .circle:nth-child(58) {
    grid-column: 11;
    grid-row: 1;
  }
  .circle:nth-child(59) {
    grid-column: 10;
    grid-row: 2;
  }
  .circle:nth-child(60) {
    grid-column: 11;
    grid-row: 2;
  }

  .circle:nth-child(61) {
    grid-column: 10;
    grid-row: 10;
  }
  .circle:nth-child(62) {
    grid-column: 11;
    grid-row: 10;
  }
  .circle:nth-child(63) {
    grid-column: 10;
    grid-row: 11;
  }
  .circle:nth-child(64) {
    grid-column: 11;
    grid-row: 11;
  }

  .circle:nth-child(65) {
    grid-column: 1;
    grid-row: 10;
  }
  .circle:nth-child(66) {
    grid-column: 2;
    grid-row: 10;
  }
  .circle:nth-child(67) {
    grid-column: 1;
    grid-row: 11;
  }
  .circle:nth-child(68) {
    grid-column: 2;
    grid-row: 11;
  }

  .circle:nth-child(69) {
    grid-column: 1;
    grid-row: 1;
  }
  .circle:nth-child(70) {
    grid-column: 2;
    grid-row: 1;
  }
  .circle:nth-child(71) {
    grid-column: 1;
    grid-row: 2;
  }
  .circle:nth-child(72) {
    grid-column: 2;
    grid-row: 2;
  }
  /* .circle:nth-child(73) {
    grid-column: 1;
    grid-row: 1;
  }
  .circle:nth-child(74) {
    grid-column: 2;
    grid-row: 1;
  } */
</style>
