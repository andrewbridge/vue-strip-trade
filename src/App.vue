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

</style>
