<template>
    <div>
        <div>
            {{optionClass}}
        </div>
        <div>
            {{trade.fromCurrency}} {{type}}
        </div>
        <div>
            {{strike}}
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        {{beginDate}}
        {{endDate}}
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div>
            {{notionalInAmount}} {{notionalInType}}
        </div>
    </div>
</template>

<script>
const genericGetter = fieldName => function () { return this.leg[fieldName]; };

export default {
  name: 'Leg',
  props: {
    tradeId: String,
    optionId: Number,
    legId: Number,
  },
  computed: {
    ...['optionClass', 'type', 'strike', 'beginDate', 'endDate', 'expiries', 'notionalInAmount', 'notionalInType'].reduce((funcs, prop) => Object.assign(funcs, {[prop]: genericGetter(prop)}), {}),
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
