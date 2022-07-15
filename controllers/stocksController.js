var yahooFinance = require('yahoo-finance');
var humanize = require('humanize-plus')
function calculateAnalystTrend(trend) {
    // console.log(trend.buy + trend.strongBuy)
    // console.log(trend.sell + trend.strongSell + trend.hold + trend.buy + trend.strongBuy)
    return parseInt(parseFloat(trend.buy + trend.strongBuy) / parseFloat(((trend.buy+trend.sell + trend.strongBuy + trend.strongSell + trend.hold))) * 100)
}

module.exports.getDow = async (req, res, next) => {
    try {
        const { dow } = req.body;

        const stocks = []
        for (let index = 0; index < dow.length; index++) {
            // console.log(dow[index])
            await yahooFinance.quote({
                symbol: dow[index],
                modules: ['price',  'recommendationTrend']       // optional; default modules.
            }, (err, quote) => {
                stocks.push({
                    name: quote.price.shortName,
                    symbol: quote.price.symbol,
                    price: quote.price.regularMarketPrice,
                    today: parseFloat((quote.price.regularMarketChangePercent * 100).toFixed(2)),
                    marketCap: humanize.intComma(quote.price.marketCap),
                    analystRating: calculateAnalystTrend(quote.recommendationTrend.trend[0])
                })
                // console.log(quote);
            });
        }
        res.json(stocks)
    } catch (error) {
        next(error)
    }
}

module.exports.getStockDetails = async (req, res, next) => {
    const stockid = req.params.stockid
    var data = {}
    await yahooFinance.quote({
        symbol: stockid,
        modules: ['price',  'recommendationTrend']       // optional; default modules.
    }, (err, quote) => {
        data = {
            name: quote.price.shortName,
            symbol: quote.price.symbol,
            price: quote.price.regularMarketPrice,
            today: parseFloat((quote.price.regularMarketChangePercent * 100).toFixed(2)),
            marketCap: humanize.intComma(quote.price.marketCap),
            analystRating: calculateAnalystTrend(quote.recommendationTrend.trend[0])
        }
        // console.log(quote);
    });
    res.json(data)
}