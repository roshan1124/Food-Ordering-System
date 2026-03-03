import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div className="profile-info">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;