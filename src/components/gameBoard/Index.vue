<template>
  <div>
    <div class="board__block" v-if="cats.length > 0">
      <div
        v-for="(cat, key) in cats"
        v-bind:key="key"
        class="board__block-item"
      >
        <div
          class="board__item"
          :class="{'active' : cat.flip}"
          v-on:click="cardAction(cat)"
        >
          <img class="board__front" :src="cat.url">
          <img class="board__back" src="https://chto-takoe-lyubov.net/wp-content/uploads/2017/08/voprositelnyy-znak-stikhi.jpg">
        </div>
      </div>
    </div>
    <div class="board__button-block">
      <div v-on:click="gameRefresh()" class="board__button-item">
        <button class="board__button">
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'game-board',
  data() {
    return {
      cats: [],
      current: {
        first: null,
        second: null,
      }
    };
  },
  props: {
    limit: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    catsLimit() {
      return this.limit / 2;
    }
  },
  created() {
    axios.defaults.headers.common['x-api-key'] = this.api_key;
  },
  mounted() {
    this.getCats()
  },
  methods: {
    cardAction(item) {
      item.flip = item.flip === undefined ? true : !item.flip;
      if (this.current.first === null) {
        this.current.first = item.id;
        return false;
      }
      if (this.current.last === null) {
        this.current.last = item.id;
      }
      setTimeout(() => {
        if (this.current.first !== null && this.current.last !== null) {
          if (this.current.first !== this.current.last) {
            this.cats.forEach((item) => {
              if (item.id === this.current.first || item.id === this.current.last) {
                item.flip = false;
              }
            })
          }  
        }
        this.current = {
          first: null,
          last: null,
        }
        this.checkGame();
      }, 500)
    },
    gameRefresh() {
      this.getCats();
    },
    gameStart() {
      setTimeout(() => {
        this.cats.forEach((item) => {
          item.flip = false;
        })
      }, 5000);
    },
    checkGame() {
      let cache = true;
      this.cats.forEach((item) => {
        if (!item.flip) {
          cache = item.flip;
        }
      })
      if (cache) {
        alert('You WIN!');
        this.gameRefresh();
      }
    },
    getCats() {
      axios
        .get('https://api.thecatapi.com/v1/images/search', {
          params: {
            limit: this.catsLimit,
          }
        })
        .then((response) => {
          this.cats = [];
          this.current = {
            first: null,
            last: null,
          }
          let cache = [];
          response.data.forEach((item, key) => {
            const cacheItem = {
              url: item.url,
              flip: true,
              id: key,
            };
            cache.push({...cacheItem},{...cacheItem})
          })
          this.cats = cache.sort(() => Math.random() - 0.5);
          this.gameStart();
        })
    }
  },
};
</script>

<style src="./scss/_index.scss" lang="scss" scoped></style>
