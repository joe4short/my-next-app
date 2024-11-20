

'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Paper, TextField, Button, useRadioGroup } from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';

const fetchProfile = async () => {
    try {
        const response = await axios.get('/api/profile');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);   
    }

};

export default function ProfilePage() {
    const router = useRouter();
    const { data: profile, error, mutate } = useSWR('/api/profile', fetchProfile);
    const [localError, setLocalError] = useState<string | null>(null);
    useEffect(() => {
        if (error) {
            setLocalError(error.message);
        }
    }, [error]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'isLoggedOut' && event.newValue === 'true') {
                mutate(null, false); // Invalidate the profile data in SWR

                router.push('/login');
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [router, mutate]);

    const logout = () => {
    
        document.cookie = `userID=${profile?.userID}; expires=${new Date().toUTCString()}; path=/;`;
        axios.delete('/api/profile');
        localStorage.setItem('isLoggedOut', 'true');

        mutate(null, false);
        router.push('/login');

    };

    if (localError) {
        return <Typography color="error">Error: {localError}</Typography>;
    }

    if (!profile) {
        return <Typography>Loading...</Typography>;
    }

    else if (!profile.userID) {

        setTimeout(() => router.push('/login'), 0);
    }

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
                    label="Mobile Number"
                    value={profile.mobilenumber || ''}
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

