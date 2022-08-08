import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {getBacktestRoute, getStockHistoryRoute} from '../utils/APIRoutes'

const Backtesting = ()=> {
    let current_date = new Date();

    const backtestData = [];

    //Backtesting form vars
    const [backtestMethod, setBacktestMethod] = useState('100sma');
    const [backtestStart, setBacktestStart] = useState('2012-01-01');
    const [backtestEnd, setBacktestEnd] = useState('2012-12-31');

    // Returns the watchlist symbols in a [TICKER,TICKER,TICKER,...] fashion
    function getWatchlistSymbols() {
        let symbols = [];
        if (localStorage.getItem('watchlist')) {
            let data = localStorage.getItem('watchlist');
            var dataparse = JSON.parse(data);
            var watchlist = dataparse.list;
            watchlist.map(x => {
                symbols.push(x.symbol);
            });
        }
        return symbols;
    }  
    


    function startBacktest(e) {
        e.preventDefault();

        let symbols = getWatchlistSymbols();

        /*fetch(`${getStockHistoryRoute}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    tickers: symbols,
                    dateStart: backtestStart,
                    dateEnd: backtestEnd 
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            for (var symbol in data.historical) {
                for (var week in data.historical[symbol]){
                    //data.historical[symbol][week]['date'] = new Date(data.historical[symbol][week]['date']);
                    backtestData.push(data.historical[symbol][week]);
                }
            }
            return backtestData;
        });*/

        fetch(`${getBacktestRoute}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    tickers: symbols,
                    dateStart: backtestStart,
                    dateEnd: backtestEnd,
                    capital: 10000
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

    }

    return (
        <Container>
            <form onSubmit={startBacktest}>
                <label for='method'>Backtesting Method:</label>
                <select name='method' value={backtestMethod} onChange={(e) => {setBacktestMethod(e.target.value);}}>
                    <option value='100sma'>100 SMA</option>
                    <option value='meanreversion'>Mean Reversion</option>
                </select>
                <label for='startdate'>Start Date:</label>
                <input type='date' name='startdate' value={backtestStart} onChange={(e) => {setBacktestStart(e.target.value);}} />
                <label for='enddate'>End Date:</label>
                <input type='date' name='enddate' value={backtestEnd} onChange={(e) => {setBacktestEnd(e.target.value);}} />
                <input type='submit'/>
            </form>
        </Container>
    )
}

export const Container = styled.div`

`

export default Backtesting