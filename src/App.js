import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';

import Navbar from "./Navbar";
import Graph from "./Graph";
import ApiHandler from "./ApiHandler";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.cookies = new Cookies();
    this.apiHandler = new ApiHandler(this.cookies);


    this.state = {
      stockInfo: {
        companyName: '',
        ticker: '',
        x: [],
        y: [[]],
        names: []
      },
      loggedIn: this.cookies.get("stockAppCookie") ? this.cookies.get("stockAppCookie") : false
    }

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.updateTicker = this.updateTicker.bind(this);
    this.cookieChangeListener = this.cookieChangeListener.bind(this);
    this.cookies.addChangeListener(this.cookieChangeListener);
  }

  render() {
    return <div className="App">
      <Navbar loggedIn={this.state.loggedIn} searchHandler={this.searchHandler} loginHandler={this.loginHandler} signupHandler={this.signupHandler} logoutHandler={this.logoutHandler}></Navbar>
      {this.state.stockInfo.ticker == '' ? <p className="p-2 m-2">Nothing to display!</p> : <Graph stockInfo={this.state.stockInfo}></Graph>}
    </div>
  }

  loginHandler(username, password) {
    this.apiHandler.login(username, password);
  }

  logoutHandler() {
    this.cookies.remove("stockAppCookie");
  }

  signupHandler(username, password) {
    this.apiHandler.signup(username, password);
  }

  searchHandler(ticker) {
    this.apiHandler.getTickerInfo(ticker, '2019-10-08', '2019-10-22', this.updateTicker)
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

  cookieChangeListener(changeObject) {
    if (changeObject.name == "stockAppCookie") { 
      let newVal = changeObject.value ? changeObject.value : false;
      this.setState({ loggedIn: newVal });
    }
  }
}

export default App;
