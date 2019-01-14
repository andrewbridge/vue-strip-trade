<template>
    <div class="field-container" data-cy="optionLeg">
        <div>
            {{optionClass}}
        </div>
        <div data-cy="legType">
            {{trade.fromCurrency}} {{type}}
        </div>
        <div>
            {{strike}}
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div>
            {{beginDate}}
        </div>
        <div>
            {{endDate}}
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div data-cy="legNotionalType">
            {{notionalInAmount}} {{notionalInType}}
        </div>
    </div>
</template>

<script>
const genericGetter = fieldName => function getter() { return this.leg[fieldName]; };

export default {
  name: 'Leg',
  props: {
    tradeId: String,
    optionId: Number,
    legId: Number,
  },
  computed: {
    ...['optionClass', 'type', 'strike', 'beginDate', 'endDate', 'expiries', 'notionalInAmount', 'notionalInType'].reduce((funcs, prop) => Object.assign(funcs, { [prop]: genericGetter(prop) }), {}),
    trade() {
      return this.$store.getters.getTrade(this.tradeId);
    },
    option() {
      if ('options' in this.trade && Array.isArray(this.trade.options)) {
        return this.trade.options[this.optionId];
      }
      return null;
    },
    leg() {
      return this.option.legs[this.legId];
    },
  },
};
</script>

<style scoped lang="scss">
    .field-container {
        width: 150px;
        border: 3px solid #0a217f;

        & > :nth-child(2n) {
            background: #cce4ff;
        }
        & > :nth-child(2n + 1) {
            background: #b0d6ff;
        }
    }
</style>
