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
            <span>Currency pair</span>
            <span class="inline-dropdown">
                <Currency v-model="fromCurrency"></Currency>
                <Currency v-model="toCurrency"></Currency>
            </span>
        </div>
        <div class="big field">
            <span>Portfolio:</span>
            <label for="spot">Spot</label>
            <input type="number" id="spot" v-model="spotPrice">
        </div>
        <span class="field">Contains:</span>
        <span class="field">
            {{trade.options.length}} option{{ trade.options.length !== 1 ? 's' : ''}}
        </span>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Currency from './Currency.vue';

const getAndEmit = fieldName => ({
  get() {
    return this.trade[fieldName];
  },
  set(newValue) {
    this.editTrade({ id: this.id, changes: { [fieldName]: newValue } });
  },
});

export default {
  name: 'TradeInformation',
  components: { Currency },
  props: {
    id: String,
  },
  computed: {
    ...['tradeDate', 'spotDate', 'dataSnap', 'fromCurrency', 'toCurrency', 'spotPrice'].reduce((funcs, prop) => Object.assign(funcs, { [prop]: getAndEmit(prop) }), {}),
    ...mapState(['currencies']),
    trade() {
      return this.$store.getters.getTrade(this.id);
    },
  },
  methods: mapMutations(['editTrade']),
};
</script>

<style scoped lang="scss">
    $fieldHeight: 25px;
    $bigFieldHeight: $fieldHeight * 2;

    .trade-information {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: $bigFieldHeight + 10px;
        padding: 5px 10px;
        background: #ebeef8;
        margin: 1.5rem;
        border-radius: 0.5em;
    }

    .field {
        height: $fieldHeight;
        margin: 0 2em;
        &.big {
            height: $bigFieldHeight;
            & > span {
                display: block;
                height: $fieldHeight;
            }
        }
    }

    .inline-dropdown {
        & > * {
            width: calc(50% - 0.25em);
            display: inline-block;
        }
    }
</style>
