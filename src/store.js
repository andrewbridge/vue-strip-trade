import Vue from 'vue';
import Vuex from 'vuex';
import { uniqueId } from 'lodash';
import moment from 'moment';

Vue.use(Vuex);

const getTradeObject = state => id => state.trades.find(trade => trade.id === id);
const getTradeIndex = state => id => state.trades.findIndex(trade => trade.id === id);

export default new Vuex.Store({
  state: {
    trades: [],
    optionClasses: [
      'Vanilla',
      'Cash deals',
      'Barriers',
      'European digital',
      'Partial/Window barrier',
      'Target structures',
      'Fader',
      'Average options',
      'Accrual options',
      'Binaries',
      'Accumulator template',
    ],
  },
  getters: {
    getTrade: getTradeObject,
  },
  mutations: {
    addTrade(state, trade) {
      state.trades.push(trade);
    },
    addStripTrade(state, { baseTrade, stripTrade }) {
      // add trade after base trade
      const baseIndex = getTradeIndex(state)(baseTrade.id);

      state.trades.splice(baseIndex + 1, 0, stripTrade);
    },
    editTrade(state, {id, changes}) { // edit by path? merge?
      // Get the trade and merge in changes
      const index = getTradeIndex(state)(id);
      const trade = state.trades[index];

      Vue.set(state.trades, index, {...trade, changes});
    },
  },
  actions: {
    // actions for the above mutations?
    createTrade(context) {
      const id = uniqueId('trade-'); // Dummy only, this is dicey
      const now = moment();
      context.commit('addTrade', {
        id,
        optionClass: 'vanilla',
        type: 'buy',
        strike: 0,
        beginDate: now.format('YYYY-MM-DD'),
        endDate: now.add(1, 'month').format('YYYY-MM-DD'),
        expiries: 0,
        notionalInAmount: 0,
        notionalInType: 'sell',
      });
      return id;
    },
    createStripTrade() {
      // Create logic to adhere to strip rules (loop)
      // Add ids between base and strip trades?
      // Cater for base trades that already have that relationship?
    },
    updateTrade() {
      // Can we update everything in the strip when we update the base?
    },
  },
});
