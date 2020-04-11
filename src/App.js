import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';

import GraphBody from "./loginDisplay/GraphBody";
import Navbar from "./navbar/Navbar";
import ApiHandler from "./ApiHandler";
import LocalStorageHandler from "./LocalStorageHandler";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.localStorageHandler = new LocalStorageHandler();
    this.localStorageHandler.addListener(this.cookieChangeListener);
    this.apiHandler = new ApiHandler(this.localStorageHandler);

    this.state = {
      stockInfo: {
        companyName: '',
        ticker: '',
        x: [],
        y: [[]],
        names: []
      },
      favorites: this.getFavorites(),
      validTickers: [],
      loggedIn: this.isLoggedIn()
    }

    this.handlers = {
      login: (u, p) => { this.apiHandler.login(u, p); },
      logout: () => { this.cookies.remove("stockAppCookie"); },
      signup: (u, p) => { this.apiHandler.signup(u, p); },
      search: (tick) => { this.apiHandler.getTickerInfo(tick, '2019-10-08', '2019-10-22', this.updateTickerCallback); }
    }
  }

  render() {
    let graphArea = this.state.loggedIn ?
      <GraphBody stockInfo={this.state.stockInfo} favorites={this.state.favorites} searchHandler={this.handlers.search}></GraphBody> :
      <p>Graph Stuff</p>;

    return <div className="App">
      <Navbar loggedIn={this.state.loggedIn} handlers={this.handlers}></Navbar>
      {graphArea}
    </div>
  }

  updateTickerCallback = (companyName, ticker, x, y, names) => {
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

  isLoggedIn = () => {
    return this.localStorageHandler.get("stockAppCookie") ? this.localStorageHandler.get("stockAppCookie") : false
  }

  getFavorites = () => {
    return this.localStorageHandler.get("favorites") ? this.localStorageHandler.get("favorites") : []
  }

  cookieChangeListener = (key, value) => {
    if (key == "stockAppCookie") {
      let newValue = value ? value : false;
      this.setState({ loggedIn: newValue });
      if (newValue) {
        this.handlers.search('AAPL');
        this.apiHandler.getFavorites();
      } else {
        this.cookies.remove('favorites');
      }
    } else if (key == 'favorites') {
      let newValue = value ? value : [];
      this.setState({ favorites: newValue });
    }
  }
}

export default App;
