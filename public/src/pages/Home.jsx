import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { getDowRoute } from '../utils/APIRoutes'

import { ImPriceTag } from 'react-icons/im'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'

const Home = () => {
    useEffect(() => {
        async function action() {
            const response = await axios.post(getDowRoute, {
                dow: ["AAPL", "AMGN"]
            })
            console.log(response.data)

        }
        action()
    }, [])

    return (
        <Container>
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

            {/* TO BE RENDERED DYNAMICALLY BY ITERATING THROUGH DOW LIST */}
            <div className="table-row">
                <div className="cell-grow">Facebook</div>
                <div className="cell" style={{ width: "20px" }}>FB</div>
                <div className="cell" style={{ width: "20px" }}>161.78</div>
                <div className="cell" style={{ width: "100px" }}><AiFillCaretUp className='stock up' />1.42%</div>
                <div className="cell" style={{ width: "130px" }}>548,768,200,000</div>
                <div className="cell" style={{ width: "120px" }}><ImPriceTag style={{ margin: "0 .75rem" }} />93% Buy</div>
            </div>

            <div className="table-row">
                <div className="cell-grow">Twitter</div>
                <div className="cell" style={{ width: "20px" }}>TWTR</div>
                <div className="cell" style={{ width: "20px" }}>41.93</div>
                <div className="cell" style={{ width: "100px" }}><AiFillCaretDown className='stock down' />1.75%</div>
                <div className="cell" style={{ width: "130px" }}>30,991,444,800</div>
                <div className="cell" style={{ width: "120px" }}><ImPriceTag style={{ margin: "0 .75rem" }} />22% Buy</div>
            </div>

            <div className="table-row">
                <div className="cell-grow">Snap</div>
                <div className="cell" style={{ width: "20px" }}>SNAP</div>
                <div className="cell" style={{ width: "20px" }}>13.10</div>
                <div className="cell" style={{ width: "100px" }}><AiFillCaretUp className='stock up' />0.15%</div>
                <div className="cell" style={{ width: "130px" }}>16,408,062,100</div>
                <div className="cell" style={{ width: "120px" }}><ImPriceTag style={{ margin: "0 .75rem" }} />18% Buy</div>
            </div>
        </Container>
    )
}

export const Container = styled.div`
  height: 75vh;
  max-width: 1400px;
  min-width: 780px;
  margin: auto;
  /* width: 100%; */
  padding: 2rem 2rem;

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