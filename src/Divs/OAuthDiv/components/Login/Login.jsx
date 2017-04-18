import React from 'react';
import './Login.css'

const Login = ({
                onLoginEmailChange,
                onLoginPasswordChange,
                onEmailAuth,
                onGoogleAuth,
                onFacebookAuth,
                jumpToSignup
}) => {
  return (
    <div className="container">
      <h2 className="addWeight">Log In Here</h2>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" className="form-control" placeholder="Enter email" onChange={onLoginEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" className="form-control" placeholder="Enter password" onChange={onLoginPasswordChange} />
      </div>
      <button className="btn btn-default" onClick={onEmailAuth}> Login</button>
      <p>New User? <a onClick={jumpToSignup}>Sign Up Here!</a></p>
      <button className="btn btn-danger" onClick={onGoogleAuth}>Login With Google</button>
      <button className="btn btn-info" onClick={onFacebookAuth}>Login With Facebook</button>
    </div>
  )
};

export default Login;