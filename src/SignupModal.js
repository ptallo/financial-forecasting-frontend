import React from 'react';

class SignupModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordConfirm: ''
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
        this.isValidSubmit = this.isValidSubmit.bind(this);
        this.doPasswordsMatch = this.doPasswordsMatch.bind(this);
    }

    render() {
        return <div className="modal fade" id="signupModal" role="dialog" >
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
                            {!this.doPasswordsMatch() && this.state.passwordConfirm.length != 0 ? <p className="text-danger">Passwords don't match!</p> : <h1></h1>}
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.handlePasswordChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                <input type="password" className="form-control" id="inputPasswordConfirm" placeholder="Confirm Password" onChange={this.handlePasswordConfirm} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={!this.isValidSubmit()} >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }

    isValidSubmit() {
        return this.doPasswordsMatch() && this.state.password.length != 0 && this.state.username.length != 0;
    }

    doPasswordsMatch() {
        return this.state.password == this.state.passwordConfirm;
    }

    handleFormSubmit() {
        if (this.isValidSubmit()) {
            this.props.signupHandler(this.state.username, this.state.password);
            this.setState({
                username: '',
                password: '',
                passwordConfirm: ''
            });
        } else {
            alert('Passwords don\'t match! Please choose matching passwords!');
        }
    }


    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handlePasswordConfirm(event) {
        this.setState({ passwordConfirm: event.target.value });
    }
}

export default SignupModal;