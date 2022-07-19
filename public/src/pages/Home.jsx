import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { getDowRoute } from '../utils/APIRoutes'
import Dow from '../assets/dow.json'

import { ImPriceTag } from 'react-icons/im'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'

const Home = () => {

    const [dowStocks, setDowStocks] = useState([])
    const [index, setIndex] = useState(-1)

    useEffect(() => {
        setIndex(0)
        // async function action() {
        //     // console.log(Dow.DOW)

        //     const response = await axios.post(getDowRoute, {
        //         dow: Dow.DOW.slice(index,index+5)
        //     })
        //     var oldStocks = dowStocks
        //     // oldStocks.concat(response.data)
        //     // oldStocks = [...dowStocks, response.data]
        //     setDowStocks(response.data)
        //     console.log(oldStocks)
        //     // setDowStocks(response.data)
        //     setIndex((prevIndex) => prevIndex+5)
        // }
        // action() 
    }, [])

    useEffect(() => {
        async function action() {
            // console.log(dowStocks)

            // const response = await axios.post(getDowRoute, {
            //     dow: Dow.DOW.slice(index, index + 5)
            // })
            fetch(getDowRoute, {
                method: "post", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    dow: Dow.DOW.slice(index, index + 5)
                })
            })
                .then((response) => {
                    //do something awesome that makes the world a better place
                    return response.json()
                })
                .then(data => {
                    setDowStocks((prevState) => [...prevState, ...data])
                    console.log(data)
                    setIndex((prevIndex) => prevIndex + 5)
                });
        }
        if (index < Dow.DOW.length)
            action()
    }, [index])

    return (
        <Container>

            {/* TABLE HEADER */}
            <div className="table-header">
                <h3>REALTIME PRICES FOR TOP 30 US STOCKS </h3>
            </div>
            <div className="table-row main">
                <div className="cell-grow">Name</div>

                <div className="cell" style={{ width: "20px" }}>Symbol</div>
                <div className="cell" style={{ width: "20px" }}>Price</div>
                <div className="cell" style={{ width: "100px" }}>Today</div>
                <div className="cell" style={{ width: "130px" }}>Market Cap</div>
                <div className="cell" style={{ width: "120px" }}>Analyst Ratings</div>
            </div>

            {/* DYNAMICALLY RENDERED STOCKS */}
            {
                dowStocks?.map((stock, i) => {
                    return (
                        <div className="table-row" key={i}>
                            <Link className="cell-grow" to={`/stockdetails/${stock.symbol}`}>
                                <div >{stock.name}</div>
                            </Link>
                            <div className="cell" style={{ width: "20px" }}>{stock.symbol}</div>
                            <div className="cell" style={{ width: "20px" }}>{stock.price}</div>
                            <div className="cell" style={{ width: "100px" }}>{stock.today > 0 ? <AiFillCaretUp className='stock up' /> : <AiFillCaretDown className='stock down' />}{Math.abs(stock.today)}%</div>
                            <div className="cell" style={{ width: "130px" }}>{stock.marketCap}</div>
                            <div className="cell" style={{ width: "120px" }}><ImPriceTag style={{ margin: "0 .75rem" }} />{stock.analystRating}% Buy</div>
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
  /* width: 100%; */
  padding: 2rem 2rem;

  a {
    text-decoration: none;
    color: white;
    &:hover {
        text-decoration: underline;
    }
  }

  .stock {
    margin-right: .75rem;
    &.up {
        color:#21ce99
    }
    &.down {
        color: #f45531;
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

export default Home