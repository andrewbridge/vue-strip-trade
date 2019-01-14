<template>
    <div class="options-panel">
        <div>

        </div>
        <div v-for="(option, optionIndex) in trade.options">
            {{ getTotal(option, optionIndex) }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'OptionTotals',
  props: {
    id: String,
  },
  computed: {
    trade() {
      return this.$store.getters.getTrade(this.id);
    },
  },
  methods: {
    getTotal(option) {
      let low = 0;
      let high = 0;

      if (option.type !== 'strip' && 'stripOptionId' in option) {
        const stripTotals = this.$store.getters.getStripTotals({ tradeId: this.id, stripOptionId: option.stripOptionId });
        low = stripTotals.low;
        high = stripTotals.high;
      } else {
        low = option.lowTotal;
        high = option.highTotal;
      }
      return `${low}/${high}`;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
