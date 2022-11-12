import React from 'react'
import Plot from 'react-plotly.js';

export default class StockGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            stockChartXValues: [],
            stockChartXValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'VHX88QJKKEFYTIMC'
        //ВЫБОР КОМПАНИИ, акции коророй вы будуте брать. нужно изменять STOCKSYMVOL, чтобы менять график, а следовательно акции
        let StockSymbol = 'AMZN';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`
        let stockChartYValuesFunction = [];
        let stockChartXValuesFunction = [];
        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data);

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)']
                        [key]['1. open']);
                    }
                    //console.log(stockChartXValuesFunction);

                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction
                    })
                }
            )
    }


    render() {
        return (
            <div>
                <h1>Stock Market</h1>

                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'color',
                            mode: 'points',
                            //3AB6EC
                            marker: { color: 'blue' },
                        },
                        
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'color',
                            mode: 'points',
                            //3AB6EC
                            marker: { color: 'red' },
                        }

                        //,{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={{ width: 720, height: 440, title: `Amazon stock` }}
                />
            </div>
        )
    }
}