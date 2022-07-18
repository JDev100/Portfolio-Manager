import React from 'react'
import styled from 'styled-components'

const Summary = ({ stockDetails }) => {
    function getDateFromInt(date) {
        var timestamp = Date.parse(date)
        console.log(timestamp)
        var d = new Date(parseInt(date))
        console.log(d)
        return d.toLocaleString('default', { month: 'short' }) + " " + d.getUTCDay() + ", " + d.getUTCFullYear()
    }
    function getDateFromEncoding(date) {
        // var timestamp = Date.parse(date)
        // console.log(timestamp)
        var d = new Date(date)
        console.log(d)
        return d.toLocaleString('default', { month: 'short' }) + " " + d.getUTCDay() + ", " + d.getUTCFullYear()
    }
    return (
        <Container>
            <div className="left">
                <div className="table-left">
                    <div className="table-row">
                        <p>Previous Close</p>
                        <strong>{stockDetails.previousClose}</strong>
                    </div>
                    <div className="table-row">
                        <p>Open</p>
                        <strong>{stockDetails.open}</strong>
                    </div>
                    <div className="table-row">
                        <p>Bid</p>
                        <strong>{stockDetails.bid}</strong>
                    </div>
                    <div className="table-row">
                        <p>Ask</p>
                        <strong>{stockDetails.ask}</strong>
                    </div>
                    <div className="table-row">
                        <p>Day's Range</p>
                        <strong>{stockDetails.dayLow} - {stockDetails.dayHigh}</strong>
                    </div>
                    <div className="table-row">
                        <p>52 Week Range</p>
                        <strong>{stockDetails.fiftyTwoWeekLow} - {stockDetails.fiftyTwoWeekHigh}</strong>
                    </div>
                    <div className="table-row">
                        <p>Volume</p>
                        <strong>{stockDetails.volume}</strong>
                    </div>
                    <div className="table-row">
                        <p>Avg. Volume</p>
                        <strong>{stockDetails.averageVolume}</strong>
                    </div>
                </div>
                <div className="table-right">
                    <div className="table-row">
                        <p>Market Cap</p>
                        <strong>{stockDetails.marketCap}</strong>
                    </div>
                    <div className="table-row">
                        <p>Beta (5Y Monthly)</p>
                        <strong>{stockDetails.beta}</strong>
                    </div>
                    <div className="table-row">
                        <p>PE Ratio (TTM)</p>
                        <strong>{stockDetails.trailingPE}</strong>
                    </div>
                    <div className="table-row">
                        <p>EPS (TTM)</p>
                        <strong>{stockDetails.trailingEps}</strong>
                    </div>
                    <div className="table-row">
                        <p>Earnings Date</p>
                        <strong>{getDateFromInt(stockDetails.earningsDate)}</strong>
                    </div>
                    <div className="table-row">
                        <p>Forward Dividend & Yield</p>
                        <strong>{stockDetails.dividendYield}({stockDetails.dividendRate}%)</strong>
                    </div>
                    <div className="table-row">
                        <p>Ex-Dividend Date</p>
                        <strong>{getDateFromEncoding(stockDetails.exDividendDate)}</strong>
                    </div>
                    <div className="table-row">
                        <p>1yr Target Est</p>
                        <strong>{stockDetails.targetPrice}</strong>
                    </div>
                </div>

            </div>
            <div className="right">
                <h1>po</h1>
            </div>

        </Container>

    )
}

export const Container = styled.div`
    display: flex;
    width: 100%;
    gap: 1rem;
    flex-wrap: wrap;
    p {
        margin: 0;
    }
    
    .left {
        gap: 1rem;
        width: 50%;
        /* width: 100%; */
        display: flex;
        .table-left, .table-right {
            width: 50%;
        }
        .table-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dotted rgba(0, 0, 0, 0.5);
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            border-bottom: 1px dotted #eee;
            border-bottom: 1px solid #ccc;
            padding: 1rem 0;
        }
    }
    @media (max-width: 1200px) {
    .left {
        width: 100%;
    }
  }
`

export default Summary