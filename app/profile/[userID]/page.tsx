
'use client';

import { Container, Typography, Paper, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import React from 'react';
import dynamic from "next/dynamic";

function ProfilePage({ params }: { params: Promise<{ userID: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ userID: string } | null>(null);
  const router = useRouter();

  // Unwrap params using React.use()
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
        <Button variant="contained" color="primary" fullWidth onClick={logout}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(ProfilePage), { ssr: false });


// 'use client';

// import { Container, Typography, Paper, TextField, Button } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import useSWR from 'swr';
// import dynamic from "next/dynamic";
// import React from 'react'




// export default function ProfilePage({ params }: { params: Promise<{ userID: string }> }) {
//   const [resolvedParams, setResolvedParams] = useState<{ userID: string } | null>(null);
//   const router = useRouter();

//   // Unwrap params using React.use()
//   useEffect(() => {
//     params.then(setResolvedParams).catch(() => setResolvedParams(null));
//   }, [params]);

//   const { data: profile, error, mutate } = useSWR(
//     resolvedParams ? `/api/profile/${resolvedParams.userID}` : null,
//     async () => {
//         const res = await axios.get(`/api/profile/${document.cookie.match(/userID=([^;]+)/)?.[1] || resolvedParams?.userID}`);
//         // const response = await axios.get(`/api/profile/${document.cookie.match(/userID=([^;]+)/)?.[1] || resolvedParams?.userID}`);
//         return res.data;;

     
//     },
//     { revalidateOnFocus: false }
//   );

//   const logout = async () => {
//     if (resolvedParams) {
//       document.cookie = `userID=${profile?.userID}; expires=${new Date().toUTCString()}; path=/;`;
//       await axios.delete(`/api/profile/${resolvedParams.userID}`);
//       localStorage.setItem('isLoggedOut', 'true');
//       mutate(null, false);
//       router.push('/login');
//     }
//   };

//   if (!resolvedParams) {
//     return <Typography>Loading user data...</Typography>;
//   }

//   if (!profile) {
//     return <Typography>Loading profile...</Typography>;
//   }

//   if (error) {
//     return <Typography color="error">Error: {error.message}</Typography>;
//   }

//   return (

//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Profile
//         </Typography>
       
//         <TextField
//           label="User ID"
//           value={profile.userID || ''}
//           fullWidth
//           variant="outlined"
//           margin="normal"
//         />

//         <TextField
//           label="First Name"
//           value={profile.firstname || ''}
//           fullWidth
//           variant="outlined"
//           margin="normal"
//         />

//         <TextField
//           label="Middle Name"
//           value={profile.middlename || ''}
//           fullWidth
//           variant="outlined"
//           margin="normal"
//         />
//         <TextField
//           label="Last Name"
//           value={profile.lastname || ''}
//           fullWidth
//           variant="outlined"
//           margin="normal"
//         />
//         <TextField
//           label="Mobile Number"
//           value={profile.mobilenumber || ''}
//           fullWidth
//           variant="outlined"
//           margin="normal"
//         />
//         <TextField
//           label="Email"
//           value={profile.email || ''}
//           fullWidth
//           variant="outlined"
//           margin="normal"
//         />
//         <Button variant="contained" color="primary" fullWidth onClick={logout}>
//           Logout
//         </Button>
//       </Paper>
//     </Container>
//   );
// }



// 'use client';

// import { use, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Container, Typography, Paper, TextField, Button, useRadioGroup } from '@mui/material';
// import axios from 'axios';
// import useSWR from 'swr';


// const fetchProfile = async () => {
//     try {
//         const response = await axios.get('/api/profile');
//         return response.data;
//     } catch (error: any) {

//         //   throw new Error(error.response?.data?.error || "An error occurred while fetching the profile.");
//         //  if(error.response?.data?.error){
//         //      loginPage();
//         //  }      
//     }

// };

// export default function ProfilePage() {
//     const router = useRouter();
//     const { data: profile, error, mutate } = useSWR('/api/profile', fetchProfile);
//     const [localError, setLocalError] = useState<string | null>(null);
//     useEffect(() => {
//         if (error) {
//             setLocalError(error.message);
//         }
//     }, [error]);

//     useEffect(() => {
//         const handleStorageChange = (event: StorageEvent) => {
//             if (event.key === 'isLoggedOut' && event.newValue === 'true') {
//                 mutate(null, false); // Invalidate the profile data in SWR

//                 router.push('/login');
//             }
//         };
//         window.addEventListener('storage', handleStorageChange);
//         return () => window.removeEventListener('storage', handleStorageChange);
//     }, [router, mutate]);

//     const logout = () => {
//         // Clear the user's session (e.g., clear the cookie or session ID)
//         document.cookie = `userID=${profile?.userID}; expires=${new Date().toUTCString()}; path=/;`;
//         axios.delete('/api/profile');
//         // Update localStorage to trigger logout across tabs
//         localStorage.setItem('isLoggedOut', 'true');

//         // Invalidate SWR cache and redirect to login page
//         mutate(null, false);
//         router.push('/login');

//     };

//     if (localError) {
//         return <Typography color="error">Error: {localError}</Typography>;
//     }

//     if (!profile) {
//         return <Typography>Loading...</Typography>;
//     }

//     else if (!profile.userID) {
//         // router.push('/login');
//         setTimeout(() => router.push('/login'), 0);
//     }

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
