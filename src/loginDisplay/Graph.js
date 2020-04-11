import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.stockInfo.ticker == '')
            return <h1 className="col-8"></h1>

        return <div className='container-fluid col-8 p-2'>
            <h1 className="m-2">{this.getDisplayName()}</h1>
            <LineChart width={600} height={300} data={this.formatDataFromProps()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <XAxis dataKey="name" tick={false} />
                <YAxis ticks={this.getVerticalTicks(this.props.stockInfo.y[0])} interval={0} type='number' domain={(val) => { return val * 0.5; }, (val) => { return val * 1.5; }} />
                <Tooltip />
            </LineChart>
        </div>
    }

    getDisplayName = () => {
        return `${this.props.stockInfo.ticker}`
    }

    formatDataFromProps = () => {
        const data = []
        for (let i = 0; i < this.props.stockInfo.x.length; i++) {
            data.push({
                name: this.props.stockInfo.x[i],
                uv: this.props.stockInfo.y[0][i],
                pv: this.props.stockInfo.y[0][i] + 10,
                amt: this.props.stockInfo.y[0][i]
            })
        }
        return data;
    }

    getVerticalTicks = (yvals) => {
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