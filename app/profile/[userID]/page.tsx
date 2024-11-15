"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import { Container, Typography, Paper, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get('/api/profile');
                setProfile(response.data);
            } catch (error: any) {
                console.error("Failed to fetch profile:", error);
                setError(error.response?.data?.error || "An error occurred while fetching the profile.");
            }
        }
        fetchProfile();
    }, []);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (!profile) {
        return <Typography>Loading...</Typography>;
    }

    const logout = () => {
        console.log("Logout called");
        window.location.href = '/login';
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>Profile</Typography>
                <TextField
                    label="User ID"
                    value={profile.userID || ''}
                    fullWidth
                    variant="outlined"
                    margin="normal"
             
                />
                <TextField
                    label="First Name"
                    value={profile.firstName || ''}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                
                />
                <TextField
                    label="Middle Name"
                    value={profile.middleName || ''}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                 
                />
                <TextField
                    label="Last Name"
                    value={profile.lastName || ''}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                 
                />
                <TextField
                    label="Email"
                    value={profile.email || ''}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                   
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={logout}
                >
                    Logout
                </Button>
            </Paper>
        </Container>
    );
}

