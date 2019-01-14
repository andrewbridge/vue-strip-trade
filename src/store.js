import Vue from 'vue';
import Vuex from 'vuex';

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

  },
});
