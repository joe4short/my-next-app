"use client";

import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('api/profile');
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error);
                } else {
                    const data = await response.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                setError("An error occurred while fetching the profile.");
            }
        }

        fetchProfile();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Middle Name:</strong> {profile.middleName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
        </div>
    );
}
