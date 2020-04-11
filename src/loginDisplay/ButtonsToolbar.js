import React from 'react';

class ButtonsToolbar extends React.Component {
    render() {
        return <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-primary" onClick={() => { this.props.handlers.addFavorite(this.props.ticker); }}>☆</button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Second group">
                <button type="button" className="btn btn-secondary" onClick={() => { this.props.handlers.updateDaterange("1m"); }}>1m</button>
                <button type="button" className="btn btn-secondary" onClick={() => { this.props.handlers.updateDaterange("3m"); }}>3m</button>
                <button type="button" className="btn btn-secondary" onClick={() => { this.props.handlers.updateDaterange("6m"); }}>6m</button>
                <button type="button" className="btn btn-secondary" onClick={() => { this.props.handlers.updateDaterange("1y"); }}>1y</button>
            </div>
        </div>
    }
}

export default ButtonsToolbar;
