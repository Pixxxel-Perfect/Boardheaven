<script lang="ts">
  import { onMount } from "svelte";
  import { chatStore } from "../../../stores/chatStore";
  import Message from "./message.svelte";
  import type { ParentSendMessage } from "../../utils";

  export let wsSendMessage: ParentSendMessage;

  let inputFiled: HTMLInputElement;
  let messages: string[] = [];
  let myMessage: string = "";

  onMount(() => {
    const unsubscribe = chatStore.subscribe((value) => {
      messages = value;
    });

    return () => {
      unsubscribe();
    };
  });

  function sendMessage() {
    // for now we can not use this function because of the problem described above!
    wsSendMessage(myMessage);

    console.log(myMessage);

    myMessage = "";
    if (inputFiled) {
      inputFiled.focus();
    }
  }
</script>

<div class="msg">
  {#each messages as msg, index}
    <Message name="Max Mustermann" message={msg} />
  {/each}
  <input type="text" bind:value={myMessage} bind:this={inputFiled} />
  <button on:click={sendMessage}>send</button>
</div>
