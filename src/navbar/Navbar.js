import React from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import SearchForm from './SearchForm';



class Navbar extends React.Component {
    render() {
        let signupButton = <button type="button" className="btn btn-outline-success ml-auto m-2" data-toggle="modal" data-target="#signupModal">Sign up</button>
        let searchForm = <SearchForm searchHandler={this.props.handlers.search}></SearchForm>
        let loginButton = <button type="button" className="btn btn-outline-primary m-2" data-toggle="modal" data-target="#loginModal">Login</button>
        let logoutButton = <button type="button" className="btn btn-outline-primary m-2" onClick={() => { this.props.handlers.logout(); this.setState({ loggedIn: false }); }}>Logout</button>

        return <div>
            <nav className="navbar navbar-dark bg-dark d-flex flex-row">
                <a className="navbar-brand" href="#">MLStockSite</a>
                {this.props.loggedIn ? null : signupButton}
                {this.props.loggedIn ? searchForm : null}
                {this.props.loggedIn ? logoutButton : loginButton}
            </nav>
            <SignupModal signupHandler={this.props.handlers.signup}></SignupModal>
            <LoginModal loginHandler={this.props.handlers.login}></LoginModal>
        </div>
    }
}

export default Navbar;