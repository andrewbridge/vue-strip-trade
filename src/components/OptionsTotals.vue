<template>
    <div class="options-totals">
        <div>
            <div class="final-total">{{finalTotal}}</div>
        </div>
        <div v-for="(option, optionIndex) in trade.options" v-bind:key="optionIndex">
            <div
                    v-if="option.type !== 'strip'"
                    class="total">{{option.lowValue}}/{{option.highValue}}</div>
            <div
                    v-for="(leg, legIndex) in option.legs"
                    v-bind:key="legIndex"
                    v-if="option.type === 'strip'"
                    class="leg-total">{{leg.lowValue}}/{{leg.highValue}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'OptionsTotals',
  props: {
    id: String,
  },
  computed: {
    trade() {
      return this.$store.getters.getTrade(this.id);
    },
    finalTotal() {
      const totals = this.$store.getters.getTradeTotals(this.id);
      return `${totals.low}/${totals.high}`;
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
    .options-totals {
        display: flex;
        margin-top: 1.5rem;

        & > * {
            white-space: nowrap;
        }
    }

    .total {
        width: 300px;
        background: #3776f1;
        color: white;
    }

    .final-total, .leg-total {
        background: #091f7e;
        color: white;
    }

    .leg-total {
        width: 150px;
        display: inline-block;
    }

    .final-total {
        width: 160px;
    }
</style>
