<template>
    <div class="options-totals">
        <div class="final-total">

        </div>
        <div v-for="(option, optionIndex) in trade.options">
            <div v-if="option.type !== 'strip'" class="total">Option total</div>
            <div v-for="(leg, legIndex) in option.legs" v-if="option.type === 'strip'" class="leg-total">Leg total</div>
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
        //margin-top: 1.5rem;
    }

    .total {
        width: 300px;
    }

    .leg-total {
        width: 150px;
        display: inline-block;
    }

    .final-total {
        width: 160px;
    }
</style>
