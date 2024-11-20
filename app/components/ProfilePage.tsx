'use client';

import { Container, Typography, Paper, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

export default function ProfilePage({ params }: { params: Promise<{ userID: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ userID: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(setResolvedParams).catch(() => setResolvedParams(null));
  }, [params]);

  const { data: profile, error, mutate } = useSWR(
    resolvedParams ? `/api/profile/${resolvedParams.userID}` : null,
    async () => {
      const res = await axios.get(
        `/api/profile/${document.cookie.match(/userID=([^;]+)/)?.[1] || resolvedParams?.userID}`
      );
      return res.data;
    },
    { revalidateOnFocus: false }
  );

  const logout = async () => {
    if (resolvedParams) {
      document.cookie = `userID=${profile?.userID}; expires=${new Date().toUTCString()}; path=/;`;
      await axios.delete(`/api/profile/${resolvedParams.userID}`);
      localStorage.setItem('isLoggedOut', 'true');
      mutate(null, false);
      router.push('/login');
    }
  };

  if (!resolvedParams) {
    return <Typography>Loading user data...</Typography>;
  }

  if (!profile) {
    return <Typography>Loading profile...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <TextField
          label="User ID"
          value={profile.userID || ''}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="First Name"
          value={profile.firstname || ''}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Middle Name"
          value={profile.middlename || ''}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={profile.lastname || ''}
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
        <Button variant="contained" color="primary" fullWidth onClick={logout}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
}


// // components/ProfilePage.tsx
// 'use client';

// import { Container, Typography, Paper, TextField, Button } from '@mui/material';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// export default function ProfilePage({ profile }: { profile: any }) {
//     const router = useRouter();

//     const logout = () => {
//         // Clear the user's session (e.g., clear the cookie or session ID)
//         document.cookie = `userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//         axios.delete('/api/profile');
//         // Update localStorage to trigger logout across tabs
//         localStorage.setItem('isLoggedOut', 'true');
//         // Invalidate SWR cache and redirect to login page
//         router.push('/login');
//     };

//     return (
//         <Container maxWidth="sm">
//             <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
//                 <Typography variant="h4" gutterBottom>Profile</Typography>
//                 <TextField
//                     label="User ID"
//                     value={profile.userID || ''}
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                 />
//                 <TextField
//                     label="First Name"
//                     value={profile.firstName || ''}
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Middle Name"
//                     value={profile.middleName || ''}
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Last Name"
//                     value={profile.lastName || ''}
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Email"
//                     value={profile.email || ''}
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                 />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     onClick={logout}
//                 >
//                     Logout
//                 </Button>
//             </Paper>
//         </Container>
//     );
// }
