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
      </li>
      <li>
        <p>Already Have An Account? <a onClick={jumpToLogin}>Log In Here!</a></p>
      </li>
    </ul>
  )
};

export default Signup;