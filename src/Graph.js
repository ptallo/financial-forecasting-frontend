import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: props.x,
            y: props.y,
            names: props.names,
            displayName: props.displayName
        }

        this.getDataFromState = this.getDataFromState.bind(this);
        this.getVerticalTicks = this.getVerticalTicks.bind(this);
    }

    render() {
        return <div className='container-fluid p-2'>
            <h1 className="m-2">{this.state.displayName}</h1>
            <LineChart width={600} height={300} data={this.getDataFromState()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <XAxis dataKey="name" tick={false} />
                <YAxis ticks={this.getVerticalTicks(this.state.y[0])} interval={0} type='number' domain={(val) => { return val * 0.5; }, (val) => { return val * 1.5; }} />
                <Tooltip />
            </LineChart>
        </div>
    }

    getDataFromState() {
        const data = []
        for (let i = 0; i < this.state.x.length; i++) {
            data.push({
                name: this.state.x[i],
                uv: this.state.y[0][i],
                pv: this.state.y[0][i] + 10,
                amt: this.state.y[0][i]
            })
        }
        return data;
    }

    getVerticalTicks(yvals) {
        const min = Math.min(...yvals);
        const max = Math.max(...yvals);

        let hvals = [];
        let num_ticks = 5
        for (let i = 0; i <= 5; i++) {
            let val = min + ((max - min) * (1 / num_ticks) * i);
            hvals.push(val.toFixed(2));
        }

        return hvals;
    }
}

export default Graph;