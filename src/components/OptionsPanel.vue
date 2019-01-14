<template>
    <div class="options-panel">
        <div class="field-labels">

        </div>
        <div class="option" v-for="(option, index) in trade.options">
            <Option :tradeId="id" :optionId="index" v-if="option.type !== 'strip'"></Option>
            <!-- If it is a strip loop through each leg -->
        </div>
        <div class="option">
            <button v-on:click="createOption">+</button>
        </div>
    </div>
</template>

<script>
import Option from './Option.vue';

export default {
  name: 'OptionsPanel',
  components: {
    Option,
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
