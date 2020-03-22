import React from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import SearchForm from './SearchForm';


class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loggedIn: props.loggedIn };
    }

    render() {
        return <div>
            <nav className="navbar navbar-light bg-light d-flex">
                <SearchForm searchHandler={this.props.searchHandler}></SearchForm>
                {this.state.loggedIn ? <h1></h1> : <button type="button" className="btn btn-outline-dark m-2" data-toggle="modal" data-target="#signupModal">Sign up!</button>}
                <button type="button" className="btn btn-outline-primary m-2" data-toggle="modal" data-target="#loginModal">{this.state.loggedIn ? 'Logout!' : 'Login!'}</button>
            </nav>
            <SignupModal signupHandler={this.props.signupHandler}></SignupModal>
            <LoginModal loginHandler={this.props.loginHandler}></LoginModal>
        </div>
    }
}

export default Navbar;