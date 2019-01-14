<template>
    <div class="field-container">
        <div class="full field">
            <OptionClass v-model="optionClass"></OptionClass>
        </div>
        <div class="button field">
            <span data-cy="optionType">{{trade.fromCurrency}} {{type}}</span>
            <button v-on:click="this.toggleOptionType" data-cy="optionTypeToggle">🔁</button>
        </div>
        <div class="full field">
            <input type="number" v-model="strike">
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="field">
            <label for="beginDate">Strip begin date</label>
            <input type="date" id="beginDate" v-model="beginDate">
        </div>
        <div class="field">
            <label for="endDate">Strip end date</label>
            <input type="date" id="endDate" v-model="endDate">
        </div>
        <div class="field">
            <label for="expiries">Expiries:</label>
            <input type="number" id="expiries" min="0" v-model="expiries" data-cy="optionExpiries">
        </div>
        <div class="empty"></div>
        <div>
            <button v-on:click="stripDetails" data-cy="optionSplitDetails">Strip details</button>
        </div>
        <div>
            <span>Leg total notional:</span>
        </div>
        <div>
            {{notionalInAmount * expiries}}
        </div>
        <div class="button field">
            <input type="number" v-model="notionalInAmount">
            <button
                    v-on:click="this.toggleOptionNotionalType"
                    data-cy="optionNotionalTypeToggle">{{notionalInType}} 🔁</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import OptionClass from './OptionClass.vue';

const getAndEmit = fieldName => ({
  get() {
    return this.option ? this.option[fieldName] : '';
  },
  set(newValue) {
    const { tradeId, optionId } = this;
    this.updateOption({ tradeId, optionId, changes: { [fieldName]: newValue } });
  },
});

export default {
  name: 'Option',
  components: {
    OptionClass,
  },
  props: {
    tradeId: String,
    optionId: Number,
  },
  computed: {
    ...['optionClass', 'type', 'strike', 'beginDate', 'endDate', 'expiries', 'notionalInAmount', 'notionalInType'].reduce((funcs, prop) => Object.assign(funcs, { [prop]: getAndEmit(prop) }), {}),
    trade() {
      return this.$store.getters.getTrade(this.tradeId);
    },
    option() {
      return this.trade.options[this.optionId];
    },
  },
  methods: {
    ...mapActions(['updateOption', 'toggleOptionValue', 'createStripOption']),
    stripDetails() {
      const { tradeId, optionId } = this;
      this.createStripOption({ tradeId, baseOptionId: optionId });
    },
    toggleOptionType() {
      const { tradeId, optionId } = this;
      this.toggleOptionValue({ tradeId, optionId, value: 'type' });
    },
    toggleOptionNotionalType() {
      const { tradeId, optionId } = this;
      this.toggleOptionValue({ tradeId, optionId, value: 'notionalInType' });
    },
  },
};
</script>

<style scoped lang="scss">
    .field-container {
        width: 300px;
        border: 3px solid #aec8ff;

        & > :nth-child(2n) {
            background: #e1eefc;
        }
        & > :nth-child(2n + 1) {
            background: #cee1f6;
        }
    }
</style>
