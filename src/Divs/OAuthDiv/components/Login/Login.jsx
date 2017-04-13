import React from 'react';

const Login = ({
                onLoginEmailChange,
                onLoginPasswordChange,
                onEmailAuth,
                onGoogleAuth,
                onFacebookAuth,
                jumpToSignup
}) => {
  return (
    <ul>
      <li>
        Email: <input onChange={onLoginEmailChange} />
      </li>
      <li>
        Password: <input onChange={onLoginPasswordChange} />
      </li>
      <li>
        <button onClick={onEmailAuth}>
          Login
        </button>
        <button onClick={jumpToSignup}>
          Signup
        </button>
      </li>
      <li>
        <button onClick={onGoogleAuth}>
          Login With Google
        </button>
      </li>
      <li>
        <button onClick={onFacebookAuth}>
          Login With Facebook
        </button>
      </li>
    </ul>
  )
};

export default Login;