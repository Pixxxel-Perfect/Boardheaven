<script lang="ts">
  import Colorbox from "$lib/components/colorbox/colorbox.svelte";

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
      <Colorbox color={yellow}></Colorbox>
      <Colorbox color={green}></Colorbox>
      <Colorbox color={red}></Colorbox>
      <Colorbox color={black}></Colorbox>
    </div>
  </div>
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
</style>
