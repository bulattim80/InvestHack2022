import React from 'react'
import Plot from 'react-plotly.js';

export default class BoxGraph extends React.Component {
    render() {
        let y0 = [];
        let y1 = [];
        for (var i = 0; i < 50; i++) {
            y0[i] = Math.random();
            y1[i] = Math.random() + 1;
        }

        let trace1 = {
            y: y0,
            type: 'box'
        };

        let trace2 = {
            y: y1,
            type: 'box'
        };

        let trace3 = {
            y: y0,
            type: 'box'
        };

        let data1 = [trace1, trace2, trace1];
        return (
            <div>
                <Plot data={data1}/>
            </div>
        )
    }
}