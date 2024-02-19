<script lang="ts">
  import { websocketStore } from "../../../stores/websocketStore";
  import {
    selectedColorStore,
    setSelectedColor,
    setSelectedColorId,
    selectedColorIdStore,
  } from "./colorStore";
  import { onMount } from "svelte";

  export let color: string;
  export let colorid: number;

  let isSelected: boolean = false;

  //let selectedColorId: number | null = null;

  let selectedBy: string = "";

  onMount(() => {
    let unsubscribeColor = selectedColorStore.subscribe((value) => {
      if (value !== color) {
        isSelected = false;
        selectedBy = "";
      } else {
        isSelected = true;
        selectedBy = "You";
      }
    });

    let unsubscribeWebsocket = websocketStore.subscribe((wsData) => {
      if (!wsData) return;
      //got color selectd message
      if (wsData.type === 7 && wsData.value === colorid) {
        //the value represents the button to disable
        isSelected = true;
      }
    });

    /*let unsubscribeColorSelection = selectedColorIdStore.subscribe((value) => {
      selectedColorId = value;
    });*/

    return () => {
      unsubscribeColor();
      unsubscribeWebsocket();
      //unsubscribeColorSelection();
    };
  });

  function selectItem(): void {
    setSelectedColor(color);
    //setSelectedColorId(colorid);
    //I need the correct type for set-color command
    // sending type = 0 means -> set color
    websocketStore.send(JSON.stringify({ type: 0, value: colorid }));
  }

  function colorBoxBlack(): string {
    if (color === "#000000") return "white";
    return "black";
  }
</script>

<button
  id={colorid.toString()}
  class="color-box"
  style="--box-color: {color}; {isSelected
    ? 'background-color: gray;'
    : `${color}`}"
  on:click={selectItem}
  disabled={isSelected}
  ><p class="selected-text" style="--text-color: {colorBoxBlack()}">
    {selectedBy}
  </p>
</button>

<style>
  .color-box {
    border-radius: 36px;
    background-color: var(--box-color);
    width: 150px;
    height: 186px;
    margin-top: 15px;
    outline: 3px solid transparent;
    transition: transform 200ms ease-in-out;
  }

  .color-box:hover:enabled {
    transform: scale(1.05, 1.02);
    transition: transform 330ms ease-in-out;
  }

  .selected-text {
    color: var(--text-color);

    font-weight: bold;
  }
</style>
