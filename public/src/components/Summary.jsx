import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
    FlexibleXYPlot,
    FlexibleWidthXYPlot,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    AreaSeries,
    Crosshair
} from 'react-vis';

const Summary = ({ stockDetails, growing, graphData }) => {
    function getDateFromInt(date) {
        var timestamp = Date.parse(date)
        // console.log(timestamp)
        var d = new Date(parseInt(date))
        // console.log(d)
        return d.toLocaleString('default', { month: 'short' }) + " " + d.getUTCDay() + ", " + d.getUTCFullYear()
    }
    function getDateFromEncoding(date) {
        // var timestamp = Date.parse(date)
        // console.log(timestamp)
        var d = new Date(date)
        // console.log(d)
        return d.toLocaleString('default', { month: 'short' }) + " " + d.getUTCDay() + ", " + d.getUTCFullYear()
    }

    // const [graphData, setGraphData] = useState([{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }])

    //For the chart
    const DATA = [
        [{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]
        // [{ x: 1, y: 20 }, { x: 2, y: 5 }, { x: 3, y: 15 }]
    ];

    const _onMouseLeave = () => {
        setCrossHairValues([])
    };
    const _onNearestX = (value, { index }) => {
        setCrossHairValues(DATA.map(d => d[index]))
        // ({ crosshairValues: DATA.map(d => d[index]) });
    };

    const [crossHairValues, setCrossHairValues] = useState([])
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
                <h3>Month Data</h3>
                <FlexibleXYPlot onMouseLeave={_onMouseLeave} height={425}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    {/* <XAxis /> */}
                    <YAxis />
                    <AreaSeries
                        className="area-series-example"
                        // curve="curveNatural"
                        onNearestX={_onNearestX}
                        color= {growing ? '#34c370' : '#ff433d'}
                        data={graphData}
                    />
                    {/* <Crosshair
                        values={crossHairValues}
                        className={'test-class-name'}
                    /> */}
                </FlexibleXYPlot>
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
    .right {
        h3 {
            margin-top: 0;
        }
        width: 48%;
        /* height: 450px; */
    }
    @media (max-width: 1200px) {
    .left, .right {
        width: 100%;
    }
  }
`

export default Summary