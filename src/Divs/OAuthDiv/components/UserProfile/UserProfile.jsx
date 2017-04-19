import React from 'react';
import './UserProfile.css';

const UserProfile = ({
                      user,
                      onLogout
}) => {
  return (
    <div className="card">
      {user.photoURL ?
        <img
          alt="this is a pic"
          width="100%"
          src={user.photoURL}
        /> :
        <img
          alt="this is a pic"
          width="100%"
          src='./pic/user_default.png'
        />}
      <div>
        {user.displayName ?
          <h4>{user.displayName}</h4> : <h4>Anonymous</h4>
        }
        </div>
      <p className="white"><button className="profile-btn" onClick={onLogout}>Logout</button></p>
    </div>
  )
};

export default UserProfile;