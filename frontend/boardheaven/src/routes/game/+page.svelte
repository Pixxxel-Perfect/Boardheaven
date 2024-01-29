<script lang="ts">
  import Wuerfel from "$lib/images/Wuerfel.png";
  import Chatbox from "$lib/components/chatbox/chatbox.svelte";
  import { chatStore } from "$lib/components/chatbox/chatStore";
  import settingsicon  from "$lib/images/settings.png";
  import { onMount } from "svelte";


  let ws: WebSocket;

  // test
  onMount(() => {
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
  });

  function sendMessage(message: string) {
    //use ws to send the  message!!!
    //ws.send(message);
    console.log("parent", message);
  }
</script>



<div>
  <div class="container">
    <div>
      <button class="leave-button">
        <span class="leave-arrow">&#10132;</span> Leave
      </button>
      
      <button class="settings-button">
        <img src={settingsicon} alt="Settings" class="settings-icon"/>
      </button>
    </div>

    <div class="board">
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleGreen"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleRed"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleBlack"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleYellow"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
      <div class="circle circleDefault"></div>
  
      <div class="circle circleFullGreen"></div>
      <div class="circle circleFullGreen"></div>
      <div class="circle circleFullGreen"></div>
      <div class="circle circleFullGreen"></div>
  
      <div class="circle circleFullRed"></div>
      <div class="circle circleFullRed"></div>
      <div class="circle circleFullRed"></div>
      <div class="circle circleFullRed"></div>
  
      <div class="circle circleFullBlack"></div>
      <div class="circle circleFullBlack"></div>
      <div class="circle circleFullBlack"></div>
      <div class="circle circleFullBlack"></div>
  
      <div class="circle circleFullYellow"></div>
      <div class="circle circleFullYellow"></div>
      <div class="circle circleFullYellow"></div>
      <div class="circle circleFullYellow"></div>
  
      <div class="circle circleGreen"></div>
      <div class="circle circleGreen"></div>
      <div class="circle circleGreen"></div>
      <div class="circle circleGreen"></div>
  
      <div class="circle circleRed"></div>
      <div class="circle circleRed"></div>
      <div class="circle circleRed"></div>
      <div class="circle circleRed"></div>
  
      <div class="circle circleBlack"></div>
      <div class="circle circleBlack"></div>
      <div class="circle circleBlack"></div>
      <div class="circle circleBlack"></div>
  
      <div class="circle circleYellow"></div>
      <div class="circle circleYellow"></div>
      <div class="circle circleYellow"></div>
      <div class="circle circleYellow"></div>
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





  <!--   if we mange to solve the problem as described in chatbox.svelte, we can than use the psendMsg property to expose
  the sendMessage functon to the child components
 -->
  <!--<Chatbox wsSendMessage={sendMessage}></Chatbox>-->
</div>

<style>
  .playerHeadline{
    font-size: 28px;
    color: #000000;
  }
  .playerColorYellow{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#F9FF00; 
    border-radius: 40px; 
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #000000;
}
  .playerColorGreen{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#1ED225; 
    border-radius: 40px; 
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #000000;
  }
  .playerColorRed{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#FD0000; 
    border-radius: 40px; 
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #000000;
  }
  .playerColorBlack{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#000000; 
    border-radius: 40px; 
    height: 5vh;
    width: 20vh;
    margin-bottom: 10px;
    color: #ffffff;
  }
.playerStats {
  background-color:#F1F1F1;
  border-radius: 12px; 
  padding: 10px; 
  height: 35vh;
}

.container {
  display: flex; 
  gap: 20px; /*Warum geht das nicht? */
}

.settings-button {
  transition: all 0.1s ease-in;
  padding-top:5px;
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

.leave-button {
  margin-bottom: 10px;
  transition: all 0.1s ease-in;
  padding: 10px 20px; 
  background-color: #f70000; 
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
    grid-row: 1;
  }
  .circle:nth-child(2) {
    grid-column: 6;
    grid-row: 1;
  }
  .circleGreen:nth-child(3) {
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
  .circleRed:nth-child(13) {
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
  .circleBlack:nth-child(23) {
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
  .circleYellow:nth-child(33) {
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

  /*
Full Circles
*/
  .circleFullGreen:nth-child(41) {
    grid-column: 6;
    grid-row: 2;
  }
  .circleFullGreen:nth-child(42) {
    grid-column: 6;
    grid-row: 3;
  }
  .circleFullGreen:nth-child(43) {
    grid-column: 6;
    grid-row: 4;
  }
  .circleFullGreen:nth-child(44) {
    grid-column: 6;
    grid-row: 5;
  }

  .circleFullRed:nth-child(45) {
    grid-column: 7;
    grid-row: 6;
  }
  .circleFullRed:nth-child(46) {
    grid-column: 8;
    grid-row: 6;
  }
  .circleFullRed:nth-child(47) {
    grid-column: 9;
    grid-row: 6;
  }
  .circleFullRed:nth-child(48) {
    grid-column: 10;
    grid-row: 6;
  }

  .circleFullBlack:nth-child(49) {
    grid-column: 6;
    grid-row: 7;
  }
  .circleFullBlack:nth-child(50) {
    grid-column: 6;
    grid-row: 8;
  }
  .circleFullBlack:nth-child(51) {
    grid-column: 6;
    grid-row: 9;
  }
  .circleFullBlack:nth-child(52) {
    grid-column: 6;
    grid-row: 10;
  }

  .circleFullYellow:nth-child(53) {
    grid-column: 2;
    grid-row: 6;
  }
  .circleFullYellow:nth-child(54) {
    grid-column: 3;
    grid-row: 6;
  }
  .circleFullYellow:nth-child(55) {
    grid-column: 4;
    grid-row: 6;
  }
  .circleFullYellow:nth-child(56) {
    grid-column: 5;
    grid-row: 6;
  }

  /*
Home Circles
*/
  .circleGreen:nth-child(57) {
    grid-column: 10;
    grid-row: 1;
  }
  .circleGreen:nth-child(58) {
    grid-column: 11;
    grid-row: 1;
  }
  .circleGreen:nth-child(59) {
    grid-column: 10;
    grid-row: 2;
  }
  .circleGreen:nth-child(60) {
    grid-column: 11;
    grid-row: 2;
  }

  .circleRed:nth-child(61) {
    grid-column: 10;
    grid-row: 10;
  }
  .circleRed:nth-child(62) {
    grid-column: 11;
    grid-row: 10;
  }
  .circleRed:nth-child(63) {
    grid-column: 10;
    grid-row: 11;
  }
  .circleRed:nth-child(64) {
    grid-column: 11;
    grid-row: 11;
  }

  .circleBlack:nth-child(65) {
    grid-column: 1;
    grid-row: 10;
  }
  .circleBlack:nth-child(66) {
    grid-column: 2;
    grid-row: 10;
  }
  .circleBlack:nth-child(67) {
    grid-column: 1;
    grid-row: 11;
  }
  .circleBlack:nth-child(68) {
    grid-column: 2;
    grid-row: 11;
  }

  .circleYellow:nth-child(69) {
    grid-column: 1;
    grid-row: 1;
  }
  .circleYellow:nth-child(70) {
    grid-column: 2;
    grid-row: 1;
  }
  .circleYellow:nth-child(71) {
    grid-column: 1;
    grid-row: 2;
  }
  .circleYellow:nth-child(72) {
    grid-column: 2;
    grid-row: 2;
  }
</style>
