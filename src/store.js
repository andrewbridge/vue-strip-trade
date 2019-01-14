import Vue from 'vue';
import Vuex from 'vuex';
import { uniqueId, random } from 'lodash';
import moment from 'moment';

Vue.use(Vuex);

const dateFormat = 'YYYY-MM-DD';
const getTradeObject = state => id => state.trades.find(trade => trade.id === id);
const getTradeIndex = state => id => state.trades.findIndex(trade => trade.id === id);
const getTotalsReducer = (totals, option) => {
  return { low: totals.low + option.low, high: totals.high + option.high };
};

const generateLegs = (baseOption) => {
  const beginDate = moment(baseOption.beginDate);
  const legs = [];
  for (let i = 0; i < baseOption.expiries; i += 1) {
    legs.push({
      optionClass: baseOption.optionClass,
      type: baseOption.type === 'put' ? 'call' : 'put',
      beginDate: beginDate.format(dateFormat),
      endDate: beginDate.clone().add(1, 'month').subtract(1, 'day').format(dateFormat),
      notionalInAmount: baseOption.notionalInAmount,
      notionalInType: baseOption.notionalInType === 'sell' ? 'buy' : 'sell',
      lowValue: random(-1000, 500, false),
      highValue: random(-500, 1000, false),
    });
    beginDate.add(1, 'month');
  }
  return legs;
};

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
    currencies: [
      'GBP',
      'USD',
      'EUR',
    ],
  },
  getters: {
    getTrade: getTradeObject,
    /*getTradeTotals: state => (id) => {
      const trade = getTradeObject(state)(id);
      return trade.options.reduce((totals, option) => {
        if (option.type === 'strip') {
          return option.legs.reduce(getTotalsReducer, totals);
        }
        return getTotalsReducer(totals, option);
      }, { low: 0, high: 0 });
    },*/
    getStripTotals: state => (tradeId, stripOptionId) => {
      const trade = getTradeObject(state)(tradeId);
      return trade.options[stripOptionId].legs.reduce(getTotalsReducer, { low: 0, high: 0 });
    },
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
    },
  },
  actions: {
    // actions for the above mutations?
    createTrade({ commit }) {
      const id = uniqueId('trade-'); // Dummy only, this is dicey
      const nowTimestamp = moment().format('YYYY-MM-DD');
      commit('addTrade', {
        id,
        tradeDate: nowTimestamp,
        spotDate: nowTimestamp,
        dataSnap: 'Live rates',
        fromCurrency: 'GBP',
        toCurrency: 'USD',
        spotPrice: 0,
        options: [],
      });
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
          optionClass: 'Vanilla',
          type: 'call',
          strike: 0,
          beginDate: now.format('YYYY-MM-DD'),
          endDate: now.add(1, 'month').format('YYYY-MM-DD'),
          expiries: 0,
          notionalInAmount: 0,
          notionalInType: 'sell',
          lowValue: random(-1000, 500, false),
          highValue: random(-500, 1000, false),
        },
      });
      return optionId;
    },
    createStripOption({ state, commit }, { tradeId, baseOptionId }) {
      const trade = getTradeObject(state)(tradeId);
      const baseOption = trade.options[baseOptionId];

      if ('stripOptionId' in baseOption) {
        return baseOption.stripOptionId;
      }

      const optionId = baseOptionId + 1;
      const legs = generateLegs(baseOption);

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
    },
    updateOption({ state, commit }, { tradeId, optionId, changes }) {
      // Can we update everything in the strip when we update the base?
      const trade = getTradeObject(state)(tradeId);
      let option = trade.options[optionId];

      commit('editOption', {
        tradeId,
        optionId,
        changes,
      });

      option = trade.options[optionId];

      if ('stripOptionId' in option) {
        commit('editOption', {
          tradeId,
          optionId: option.stripOptionId,
          changes: {
            legs: generateLegs(option),
          },
        });
      }
    },
    toggleOptionValue({ state, dispatch }, { tradeId, optionId, value }) {
      const trade = getTradeObject(state)(tradeId);
      const option = trade.options[optionId];
      const changes = {};
      switch (value) {
        case 'type':
          changes[value] = option[value] === 'put' ? 'call' : 'put';
          break;
        case 'notionalInType':
          changes[value] = option[value] === 'sell' ? 'buy' : 'sell';
          break;
        default:
          //
      }

      return dispatch('updateOption', { tradeId, optionId, changes });
    },
  },
});
