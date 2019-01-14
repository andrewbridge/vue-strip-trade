import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
  mutations: {
    addTrade(state, trade) {
      // push to trades
    },
    addStripTrade(state, payload) {
      // add trade after base trade
    },
    editTrade(state, payload) { // edit by path? merge?
      // Get the trade and merge in changes
    },
  },
  actions: {
    // actions for the above mutations?
  },
});
