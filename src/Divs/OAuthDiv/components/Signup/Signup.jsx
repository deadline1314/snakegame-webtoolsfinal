import React from 'react';
import './Signup.css';

const Signup = ({
                 onSignupEmailChange,
                 onSignupPasswordChange,
                 onSignupConfirmChange,
                 onSignupAuth,
                 jumpToLogin
}) => {
  return (
    <div className="container">
      <h2 className="addWeight">Sign Up Here</h2>
      <div>
        <label>Email: </label>
        <input type="email" className="form-control" placeholder="Enter email" onChange={onSignupEmailChange} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" className="form-control" placeholder="Enter password" onChange={onSignupPasswordChange} />
      </div>
      <div>
        <label>Confirm: </label>
        <input type="password" className="form-control" placeholder="Confirm your password" onChange={onSignupConfirmChange}/>
      </div>

      <button className="btn btn-default" onClick={onSignupAuth}>Signup</button>

      <p>Already Have An Account? <a onClick={jumpToLogin}>Log In Here!</a></p>

    </div>
  )
};

export default Signup;