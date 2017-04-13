import React from 'react';

const UserProfile = ({
                      user,
                      onLogout
}) => {
  return (
    <ul>
      <li>
        <img
          alt="this is a pic"
          width="32"
          src={user.photoURL}
        />
      </li>
      <li>{user.displayName}</li>
      <li>
        <button onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
};

export default UserProfile;