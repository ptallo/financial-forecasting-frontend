import React from 'react';

class ButtonsToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateranges: ["1m", "3m", "6m", "1y"]
        }
    }
    render() {
        return <div className="btn-toolbar ml-5 my-3" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" className={this.getFavoritesButtonClass()} onClick={() => { this.props.handlers.addFavorite(this.props.ticker); }}>☆</button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Second group">
                {this.state.dateranges.map(dr => this.getButtonForDaterange(dr))}
            </div>
        </div>
    }

    getFavoritesButtonClass = () => {
        return this.props.favorites.indexOf(this.props.ticker) < 0 ? "btn btn-success" : "btn btn-danger"
    }

    getButtonForDaterange = (range) => {
        let classes = range == this.props.daterange ?
            "btn btn-primary btn-lg" :
            "btn btn-secondary";
        return <button type="button" className={classes} onClick={() => { this.props.handlers.updateDaterange(range); }}>{range}</button>
    }
}

export default ButtonsToolbar;
