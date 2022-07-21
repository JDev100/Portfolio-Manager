const stockDetails = require('../utils/stockDetails')


describe('Yahoo API call with gets valid quote', () => {

    it('Name and ticker returned from data is valid according to passed parameter', async () => {
        let res = await stockDetails.getQuote('AAPL')
        expect(res.symbol).toBe('AAPL');
        expect(res.name).toBe('Apple Inc.')
    });
})