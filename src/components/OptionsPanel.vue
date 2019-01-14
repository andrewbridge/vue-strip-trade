<template>
    <div class="options-panel">
        <div class="field-container labels">
            <span>option class</span>
            <span>call/put</span>
            <span>strike</span>
            <span>trigger 1</span>
            <span>trigger 2</span>
            <span>expiry (TK 3:00pm)</span>
            <span>delivery</span>
            <span>details</span>
            <span>volatility</span>
            <span>fwd points</span>
            <span>25d RR (%)</span>
            <span>25d Bfly (%)</span>
            <span>Notional in</span>
        </div>
        <div class="option" v-for="(option, optionIndex) in trade.options">
            <Option :tradeId="id" :optionId="optionIndex" v-if="option.type !== 'strip'"></Option>
            <Leg :tradeId="id" :optionId="optionIndex" :legId="legIndex" v-for="(leg, legIndex) in option.legs" v-if="option.type === 'strip'"></Leg>
        </div>
        <div class="option">
            <button v-on:click="createOption" class="add-prompt">+</button>
        </div>
    </div>
</template>

<script>
import Option from './Option.vue';
import Leg from './Leg.vue';

export default {
  name: 'OptionsPanel',
  components: {
    Option,
    Leg,
  },
  props: {
    id: String,
  },
  computed: {
    // ...['tradeDate', 'spotDate', 'dataSnap', 'fromCurrency', 'toCurrency', 'spotPrice'].reduce((funcs, prop) => Object.assign(funcs, { [prop]: getAndEmit(prop) }), {}),
    trade() {
      return this.$store.getters.getTrade(this.id);
    },
  },
  methods: {
    createOption() {
      this.$store.dispatch('createOption', { id: this.id });
    },
  },
};
</script>

<style lang="scss">
    .options-panel {
        display: flex;
        min-width: 100%;
    }

    .labels > * {
        width: 160px;
    }

    .option {
        display: flex;
    }

    .field-container > * {
        display: block;
        height: 25px;
        padding: 0.25em 0.5em;
    }

    button.add-prompt {
        font-size: 2em;
        min-width: 10vw;
        background: none;
        border: 3px solid #aec8ff;
    }
</style>
