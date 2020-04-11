import React from 'react';

import Graph from "./Graph";
import FavoritesBar from "./FavoritesBar";

class GraphBody extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.stockInfo.ticker == '' && this.props.favorites && this.props.favorites.length > 0){
            this.props.searchHandler(this.props.favorites[0]);
        }
    }

    render() {
        return <div className="container-fluid">
            <div className="row">
                <Graph stockInfo={this.props.stockInfo}></Graph>
                <FavoritesBar favorites={this.props.favorites} selectHandler={this.props.searchHandler}></FavoritesBar>
            </div>
        </div>
    }

    addStockToFavorites = () => {
        const newFav = this.props.stockInfo.ticker;

    }
}


export default GraphBody;