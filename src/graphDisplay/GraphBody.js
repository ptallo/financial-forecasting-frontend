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
            <div className="row">
                <div className="col-8">
                    <h1>{this.props.stockInfo.companyName}</h1>
                    <Graph stockInfo={this.props.stockInfo}></Graph>
                    <ButtonsToolbar ticker={this.props.stockInfo.ticker} handlers={this.props.handlers}></ButtonsToolbar>
                </div>
                <div className="col-3">
                    <FavoritesBar favorites={this.props.favorites} handlers={this.props.handlers}></FavoritesBar>
                </div>
            </div>
        </div>
    }
}


export default GraphBody;