<template>
  <div id="app">
    <h1>Editing {{tradeId}}</h1>
    <TradeEdit :id="tradeId" v-if="tradeId"></TradeEdit>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TradeEdit from './components/TradeEdit.vue';

export default {
  name: 'app',
  components: {
    TradeEdit,
  },
  data() {
    return {
      tradeId: '',
    };
  },
  methods: mapActions(['createTrade']),
  async created() {
    this.tradeId = await this.createTrade();
  },
};
</script>

<style lang="scss">
  body {
    font-family: sans-serif;
  }

  .field {
    & > * {
      width: calc(50% - 0.25em);
      display: inline-block;
    }
    &.full {
      :first-child {
        width: calc(100% - 0.25em);
      }
    }
    &.button {
      :first-child {
        width: calc(75% - 0.25em);
      }
      :last-child {
        width: calc(25% - 0.25em);
      }
    }
  }
</style>
