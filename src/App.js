import React from 'react';
import './App.css';

import GraphBody from "./graphDisplay/GraphBody";
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
        ticker: '',
        companyName: '',
        data: [] // Should contain json objects with {name: '', x: [], and y: []}
      },
      favorites: this.getFavorites(),
      daterange: '1m',
      validTickers: [],
      loggedIn: this.isLoggedIn()
    }
  }

  render() {
    let graphArea = this.state.loggedIn ?
      <GraphBody stockInfo={this.state.stockInfo} favorites={this.state.favorites} handlers={this.getGraphBodyHandlers()}></GraphBody> :
      <p>Graph Stuff</p>;

    return <div className="App">
      <Navbar loggedIn={this.state.loggedIn} handlers={this.getNavbarHandlers()}></Navbar>
      {graphArea}
    </div>
  }

  updateTickerCallback = (ticker, companyName, data) => {
    this.setState({
      stockInfo: {
        ticker: ticker,
        companyName: companyName,
        data: data
      }
    })
  }

  cookieChangeListener = (key, value) => {
    if (key == "stockAppCookie") {
      let newValue = value ? value : false;
      this.setState({ loggedIn: newValue });
      if (newValue) {
        this.apiHandler.getFavorites();
      } else {
        this.localStorageHandler.remove('favorites');
      }
    } else if (key == 'favorites') {
      let newValue = value ? value : [];
      this.setState({ favorites: newValue });
    }
  }

  getGraphBodyHandlers = () => {
    return {
      addFavorite: this.addFavorite,
      deleteFavorite: this.deleteFavorite,
      search: this.search,
      updateDaterange: this.updateDaterange,
    }
  }

  getNavbarHandlers = () => {
    return {
      login: this.login,
      logout: this.logout,
      signup: this.signup,
      search: this.search
    }
  }

  isLoggedIn = () => { return this.localStorageHandler.get("stockAppCookie") ? this.localStorageHandler.get("stockAppCookie") : false }
  getFavorites = () => { return this.localStorageHandler.get("favorites") ? this.localStorageHandler.get("favorites") : [] }
  login = (u, p) => { this.apiHandler.login(u, p); }
  logout = () => { this.localStorageHandler.remove("stockAppCookie"); }
  signup = (u, p) => { this.apiHandler.signup(u, p); }
  addFavorite = (ticker) => { this.apiHandler.addFavorite(ticker) }
  deleteFavorite = (ticker) => { this.apiHandler.deleteFavorite(ticker) }

  search = (ticker, daterange = null) => {
    if (!daterange) {
      this.apiHandler.getTickerInfo(ticker, this.state.daterange, this.updateTickerCallback);
    } else {
      this.apiHandler.getTickerInfo(ticker, daterange, this.updateTickerCallback);
    }
  }

  updateDaterange = (daterange) => {
    this.setState({ daterange: daterange });
    this.search(this.state.stockInfo.ticker, daterange);
  }
}

export default App;
