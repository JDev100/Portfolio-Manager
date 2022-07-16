import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStockDetailsRoute } from '../utils/APIRoutes'

const StockDetails = () => {
    const { stockid } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [stockDetails, setStockDetails] = useState(null)
    useEffect(() => {
        async function action() {
            // console.log(dowStocks)

            const response = await axios.get(`${getStockDetailsRoute}/${stockid}`)
            console.log(response.data)
            setStockDetails(response.data)
            setIsLoading(false)
        }
        action()
    }, [stockid])

    function getDateFromInt(date) {
        var timestamp = Date.parse(date)
        console.log(timestamp)
        var d = new Date(parseInt(date))
        console.log(d )
        return d.toLocaleString('default', {month:'short'}) + " " + d.getUTCDay() + ", " + d.getUTCFullYear ()
    }
    function getDateFromEncoding(date) {
        // var timestamp = Date.parse(date)
        // console.log(timestamp)
        var d = new Date(date)
        console.log(d )
        return d.toLocaleString('default', {month:'short'}) + " " + d.getUTCDay() + ", " + d.getUTCFullYear ()
    }


    return (
        <Container>
            {!isLoading && (
                <>
                    <div className={`main-header ${stockDetails.today < 0 ? 'red' : 'green'}`}>
                        <div className="bar"></div>
                        <div className="stock-info-main">
                            <h2>{stockDetails.name}</h2>

                            <h1>{stockDetails.price} <span className='change'>{stockDetails.today < 0 ? '' : '+'}{stockDetails.today}</span> <span className='changePcnt'>({stockDetails.today < 0 ? '' : '+'}{stockDetails.todayPcnt}%)</span></h1>
                        </div>
                        <div className='button-section'>
                            <button>Add to watchlist</button>
                        </div>
                    </div>

                    <div className="header">
                        <h3>{stockDetails.symbol} Stock Summary</h3>
                    </div>
                    <div className="stock-summary">
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
                            {/* <h1>po</h1> */}
                        </div>
                    </div>
                </>
            )}
        </Container>
    )
}

export const Container = styled.div`
  min-height: 75vh;
  max-width: 1400px;
  .header {
    margin-bottom: 2rem;
    width: 100%;
    border-bottom: 0.1rem solid #fff;
  }
  /* min-width: 780px; */
  margin: auto;
  /* width: 100%; */
  padding: 2rem 2rem;
  .main-header {
    gap: 1rem;

    width: 100%;
    .stock-info-main {
        /* flex: 1; */
        h2, h1 {
            margin-top: 0;
            margin-bottom: .5rem;
        }
        h1 {
    
            font-size: 2rem;
        }
        .change, .changePcnt {
            font-size: 1.2rem;
        }
        .changePcnt {
            color: #34c370;
        }
    }
    &.green  {
        .bar {
          background-color: #34c370;

        }
        .changePcnt {
            color: #34c370;
        }
    }
    &.red {
        .bar {
          background-color: #ff433d;

        }
        .changePcnt {
            color: #ff433d;
        }
    }
    .bar {
        /* background-color: #34c370; */
        /* background-color: #ff433d; */
        width: .9rem;
    }
    .button-section {
        flex-direction: column;
        display: flex;
        flex: 1;
        align-items: flex-end;
    }
    button {
        height: 3rem;
        padding: .5rem 1rem;
        justify-content: center;
        background-color: transparent;
        border: 1px solid white;
        color: white;
        cursor: pointer;
    }
    display: flex;
  }

  .stock-summary {
    display: flex;
    width: 100%;
    gap: 1rem;
    flex-wrap: wrap;
    p {
        margin: 0;
    }
    
    .left {
        gap: 1rem;
        /* width: 50%; */
        width: 100%;
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
  }
  @media (max-width: 1200px) {
    .stock-summary .left {
        width: 100%;
    }
  }
`

export default StockDetails