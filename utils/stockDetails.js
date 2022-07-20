var yahooFinance = require('yahoo-finance');

async function getQuote(ticker) {
    data = ''
    await yahooFinance.quote({
        symbol: ticker,
        modules: ['price']       // optional; default modules.
    }, (err, quote) => {
        // stocks.push({
        //     name: quote.price.shortName,
        //     symbol: quote.price.symbol,
        //     price: quote.price.regularMarketPrice,
        //     today: parseFloat((quote.price.regularMarketChangePercent * 100).toFixed(2)),
        //     marketCap: humanize.intComma(quote.price.marketCap),
        //     analystRating: calculateAnalystTrend(quote.recommendationTrend.trend[0])
        // })
        data = quote.price.symbol
    });
    return data
}

exports.getQuote = getQuote