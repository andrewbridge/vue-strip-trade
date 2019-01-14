<template>
    <div class="options-panel">
        <div class="field-labels">

        </div>
        <div class="option" v-for="(option, optionIndex) in trade.options">
            <Option :tradeId="id" :optionId="optionIndex" v-if="option.type !== 'strip'"></Option>
            <Leg :tradeId="id" :optionId="optionIndex" :legId="legIndex" v-for="(leg, legIndex) in option.legs" v-if="option.type === 'strip'"></Leg>
        </div>
        <div class="option">
            <button v-on:click="createOption">+</button>
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

<style scoped lang="scss">

</style>
