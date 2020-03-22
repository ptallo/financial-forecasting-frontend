import React from 'react';
import LoginModal from './LoginModal';


class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.searchHandler = props.searchHandler;
        this.state = { value: '', loggedIn: props.loggedIn };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
            </form>
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#loginModal">{this.state.loggedIn ? 'Logout!' : 'Login!'}</button>
            <LoginModal loggedIn={this.state.loggedIn} loginHandler={this.props.loginHandler}></LoginModal>
        </nav>
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        const searchValue = this.state.value;
        this.searchHandler(searchValue);
        event.preventDefault();
        this.setState({ value: '' });
    }
}

export default Navbar;