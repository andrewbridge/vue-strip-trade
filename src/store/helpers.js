const dateFormat = 'YYYY-MM-DD';

export default {
  getTradeObject: state => id => state.trades.find(trade => trade.id === id),
  getTradeIndex: state => id => state.trades.findIndex(trade => trade.id === id),
  getTotalsReducer(totals, option) {
    return { low: totals.low + option.lowValue, high: totals.high + option.highValue };
  },
  generateLegs(baseOption) {
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
  },
};
