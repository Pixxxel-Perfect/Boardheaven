<script lang="ts">
  import { selectedColor, setSelectedColor } from "./colorStore";
  import { onMount } from "svelte";

  export let color: string;

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
    width: 171px;
    height: 207px;
    margin-top: 15px;
    outline: 3px solid transparent;
  }

  .selected-text {
    color: var(--text-color);
  }
</style>
