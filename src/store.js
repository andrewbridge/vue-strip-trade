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

      Vue.set(state.trades, index, {...trade, ...changes});
    },
    addOption(state, { tradeId, optionId, option }) {
      const trade = getTradeObject(state)(tradeId);

      trade.options.splice(optionId, 0, option);
    },
    editOption(state, { tradeId, optionId, changes }) {
      const trade = getTradeObject(state)(tradeId);
      const option = trade.options[optionId];

      Vue.set(trade.options, optionId, { ...option, ...changes });
    }
  },
  actions: {
    // actions for the above mutations?
    createTrade({ commit }) {
      const id = uniqueId('trade-'); // Dummy only, this is dicey
      commit('addTrade', { id, options: [] });
      return id;
    },
    createOption({ state, commit }, { id }) {
      const trade = getTradeObject(state)(id);
      const now = moment();
      const optionId = trade.options.length;
      commit('addOption', {
        tradeId: id,
        optionId,
        option: {
          optionClass: 'vanilla',
          type: 'buy',
          strike: 0,
          beginDate: now.format('YYYY-MM-DD'),
          endDate: now.add(1, 'month').format('YYYY-MM-DD'),
          expiries: 0,
          notionalInAmount: 0,
          notionalInType: 'sell',
        },
      });
      return optionId;
    },
    createStripOption({ state, commit }, { tradeId, baseOptionId }) {
      const trade = getTradeObject(state)(tradeId);
      const baseOption = trade.options[baseOptionId];
      const beginDate = moment(baseOption.beginDate);
      const dateFormat = 'YYYY-MM-DD';
      const optionId = baseOptionId + 1;
      let legs = [];
      for (let i = 0; i < baseOption.expiries; i++) {
        legs.push({
          optionClass: baseOption.optionClass,
          type: baseOption.type === 'put' ? 'call' : 'put',
          beginDate: beginDate.format(dateFormat),
          endDate: beginDate.clone().add(1, 'month').subtract(1, 'day').format(dateFormat),
          notionalInAmount: baseOption.notionalInAmount,
          notionalInType: baseOption.notionalInType === 'sell' ? 'buy' : 'sell',
        });
        beginDate.add(1, 'month');
      }

      // Add strip option next to base
      commit('addOption', {
        tradeId,
        optionId,
        option: {
          baseOptionId,
          type: 'strip',
          legs,
        },
      });

      // Update base option with strip option id
      commit('editOption', {
        tradeId,
        optionId: baseOptionId,
        changes: {
          stripOptionId: optionId,
        },
      });

      return optionId;
      // Create logic to adhere to strip rules (loop)
      // Add ids between base and strip trades?
      // Cater for base trades that already have that relationship?
    },
    updateTrade() {
      // Can we update everything in the strip when we update the base?
    },
  },
});
