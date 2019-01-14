import Vue from 'vue';
import { getTradeObject, getTradeIndex } from './helpers';

export default {
  addTrade(state, trade) {
    state.trades.push(trade);
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
};
