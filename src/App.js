import React from 'react';
import './App.css';

import GraphBody from "./graphDisplay/GraphBody";
import Navbar from "./navbar/Navbar";
import ApiHandler from "./ApiHandler";
import LocalStorageHandler from "./LocalStorageHandler";
import FAQ from "./FAQ";
import DefaultDisplay from './defaultDisplay/DefaultDisplay';


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
    const loggedInBody = <div>
      <GraphBody stockInfo={this.state.stockInfo} favorites={this.state.favorites} handlers={this.getGraphBodyHandlers()} daterange={this.state.daterange}></GraphBody>
      <FAQ></FAQ>
    </div>
    let body = this.state.loggedIn ?
      loggedInBody :
      <DefaultDisplay></DefaultDisplay>;

    return <div className="App bg-light">
      <Navbar loggedIn={this.state.loggedIn} handlers={this.getNavbarHandlers()}></Navbar>
      {body}
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
      getFavorites: this.getFavorites,
      addFavorite: this.addFavorite,
      deleteFavorite: this.deleteFavorite,
      search: this.search,
      updateDaterange: this.updateDaterange,
      getValidTickers: this.getValidTickers
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
  getValidTickers = () => { return this.apiHandler.validTickers; }

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
