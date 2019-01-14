<template>
    <div>
        <OptionClass v-model="optionClass"></OptionClass>
        <div>
            {{trade.fromCurrency}} {{type}}
            <button v-on:click="this.toggleOptionType">🔁</button>
        </div>
        <input type="number" v-model="strike">
        <div class="empty"></div>
        <div class="empty"></div>
        <div>
            <label for="beginDate">Strip begin date</label>
            <input type="date" id="beginDate" v-model="beginDate">
        </div>
        <div>
            <label for="endDate">Strip end date</label>
            <input type="date" id="endDate" v-model="endDate">
        </div>
        <div>
            <label for="expiries">Expiries:</label>
            <input type="number" id="expiries" v-model="expiries">
        </div>
        <div class="empty"></div>
        <button v-on:click="stripDetails">Strip details</button>
        <div>
            <span>Leg total notional:</span>
        </div>
        <div>
            600,000
        </div>
        <div>
            <input type="number" v-model="notionalInAmount">
            <button v-on:click="this.toggleOptionNotionalType">{{notionalInType}} 🔁</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import OptionClass from './OptionClass.vue';

const getAndEmit = (fieldName) => {
  return {
    get() {
      return this.option ? this.option[fieldName] : '';
    },
    set(newValue) {
      const { tradeId, optionId } = this;
      this.editOption({ tradeId, optionId, changes: { [fieldName]: newValue } });
    }
  }
};

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
    ...['optionClass', 'type', 'strike', 'beginDate', 'endDate', 'expiries', 'notionalInAmount', 'notionalInType'].reduce((funcs, prop) => Object.assign(funcs, {[prop]: getAndEmit(prop)}), {}),
    trade() {
      return this.$store.getters.getTrade(this.tradeId);
    },
    option() {
      return this.trade.options[this.optionId];
    },
  },
  methods: {
    ...mapMutations(['editOption']),
    stripDetails() {
      const { tradeId, optionId } = this;
      this.$store.dispatch('createStripOption', { tradeId, baseOptionId: optionId });
    },
    toggleOptionType() {
      const { tradeId, optionId } = this;
      this.$store.commit('toggleOptionType', { tradeId, optionId });
    },
    toggleOptionNotionalType() {
      const { tradeId, optionId } = this;
      this.$store.commit('toggleOptionNotionalType', { tradeId, optionId });
    },
  }
};
</script>
