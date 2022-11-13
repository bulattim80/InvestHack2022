import React from 'react'
import Plot from 'react-plotly.js';
class Japan extends React.Component{
constructor(props){
    super(props);
    this.state = {

        stockChartXValues: [],
        stockChartYValues: []
    }
}

componentDidMount(){
    this.fetchStock();  
}

fetchStock(){
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'VHX88QJKKEFYTIMC'
    //ВЫБОР КОМПАНИИ, акции коророй вы будуте брать. нужно изменять STOCKSYMVOL, чтобы менять график, а следовательно акции
    let StockSymbol = 'TSLA';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`
    let stockChartYValuesFunction = [];
    let stockChartXValuesFunction = [];
    fetch(API_Call)
    .then(
        function(response){
            return response.json();
        }
    )
    .then(
        function(data){
            console.log(data);
            
                for(var key in data['Time Series (Daily)']){
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
        let y0 = [];
        let y1 = [];
        let data1 = []
        for (var i = this.state.stockChartYValues.length-1; i > 0; i--) {
            data1.push({
                name:this.state.stockChartXValues[i]+"-"+this.state.stockChartXValues[i+1],
                y: [this.state.stockChartYValues[i],this.state.stockChartYValues[i+1]],
                marker: {color: ((this.state.stockChartYValues[i]-this.state.stockChartYValues[i+1]<0)?'#F94241':'#1FBA66')},
                showlegend: false   ,
                type: 'box'
            })
        }

        
        
        // let trace1 = {
        //     y: y0,
        //     type: 'box'
        // };

        // let trace2 = {
        //     y: y1,
        //     type: 'box'
        // };

        // let trace3 = {
        //     y: y0,
        //     type: 'box'
        // };

        // data1 = [trace1, trace2, trace3];
      
        return (
            <div>
                <Plot data={data1}/>
            </div>
        )
   }

}
export default Japan;
