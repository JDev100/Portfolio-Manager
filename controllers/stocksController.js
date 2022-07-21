var yahooFinance = require('yahoo-finance');
var humanize = require('humanize-plus')
var stockDetails = require('../utils/stockDetails')

//From https://stackoverflow.com/questions/25416635/display-number-with-significant-figures-and-k-m-b-t-suffix-in-javascript
// Calculates significant figures with suffixes K/M/B/T, e.g. 1234 = 1.23K
function sigfig(num, sigfigs_opt) {
    // Set default sigfigs to 3
    sigfigs_opt = (typeof sigfigs_opt === "undefined") ? 3 : sigfigs_opt;
    // Only assigns sig figs and suffixes for numbers > 1
    if (num <= 1) return num.toPrecision(sigfigs_opt);
    // Calculate for numbers > 1
    var power10 = log10(num);
    var power10ceiling = Math.floor(power10) + 1;
    // 0 = '', 1 = 'K', 2 = 'M', 3 = 'B', 4 = 'T'
    var SUFFIXES = ['', 'K', 'M', 'B', 'T'];
    // 100: power10 = 2, suffixNum = 0, suffix = ''
    // 1000: power10 = 3, suffixNum = 1, suffix = 'K'
    var suffixNum = Math.floor(power10 / 3);
    var suffix = SUFFIXES[suffixNum];
    // Would be 1 for '', 1000 for 'K', 1000000 for 'M', etc.
    var suffixPower10 = Math.pow(10, suffixNum * 3);
    var base = num / suffixPower10;
    var baseRound = base.toPrecision(sigfigs_opt);
    return baseRound + suffix;
}

function log10(num) {
    // Per http://stackoverflow.com/questions/3019278/how-can-i-specify-the-base-for-math-log-in-javascript#comment29970629_16868744
    // Handles floating-point errors log10(1000) otherwise fails at (2.99999996)
    return (Math.round(Math.log(num) / Math.LN10 * 1e6) / 1e6);
}

//Helper for getting week worth of stock info
function getDateXDaysAgo(numOfDays, date = new Date()) {
    const daysAgo = new Date(date.getTime());

    daysAgo.setDate(date.getDate() - numOfDays);

    return daysAgo;
}


module.exports.getDow = async (req, res, next) => {
    try {
        const { dow } = req.body;

        const stocks = []
        for (let index = 0; index < dow.length; index++) {
            
            var data = await stockDetails.getQuote(dow[index])

            stocks.push(data)
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
        modules: ['price', 'summaryDetail', 'defaultKeyStatistics', 'calendarEvents', 'financialData']       // optional; default modules.
    }, (err, quote) => {
        // console.log(quote)
        data = {
            name: quote.price.shortName,
            symbol: quote.price.symbol,
            price: quote.price.regularMarketPrice,
            today: parseFloat(quote.price.regularMarketChange.toFixed(2)),
            todayPcnt: parseFloat((quote.price.regularMarketChangePercent * 100)).toFixed(2),
            previousClose: quote.summaryDetail.previousClose,
            open: quote.summaryDetail.open,
            bid: quote.summaryDetail.bid,
            ask: quote.summaryDetail.ask,
            dayLow: quote.summaryDetail.dayLow,
            dayHigh: quote.summaryDetail.dayHigh,
            fiftyTwoWeekLow: quote.summaryDetail.fiftyTwoWeekLow.toFixed(2),
            fiftyTwoWeekHigh: quote.summaryDetail.fiftyTwoWeekHigh.toFixed(2),
            volume: humanize.intComma(quote.summaryDetail.volume),
            averageVolume: humanize.intComma(quote.summaryDetail.marketCap),
            marketCap: sigfig(quote.price.marketCap),
            beta: parseFloat(quote.summaryDetail.beta).toFixed(2),
            trailingPE: parseFloat(quote.summaryDetail.trailingPE).toFixed(2),
            trailingEps: parseFloat(quote.defaultKeyStatistics.trailingEps).toFixed(2),
            earningsDate: quote.calendarEvents.earnings.earningsDate,
            dividendYield: parseFloat(quote.summaryDetail.trailingAnnualDividendYield).toFixed(2),
            dividendRate: quote.summaryDetail.trailingAnnualDividendRate,
            exDividendDate: quote.summaryDetail.exDividendDate,
            targetPrice: quote.financialData.targetMedianPrice
        }
    });

    const today = new Date()
    const weekAgo = getDateXDaysAgo(30, today)

    //Get Historical data
    await yahooFinance.historical({
        symbol: stockid,
        from: weekAgo,
        to: today,
        period: 'd'
    }, function (err, quotes) {
        var historical = quotes;
        historical.sort((a, b) => a.date - b.date)

        console.log(historical)

        data.historical = historical
    })


    res.json(data)
}