import React from 'react';


class FavoritesBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            return this.getSelectedIndex() == i ? this.getSelectedElement(item, i) : this.getUnselectedElement(item, i);
        });
    }

    getSelectedIndex = () => {
        return this.props.favorites.indexOf(this.props.ticker)
    }

    getSelectedElement = (ticker, i) => {
        if (this.state.hovered == i) {
            return <a href="#" className={this.getLiClasses(true)} key={i}
                onMouseLeave={() => { this.hoverNewItem(-1) }}>
                {ticker}
                {this.getDeleteButton(ticker, i)}
            </a>
        } else {
            return <a href="#" className={this.getLiClasses(true)} key={i}
                onMouseOver={() => { this.hoverNewItem(i) }}>
                {ticker}
            </a>
        }
    }

    getUnselectedElement = (ticker, i) => {
        if (this.state.hovered == i) {
            return <a href="#" className={this.getLiClasses(false)} key={i}
                onClick={() => { this.selectNewItem(ticker, i); }}
                onMouseLeave={() => { this.hoverNewItem(-1) }}>
                {ticker}
                {this.getDeleteButton(ticker, i)}
            </a>
        } else {
            return <a href="#" className={this.getLiClasses(false)} key={i}
                onClick={() => { this.selectNewItem(ticker, i); }}
                onMouseOver={() => { this.hoverNewItem(i) }}>
                {ticker}
            </a>
        }
    }

    getLiClasses = (active) => {
        return active ?
            "list-group-item list-group-item-action active d-flex justify-content-between p-3" :
            "list-group-item list-group-item-action d-flex justify-content-between p-3"
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

        return <button type="button" className="btn btn-outline-danger btn-sm"
            onClick={eventHandler}>
            delete
        </button>
    }
}

export default FavoritesBar;