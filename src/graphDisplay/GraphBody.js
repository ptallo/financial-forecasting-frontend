import React from 'react';

import Graph from "./Graph";
import FavoritesBar from "./FavoritesBar";
import ButtonsToolbar from "./ButtonsToolbar";

class GraphBody extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.stockInfo.ticker == '') {
            let tickerToSearch = this.props.favorites.length > 0 ?
                this.props.favorites[0] :
                "AMZN";
            this.props.handlers.search(tickerToSearch);
        }
    }
    render() {
        return <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-7 ml-5 mt-5">
                    <h1 className="ml-5 display-4">{this.props.stockInfo.companyName}</h1>
                    <Graph stockInfo={this.props.stockInfo}></Graph>
                    <ButtonsToolbar ticker={this.props.stockInfo.ticker} handlers={this.props.handlers} daterange={this.props.daterange}></ButtonsToolbar>
                </div>
                <div className="col-2 mt-5">
                    <h1 className="ml-5 display-4 text-light">a</h1>
                    <FavoritesBar ticker={this.props.stockInfo.ticker} favorites={this.props.favorites} handlers={this.props.handlers}></FavoritesBar>
                </div>
            </div>
        </div>
    }
}


export default GraphBody;