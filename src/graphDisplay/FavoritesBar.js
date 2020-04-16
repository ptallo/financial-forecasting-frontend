import React from 'react';


class FavoritesBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            hovered: null
        }
    }

    render() {
        return <ul className="list-group">
            {Array.isArray(this.props.favorites) ? this.getListElements(this.props.favorites) : this.getListElements([])}
        </ul>
    }

    getListElements = (favorites) => {
        return favorites.map((item, i) => {
            return this.state.selected == i ? this.getSelectedElement(item, i) : this.getUnselectedElement(item, i);
        });
    }

    getSelectedElement = (ticker, i) => {
        if (this.state.hovered == i) {
            return <a href="#" className="list-group-item list-group-item-action active d-flex justify-content-between" key={i}
                onMouseLeave={() => { this.hoverNewItem(-1) }}>
                {ticker}
                {this.getDeleteButton(ticker, i)}
            </a>
        } else {
            return <a href="#" className="list-group-item list-group-item-action active d-flex justify-content-between" key={i}
                onMouseOver={() => { this.hoverNewItem(i) }}>
                {ticker}
            </a>
        }
    }

    getUnselectedElement = (ticker, i) => {
        if (this.state.hovered == i) {
            return <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between" key={i}
                onClick={() => { this.selectNewItem(ticker, i); }}
                onMouseLeave={() => { this.hoverNewItem(-1) }}>
                {ticker}
                {this.getDeleteButton(ticker, i)}
            </a>
        } else {
            return <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between" key={i}
                onClick={() => { this.selectNewItem(ticker, i); }}
                onMouseOver={() => { this.hoverNewItem(i) }}>
                {ticker}
            </a>
        }
    }

    selectNewItem = (ticker, i) => {
        this.setState({
            selected: i
        });
        this.props.handlers.search(ticker);
    }

    hoverNewItem = (i) => {
        if (i >= 0) {
            this.setState({ hovered: i })
        } else {
            this.setState({ hovered: null })
        }
    }

    getDeleteButton = (ticker, i) => {
        const eventHandler = (e) => {
            e.stopPropagation();
            this.props.handlers.deleteFavorite(ticker);
        }

        return <button type="button" className="btn btn-outline-danger"
            onClick={eventHandler}>
            -
        </button>
    }
}

export default FavoritesBar;