<template>
    <div class="options-panel">
        <div class="final-total">

        </div>
        <div class="total" v-for="(option, optionIndex) in trade.options">
            <span v-if="option.type !== 'strip'">Option total</span>
            <span v-for="(leg, legIndex) in option.legs" v-if="option.type === 'strip'" class="total">Leg total</span>
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

<style lang="scss">
    .options-panel, .option {
        display: flex;
    }

    .total {
        width: 15vw;
    }

    .final-total {
        width: 10vw;
    }
</style>
