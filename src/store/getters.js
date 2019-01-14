import { getTradeObject, getTotalsReducer } from './helpers';

export default {
  getTrade: getTradeObject,
  getTradeTotals: state => (id) => {
    const trade = getTradeObject(state)(id);
    return trade.options.reduce(getTotalsReducer, { low: 0, high: 0 });
  },
};
