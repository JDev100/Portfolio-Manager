const stockDetails = require('../utils/stockDetails')


describe('Yahoo API call with Ticker should return same Ticker', () => {

    it('should return valid data', async () => {
        let res = await stockDetails.getQuote('AAPL')
        expect(res).toBe('AAPL');
    });
})