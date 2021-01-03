<template>
  <div class="container">
    <a class="gh-link" target="_blank" nref="https://github.com/tltary/memory-card-game/"></a>
    <h1>
      Memory game
    </h1>
    <game-board :limit="16" />
  </div>
</template>

<script>
import GameBoard from './components/gameBoard/Index';

export default {
  name: 'App',
  components: {
    'game-board': GameBoard,
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  body {
    background-color: #FF7F50;
    font-family: 'Lato', sans-serif;
    color: #fff;
  }

  .container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 50px 0px;
  }

  .gh-link {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  
</style>
