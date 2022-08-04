import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStockDetailsRoute } from '../utils/APIRoutes'
import styled from 'styled-components'

/* For now when the user clicks on to the watchlist  */


const Watchlist = () => {
  const [stockWatchlist, setStockWatchlist] = useState([]);
  const exampleWatchList = [
    {
      symbol: "AAPL",
      quantity: 20,
      priceObtainedAt: 150
    },
    {
      symbol: "TSLA",
      quantity: 45,
      priceObtainedAt: 234
    },
    {
      symbol: "CRM",
      quantity: 15,
      priceObtainedAt: 56
    }
  ];

  useEffect(() => {
    if (localStorage.getItem('watchlist')) {
      const data = localStorage.getItem('watchlist')
      var dataparse = JSON.parse(data)
      setStockWatchlist(dataparse.list)
    }
  }, [])

  return (
    <Container>
      {/* TABLE HEADER */}

      <div className="table-header">
        <h3>WATCHLIST</h3>
      </div>
      <div className="table-row main">
        <div className="cell-grow">Name</div>

        <div className="cell" style={{ width: "20px" }}>Symbol</div>
        <div className="cell" style={{ width: "20px" }}>Quantity</div>
        <div className="cell" style={{ width: "100px" }}>Price Bought</div>
        <div className="cell" style={{ width: "100px" }}>Current Price</div>
        <div className="cell" style={{ width: "120px" }}>Growth</div>
      </div>

      {
        stockWatchlist?.map((stock, i) => {
          return (
            <div className="table-row" key={i}>
              <Link className="cell-grow" to={`/stockdetails/${stock.symbol}`}>
                <div>{stock.name}</div>
              </Link>
              <div className="cell" style={{ width: "20px" }}>{stock.symbol}</div>
              <div className="cell" style={{ width: "20px" }}>{stock.quantity}</div>
              <div className="cell" style={{ width: "100px" }}>${stock.priceObtainedAt}</div>
              <div className="cell" style={{ width: "100px" }}>Current Price</div>
              <div className="cell" style={{ width: "120px" }}>Growth</div>
            </div>
          )
        })
      }
    </Container>
  )
}

export const Container = styled.div`
  min-height: 75vh;
  max-width: 1400px;
  min-width: 780px;
  margin: auto;
  padding: 2rem 2rem;
  a {
    text-decoration: none;
    color: white;
    &:hover {
        text-decoration: underline;
    }
  }
  .table-header {
    margin-bottom: 2rem;
  width: 100%;
    border-bottom: 0.1rem solid #fff;
  }
  .table-row {
   
    &.main {
        color: #8c8c8e;
    }
    gap: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px dotted #eee;
    border-bottom: 1px solid #ccc;
    padding: 1rem 0;
    .cell {
        width: 100px;
    }
    .cell-grow {
        max-width: 250px;
        flex: 1;
    }
}
`

export default Watchlist