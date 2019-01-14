<template>
    <div class="trade-information">
        <div class="field">
            <label for="trade-date">Trade date</label>
            <input type="date" id="trade-date" v-model="tradeDate">
        </div>
        <div class="field">
            <label for="spot-date">Spot date</label>
            <input type="date" id="spot-date" v-model="spotDate">
        </div>
        <div class="field">
            <label for="data-snap">Data snap</label>
            <select id="data-snap" v-model="dataSnap">
                <option>Live rates</option>
            </select>
        </div>
        <div class="field">
            <label for="currency-pair">Currency pair</label>
            <select id="currency-pair" v-model="fromCurrency">
                <option>GBP</option>
            </select>
            <select id="currency-pair" v-model="toCurrency">
                <option>USD</option>
            </select>
        </div>
        <div class="big field">
            <span>Portfolio:</span>
            <label for="spot">Spot</label>
            <input type="number" id="spot" v-model="spotPrice">
        </div>
        <span>Contains:</span>
        <span>12 Options, Total Notional (GBP): Sell 0.6M Buy 0.6M</span>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

const getAndEmit = (fieldName) => {
  return {
    get() {
      return this.trade[fieldName];
    },
    set(newValue) {
      this.editTrade({ id: this.id, changes: { [fieldName]: newValue } });
    },
  };
};

export default {
  name: 'TradeInformation',
  props: {
    id: String,
  },
  computed: {
    ...['tradeDate', 'spotDate', 'dataSnap', 'fromCurrency', 'toCurrency', 'spotPrice'].reduce((funcs, prop) => Object.assign(funcs, { [prop]: getAndEmit(prop) }), {}),
    trade() {
      return this.$store.getters.getTrade(this.id);
    },
  },
  methods: mapMutations(['editTrade']),
};
</script>

<style scoped lang="scss">

</style>
