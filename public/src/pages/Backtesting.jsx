import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Backtesting = ()=> {
    let current_date = new Date();

    //Backtesting form vars
    const [backtestMethod, setBacktestMethod] = useState('100sma');
    const [backtestStart, setBacktestStart] = useState('2000-01-01');
    const [backtestEnd, setBacktestEnd] = useState('2001-01-01');

    function startBacktest(e) {
        
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