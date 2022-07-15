import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StockDetails = ({ match }) => {
    const { stockid } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Container>
            {!isLoading && (
                <>
                    <div className="main-header">
                        <div className="bar"></div>
                        <div className="stock-info-main">
                            <h2>APPLE INC.</h2>

                            <h1>149.16 <span className='change'>+0.69</span> <span className='changePcnt'>(+0.46%)</span></h1>
                        </div>
                        <div className='button-section'>
                            <button>Add to watchlist</button>
                        </div>
                    </div>

                    <div className="header">
                        <h3>AAPL Stock Summary</h3>
                    </div>
                    <div className="stock-summary">
                        <div className="left">
                            <div className="table-left">
                                <div className="table-row">
                                    <p>Previous Close</p>
                                    <strong>44.14</strong>
                                </div>
                                <div className="table-row">
                                    <p>Open</p>
                                    <strong>47.00</strong>
                                </div>
                                <div className="table-row">
                                    <p>Bid</p>
                                    <strong>50.36</strong>
                                </div>
                                <div className="table-row">
                                    <p>Ask</p>
                                    <strong>50.35</strong>
                                </div>
                                <div className="table-row">
                                    <p>Day's Range</p>
                                    <strong>46.19 - 50.61</strong>
                                </div>
                                <div className="table-row">
                                    <p>52 Week Range</p>
                                    <strong>43.44-74.64</strong>
                                </div>
                                <div className="table-row">
                                    <p>Volume</p>
                                    <strong>71,529,529</strong>
                                </div>
                                <div className="table-row">
                                    <p>Avg. Volume</p>
                                    <strong>23,268,567</strong>
                                </div>
                            </div>
                            <div className="table-right">
                                <div className="table-row">
                                    <p>Market Cap</p>
                                    <strong>99.64B</strong>
                                </div>
                                <div className="table-row">
                                    <p>Beta (5Y Monthly)</p>
                                    <strong>1.67</strong>
                                </div>
                                <div className="table-row">
                                    <p>PE Ratio (TTM)</p>
                                    <strong>4.76</strong>
                                </div>
                                <div className="table-row">
                                    <p>EPS (TTM)</p>
                                    <strong>10.56</strong>
                                </div>
                                <div className="table-row">
                                    <p>Earnings Date</p>
                                    <strong>Jul 15, 2022</strong>
                                </div>
                                <div className="table-row">
                                    <p>Forward Dividend & Yield</p>
                                    <strong>2.04(4.28%)</strong>
                                </div>
                                <div className="table-row">
                                    <p>Ex-Dividend Date</p>
                                    <strong>Apr 29, 2022</strong>
                                </div>
                                <div className="table-row">
                                    <p>1yr Target Est</p>
                                    <strong>66.45</strong>
                                </div>
                            </div>

                        </div>
                        <div className="right">
                            <h1>po</h1>
                        </div>
                    </div>
                    <h1>{stockid}</h1>
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
    .bar {
        background-color: #34c370;
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
        width: 50%;
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