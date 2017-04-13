import React from 'react';

const Signup = ({
                 onSignupEmailChange,
                 onSignupPasswordChange,
                 onSignupConfirmChange,
                 onSignupAuth,
                 jumpToLogin
}) => {
  return (
    <ul>
      <li>
        Email: <input onChange={onSignupEmailChange} />
      </li>
      <li>
        Password: <input onChange={onSignupPasswordChange} />
      </li>
      <li>
        Confirm: <input onChange={onSignupConfirmChange}/>
      </li>
      <li>
        <button onClick={onSignupAuth}>
          Signup
        </button>
        <button onClick={jumpToLogin}>
          Login
        </button>
      </li>
    </ul>
  )
};

export default Signup;