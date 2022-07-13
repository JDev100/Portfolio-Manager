var yahooFinance = require('yahoo-finance');

yahooFinance.quote({
  symbol: 'TSLA',
  modules: ['price', 'summaryDetail']       // optional; default modules.
}, (err, quote) => {
  console.log(quote);
});