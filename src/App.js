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
    this.updateTicker = this.updateTicker.bind(this);
  }

  render() {
    let graph = <div className="m-2 p-2">Nothing to display!</div>
    if (this.state.stockInfo.ticker != '') {
      graph = <Graph stockInfo={this.state.stockInfo}></Graph>
    }

    return <div className="App">
      <Navbar loggedIn={this.state.loggedIn} searchHandler={this.updateTicker} authHandler={this.handleAuthorization}></Navbar>
      {graph}
    </div>
  }

  handleAuthorization() {
    if (this.state.loggedIn) {
      alert('logged in');
    } else {
      alert('logged out');
    }
  }

  updateTicker(ticker) {
    const startDate = '2019-10-08';
    const endDate = '2019-10-22';

    this.setState({
      stockInfo: {
        companyName: '',
        ticker: '',
        x: [],
        y: [[]],
        names: []
      }
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
          stockInfo: {
            companyName: 'filler',
            ticker: ticker,
            x: json.x,
            y: json.y,
            names: json.names
          }
        });
      }, (error) => {
        alert(error.message);
      });
  }
}

export default App;
