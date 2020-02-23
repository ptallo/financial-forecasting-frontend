import React from 'react';
import './App.css';

import Navbar from "./Navbar"
import Graph from "./Graph"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.baseHTML = 'https://financial-modeling-backend-sd.herokuapp.com/getstockinfo';

    this.state = {
      ticker: '',
      x: [],
      y: [[]],
      names: []
    }

    this.updateTicker = this.updateTicker.bind(this);
  }

  render() {
    let graph = <div className="m-2 p-2">Nothing to display!</div>
    if (this.state.ticker != '') {
      graph = <Graph x={this.state.x} y={this.state.y} names={this.state.names} displayName={`Company Name (${this.state.ticker})`}></Graph>
    }

    return <div className="App">
      <Navbar searchHandler={this.updateTicker}></Navbar>
      {graph}
    </div>
  }

  updateTicker(ticker) {
    const startDate = '2019-10-08';
    const endDate = '2019-10-22';

    this.setState({
      x: [],
      y: [],
      names: []
    })

    fetch(`${this.baseHTML}/?stock=${ticker}&start=${startDate}&end=${endDate}`, {
      method: 'GET',
      mode: 'cors'
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          ticker: ticker,
          x: json.x,
          y: json.y,
          names: json.names
        });
      }, (error) => {
        alert(error.message);
      });
  }
}

export default App;
