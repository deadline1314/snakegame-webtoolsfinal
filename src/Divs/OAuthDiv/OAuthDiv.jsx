import React, { Component } from 'react';
import firebase from 'firebase';

import UserProfile from './components/UserProfile';
import UserAction from './components/UserAction';

class OAuthDiv extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      user: null,
      messages: [],
    };
    this.handleEmailAuth = this.handleEmailAuth.bind(this);
    this.changeEmailLogin = this.changeEmailLogin.bind(this);
    this.changePasswordLogin = this.changePasswordLogin.bind(this);
    this.changeEmailSignup = this.changeEmailSignup.bind(this);
    this.changePasswordSignup = this.changePasswordSignup.bind(this);
    this.changeConfirmSignup = this.changeConfirmSignup.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({user: user});
        this.props.onChangeUserStatus(user);
        //this.props.user = user;
      }
      else {
        this.setState({user: null});
        this.props.onChangeUserStatus(user);
        //this.props.user = null;
      }
    })
  }
  ///////////////////////////////////////////
  //Handle Email Sign up
  changeEmailSignup(e) {
    this.setState( {
      email: e.target.value
    });
  }
  changePasswordSignup(e) {
    this.setState( {
      password: e.target.value
    })
  }
  changeConfirmSignup(e) {
    this.setState( {
      confirm: e.target.value
    })
  }
  handleEmailSignup() {
    let userEmail = this.state.email;
    let userPassword = this.state.password;
    let userConfirm = this.state.confirm;

    if(userEmail.indexOf('@') >= 0 && userPassword === userConfirm && userPassword.length >= 6) {
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then(result => console.log(userEmail + 'is signing in...'))
        .catch(error => console.error(`Error: ${error.code} : ${error.message}`))
    }

  }

  ///////////////////////////////////////////
  // Handle Email login
  changeEmailLogin(e) {
    this.setState( {
      email: e.target.value
    })
  }
  changePasswordLogin(e) {
    this.setState( {
      password: e.target.value
    })
  }
  handleEmailAuth() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => console.log(this.state.email + 'is signing in...'))
      .catch(error => console.error(`Error: ${error.code} : ${error.message}`))
  }

  ///////////////////////////////////////////
  // Handle Google login
  handleGoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} is signing in...`))
      .catch(error => console.error(`Error: ${error.code} : ${error.message}`))
  }

  ////////////////////////////////////////////
  //Handle Facebook login
  handleFacebookAuth() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} is signing in...`))
      .catch(error => console.error(`Error: ${error.code} : ${error.message}`))
  }

  ///////////////////////////////////////////
  //Handle Logout action
  handleLogout() {
    firebase.auth().signOut()
      .then(() => console.log('you have signed out'))
      .catch(error => console.error(`Error: ${error.code} : ${error.message}`))
  }

  render() {
    return (
      <div>
        {this.state.user ?
          <UserProfile
            user={this.state.user}
            onLogout={this.handleLogout.bind(this)}
        /> :
          <UserAction
            onLoginEmailChange={ (e) => this.changeEmailLogin(e) }
            onLoginPasswordChange={ (e) => this.changePasswordLogin(e) }
            onEmailAuth={this.handleEmailAuth.bind(this)}
            onGoogleAuth={this.handleGoogleAuth.bind(this)}
            onFacebookAuth={this.handleFacebookAuth.bind(this)}

            onSignupEmailChange={ (e) => this.changeEmailSignup(e) }
            onSignupPasswordChange={ (e) => this.changePasswordSignup(e) }
            onSignupConfirmChange={ (e) => this.changeConfirmSignup(e) }
            onSignupAuth={this.handleEmailSignup.bind(this)}
        />}
      </div>
    );
  }
}

export default OAuthDiv;