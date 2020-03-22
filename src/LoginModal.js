import React from 'react';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);   
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    render() {
        return <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={this.handleFormSubmit}>
                            <div class="form-group">
                                <label for="usernameInput">Username</label>
                                <input type="text" class="form-control" id="usernameInput" placeholder="Username" onChange={this.handleUsernameChange} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword" placeholder="Password" onChange={this.handlePasswordChange}/>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }
    
    handleFormSubmit() {
        this.props.loginHandler(this.state.username, this.state.password);
        this.setState({
            username: '',
            password: ''
        });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
}

export default LoginModal;