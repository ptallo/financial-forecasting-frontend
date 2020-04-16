import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


class Graph extends React.Component {
    render() {
        if (this.props.stockInfo.ticker == '') {
            return <h1></h1>
        }

        return <ResponsiveContainer height={500}>
            <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} padding={{ left: 30, right: 30 }} minTickGap={40}/>
                <YAxis dataKey="value" domain={[min => this.getYMin(min),max => this.getYMax(max)]}/>
                <Tooltip />
                <Legend />
                {this.getDataSeries().map(s => this.getLineForData(s))}
            </LineChart>
        </ResponsiveContainer>
    }

    getYMax = (min) => {
        let yvals = this.props.stockInfo.data.flatMap(obj => obj.y);
        return Math.ceil(Math.max(...yvals) * 1.1);
    }

    getYMin = (max) => {
        let yvals = this.props.stockInfo.data.flatMap(obj => obj.y);
        return Math.floor(Math.min(...yvals) * 0.9);
    }

    getLineForData = s => {
        return <Line dataKey="value" data={s.data} name={s.name} key={s.name} dot={false} activeDot={true} stroke={this.getLineColor(s)} />
    }

    getLineColor = s => {
        if (s.name == "historical") {
            return "#0099ff"
        } else if (s.data[0].value - s.data.slice(-1)[0].value < 0) {
            return "#00ff00"
        } else {
            return "#ff3300"
        }
    }

    getDataSeries = () => {
        const series = []
        for (let inputObj of this.props.stockInfo.data) {
            let newName = inputObj.name == "actual" ? "historical" : `${inputObj.name} predictions`
            let returnObj = {
                name: newName,
                data: []
            };

            for (let i = 0; i < inputObj.x.length; i++) {
                returnObj.data.push({
                    category: this.transfromDate(inputObj.x[i]),
                    value: inputObj.y[i]
                });
            }

            series.push(returnObj)
        }
        return series;
    }

    transfromDate = x => {
        let monthInt = x.split("-")[1]
        let day = x.split("-")[2]
        return `${this.getMonth(monthInt)} ${day}`
    }

    getMonth = i => {
        if (i == 1) {
            return "Jan"
        } else if (i == 2) {
            return "Feb"
        } else if (i == 3) {
            return "Mar"
        } else if (i == 4) {
            return "Apr"
        } else if (i == 5) {
            return "May"
        } else if (i == 6) {
            return "June"
        } else if (i == 7) {
            return "July"
        } else if (i == 8) {
            return "Aug"
        } else if (i == 9) {
            return "Sept"
        } else if (i == 10) {
            return "Oct"
        } else if (i == 11) {
            return "Nov"
        } else if (i == 12) {
            return "Dec"
        }
    }
}

export default Graph;