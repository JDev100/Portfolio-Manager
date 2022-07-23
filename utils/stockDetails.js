var yahooFinance = require('yahoo-finance');
var humanize = require('humanize-plus')


//HELPER FUNCTIONS
function calculateAnalystTrend(trend) {
    return parseInt(parseFloat(trend.buy + trend.strongBuy) / parseFloat(((trend.buy + trend.sell + trend.strongBuy + trend.strongSell + trend.hold))) * 100)
}

async function getQuote(ticker) {
    data = {}
    await yahooFinance.quote({
        symbol: ticker,
        modules: ['price', 'recommendationTrend']       // optional; default modules.
    }, (err, quote) => {
        data = {
            name: quote.price.shortName,
            symbol: quote.price.symbol,
            price: quote.price.regularMarketPrice,
            today: parseFloat((quote.price.regularMarketChangePercent * 100).toFixed(2)),
            marketCap: humanize.intComma(quote.price.marketCap),
            analystRating: calculateAnalystTrend(quote.recommendationTrend.trend[0])
        }
    });
    return data
}

async function getQuoteManual(ticker) {
    var data = {}
    
    //YOU CAN DO MANUAL API CALL TO YAHOO FINANCE API
    //AND RETURN DATA 

    return data
}

exports.getQuote = getQuote
exports.getQuoteManual = getQuoteManual