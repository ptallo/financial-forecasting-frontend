import React from 'react';
import './App.css';

import Navbar from "./Navbar"
import Graph from "./Graph"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.baseHTML = 'https://financial-modeling-backend-sd.herokuapp.com/getstockinfo';

    this.state = {
      stockInfo: {
        companyName: '',
        ticker: '',
        x: [],
        y: [[]],
        names: []
      },
      loggedIn: false
    }

    this.handleAuthorization = this.handleAuthorization.bind(this);
    this.updateTicker = this.makeTickerCall.bind(this);
  }

  render() {
    let graph = <div className="m-2 p-2">Nothing to display!</div>
    if (this.state.stockInfo.ticker != '') {
      graph = <Graph stockInfo={this.state.stockInfo}></Graph>
    }

    return <div className="App">
      <Navbar loggedIn={this.state.loggedIn} searchHandler={this.makeTickerCall} loginHandler={this.handleAuthorization}></Navbar>
      {graph}
    </div>
  }

  handleAuthorization(username, password) {
    let data = {
      username: username,
      password: password
    }

    fetch(`${this.baseHTML}/login/`, {
      method: 'GET',
      mode: 'cors',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
      }, (error) => {
        console.log(error);
      });
  }

  makeTickerCall(ticker) {
    const startDate = '2019-10-08';
    const endDate = '2019-10-22';

    this.updateTicker('', 'AAPL', [], [[]], [])

    fetch(`${this.baseHTML}/?stock=${ticker}&start=${startDate}&end=${endDate}`, {
      method: 'GET',
      mode: 'cors'
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.updateTicker('filler', ticker, json.x, json.y, json.names)
      }, (error) => {
        alert(error.message);
      });
  }

  updateTicker(companyName, ticker, x, y, names) {
    this.setState({
      stockInfo: {
        companyName: companyName,
        ticker: ticker,
        x: x,
        y: y,
        names: names
      }
    })
  }
}

export default App;
