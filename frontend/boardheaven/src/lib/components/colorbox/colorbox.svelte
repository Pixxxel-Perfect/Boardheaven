<script lang="ts">
  import { websocketStore } from "../../../stores/websocketStore";
  import { selectedColorStore, setSelectedColor } from "./colorStore";
  import { onMount } from "svelte";

  export let color: string;
  export let colorid: number;

  let isSelected: boolean = false;

  let selectedBy: string = "";

  onMount(() => {
    let unsubscribeColor = selectedColorStore.subscribe((value) => {
      isSelected = value === color;
      selectedBy = isSelected ? "You" : "";
    });

    let unsubscribeWebsocket = websocketStore.subscribe((wsData) => {
      if (!wsData) return;
      //got color selectd message
      if (wsData.type === 7) {
        //the value represents the button to disable
        isSelected = colorid === wsData.value;
      }
    });

    return () => {
      unsubscribeColor();
      unsubscribeWebsocket();
    };
  });

  function selectItem(): void {
    setSelectedColor(color);
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
  style="background-color: {isSelected ? '#949494' : color};"
  on:click={selectItem}
  disabled={isSelected}
  ><p class="selected-text" style="--text-color: {colorBoxBlack()}">
    {selectedBy}
  </p>
</button>

<style>
  .color-box {
    border-radius: 36px;
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
