// pages/profile.tsx
"use client"
import React from 'react';
import Profile from '../../components/UploadProfile';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
