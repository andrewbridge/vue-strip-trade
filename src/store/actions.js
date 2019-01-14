import { uniqueId, random } from 'lodash';
import moment from 'moment';
import { getTradeObject, getTotalsReducer, generateLegs } from './helpers';

export default {
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
    const totals = legs.reduce(getTotalsReducer, { low: 0, high: 0 });

    // Add strip option next to base
    commit('addOption', {
      tradeId,
      optionId,
      option: {
        baseOptionId,
        type: 'strip',
        legs,
        lowValue: totals.low,
        highValue: totals.high,
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

    const legs = generateLegs(option);
    const totals = legs.reduce(getTotalsReducer, { low: 0, high: 0 });

    if ('stripOptionId' in option) {
      commit('editOption', {
        tradeId,
        optionId: option.stripOptionId,
        changes: {
          legs,
          lowValue: totals.low,
          highValue: totals.high,
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
};
