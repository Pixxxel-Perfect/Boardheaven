<script lang="ts">
  import { selectedColor, setSelectedColor } from "./colorStore";
  import { onMount } from "svelte";

  export let color: string;
  export let colorid: number;

  let selectedBy: string = "";

  onMount(() => {
    let unsubscribe = selectedColor.subscribe((value) => {
      if (value !== color) selectedBy = "";
      else selectedBy = "You";
    });

    return () => {
      unsubscribe();
    };
  });

  function selectItem(): void {
    setSelectedColor(color);
  }

  function colorBoxBlack(): string {
    if (color === "#000000") return "white";
    return "black";
  }
</script>

<button class="color-box" style="--box-color: {color}" on:click={selectItem}
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

  .color-box:hover {
    transform: scale(1.05, 1.02);
    transition: transform 330ms ease-in-out;
  }

  .selected-text {
    color: var(--text-color);
    font-weight: bold;
  }
</style>
