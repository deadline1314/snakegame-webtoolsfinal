import React, { Component } from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

class UserAction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'Login'
    }
  }
  jumpToSignup() {
    this.setState({
      page: 'Signup'
    })
  }
  jumpToLogin() {
    this.setState({
      page: 'Login'
    })
  }

  render() {
    return (
      <div>
        {this.state.page === 'Login' && <Login
          onLoginEmailChange={this.props.onLoginEmailChange}
          onLoginPasswordChange={this.props.onLoginPasswordChange}
          onEmailAuth={this.props.onEmailAuth}
          onGoogleAuth={this.props.onGoogleAuth}
          onFacebookAuth={this.props.onFacebookAuth}
          jumpToSignup={this.jumpToSignup.bind(this)}

        />}
        {this.state.page === 'Signup' && <Signup
          onSignupEmailChange={this.props.onSignupEmailChange}
          onSignupPasswordChange={this.props.onSignupPasswordChange}
          onSignupConfirmChange={this.props.onSignupConfirmChange}
          onSignupAuth={this.props.onSignupAuth}
          jumpToLogin={this.jumpToLogin.bind(this)}
        />}
      </div>
    )
  }
}

export default UserAction;