'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const HomePage = () => {
  const { data: profileData, error } = useSWR('/api/profile', async () => {
    const response = await axios.get('/api/profile');
    return response.data;
  });

  if (error) return <div>Failed to load</div>;
  if (!profileData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold">Home Page</h1>

      {profileData.userID ? (

        <p>Welcome, your User ID is: {profileData.userID}</p>       

      ) : (

        <p>You are not logged in</p>
      )}

     
    </div>
  );
};

export default HomePage;

