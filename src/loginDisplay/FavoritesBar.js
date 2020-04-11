import React from 'react';


class FavoritesBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    render() {
        return <div className="col-3 p-2">
            <ul className="list-group">
                {Array.isArray(this.props.favorites) ? this.getListElements(this.props.favorites) : this.getListElements([])}
            </ul>
        </div>
    }

    getListElements = (favorites) => {
        return favorites.map((item, i) => {
            return this.state.selected == i ? this.getSelectedElement(item, i) : this.getUnselectedElement(item, i);
        });
    }

    getSelectedElement = (ticker, i) => {
        return <a href="#" className="list-group-item list-group-item-action active" key={i}>{ticker}</a>
    }

    getUnselectedElement = (ticker, i) => {
        return <a href="#" className="list-group-item list-group-item-action" key={i} onClick={() => { this.selectNewItem(ticker, i); }}>{ticker}</a>
    }

    selectNewItem = (ticker, i) => {
        this.setState({
            selected: i
        });
        this.props.selectHandler(ticker);
    }
}

export default FavoritesBar;