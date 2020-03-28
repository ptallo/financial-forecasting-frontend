import React from 'react';
import $ from 'jquery';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return <div className="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="usernameInput">Username</label>
                                <input type="text" className="form-control" id="usernameInput" placeholder="Username" onChange={this.handleUsernameChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" onChange={this.handlePasswordChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        $('#loginModal').modal('toggle');
        this.setState({
            username: '',
            password: ''
        })
        this.props.loginHandler(this.state.username, this.state.password);
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
}

export default LoginModal;