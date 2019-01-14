<template>
    <div class="options-panel">
        <div class="field-labels">

        </div>
        <div class="option" v-for="(option, index) in trade.options">
            <Option :tradeId="id" :optionId="index" v-if="option.type !== 'strip'"></Option>
            <!-- If it is a strip loop through each leg -->
        </div>
    </div>
</template>

<script>
import Option from './Option.vue';
/*import { mapMutations } from 'vuex';

const getAndEmit = (fieldName) => {
  return {
    get() {
      return this.trade[fieldName];
    },
    set(newValue) {
      this.editTrade({ id: this.id, changes: { [fieldName]: newValue } });
    },
  };
};*/

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
  methods: mapMutations(['editTrade']),
};
</script>

<style scoped lang="scss">

</style>
