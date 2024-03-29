import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getStockDetailsRoute, getStockHistoryRoute } from '../utils/APIRoutes'
import Summary from '../components/Summary'

Modal.setAppElement('#root')

const StockDetails = () => {
    const { stockid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isGrowing, setIsGrowing] = useState(true);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [stockDetails, setStockDetails] = useState(null);
    const [graphData, setGraphData] = useState([{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }])

    //Watchlist data
    const [watchlistTicker, setWatchlistTicker] = useState('')
    const [watchlistQuantity, setWatchlistQuantity] = useState(0)
    const [watchlistPriceGot, setWatchlistPriceGot] = useState(0)

    useEffect(() => {
        // async function action() {
        //     // console.log(dowStocks)
        // }
        fetch(`${getStockDetailsRoute}/${stockid}`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setStockDetails(data)
                setIsLoading(false)

                //Set graph data for chart
                var historyData = []
                data.historical.map((quote, index) => {
                    // console.log(quote)
                    historyData.push({
                        x: index,
                        y: quote.open
                    })
                })
                // console.log(historyData)
                setGraphData(historyData)
                setWatchlistTicker(data.symbol)
                //Set Color for graphs and such
                if (data.today < 0)
                    setIsGrowing(false)
            });
        // action()
    }, [])

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
    function openWatchListModal() {
        setAddModalIsOpen(true)
    }
    function closeModal() {
        setAddModalIsOpen(false)
    }
    function addToWatchList(e) {
        e.preventDefault()
        const watchlistData = {
            name: stockDetails.name,
            symbol: watchlistTicker,
            quantity: watchlistQuantity,
            priceObtainedAt: watchlistPriceGot
        }
        if (localStorage.getItem('watchlist')) {
            const data = localStorage.getItem('watchlist')
            var dataparse = JSON.parse(data)
            console.log(dataparse)
            var array = dataparse.list.filter(item => item.symbol != watchlistData.symbol)
            array.push(watchlistData)
            const outData = {
                list: array
            }
            localStorage.setItem('watchlist', JSON.stringify(outData))
        }
        else {
            localStorage.setItem('watchlist', JSON.stringify({ list: [] }))
            var array = []
            array.push(watchlistData)
            console.log(array)
            const outData = {
                list: array
            }
            localStorage.setItem('watchlist', JSON.stringify(outData))
        }
        //console.log(watchlistData)
        closeModal()
        alert(`Added ${stockDetails.symbol} to watchlist!`);
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
                            <div className="buttons">
                                <button onClick={openWatchListModal}>Add to watchlist</button>
                            </div>
                        </div>
                    </div>

                    <div className="header">
                        <h3>{stockDetails.symbol} Stock Summary</h3>
                    </div>
                    <Summary stockDetails={stockDetails} growing={isGrowing} graphData={graphData} />

                    <Modal
                        isOpen={addModalIsOpen}
                        onRequestClose={closeModal}
                        className='modal-content'
                        overlayClassName='modal-overlay'
                    >
                        {/*<button className='close' onClick={closeModal}>close</button>*/}
                        <h2>Add to Watchlist</h2>
                        <form onSubmit={addToWatchList}>
                            <div className='modal-content-form'>
                                <label htmlFor="symbol">Symbol</label>
                                <input type='text' name='symbol' value={stockDetails.symbol} readOnly='true' />
                                {/* Allowed to be negative for shorting purposes */}
                                <label htmlFor="quantity">Quantity</label>
                                <input type='number' name='quantity' step='1' onChange={(e) => setWatchlistQuantity(e.target.value)} />
                                {/*<label htmlFor='price'>Price Obtained</label>
                                <input type='number' name='price' min='0' step='0.01' onChange={(e) => setWatchlistPriceGot(e.target.value)} />*/}
                                <input type='submit' value='Add to List' />
                                <button onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </Modal>

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
        .btn-primary {
            background-color: #4137bd;
            border-color: #4137bd;
        }
        flex-direction: column;
        display: flex;
        flex: 1;
        align-items: flex-end;
        .buttons {
            display: flex;
            gap: 1rem;
        }
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