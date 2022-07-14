var yahooFinance = require('yahoo-finance');

module.exports.getDow = async (req, res, next) => {
    try {
        const { dow } = req.body;

        const stocks = []
        for (let index = 0; index < dow.length; index++) {
            console.log(dow[index])
            await yahooFinance.quote({
                symbol: dow[index],
                modules: ['price', 'summaryDetail', 'recommendationTrend']       // optional; default modules.
            }, (err, quote) => {
                stocks.push(quote)
                console.log(quote);
            });
        }
        res.json(stocks)
    } catch (error) {
        next(error)
    }
}