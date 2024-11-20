import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Function to fetch profile data by userID
async function getProfileDataByUserID(userID: string, registeredUsers: any[]) {
  return registeredUsers.find(profile => profile.userID === userID) || null;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ userID: string }> } // Fix: `params` is a Promise
) {
  try {
    // Await the `params` object
    const { userID } = await context.params;

    // Get the 'registeredUsers' cookie
    const cookieStore = await cookies();
    const registeredUsersCookie = cookieStore.get('registeredUsers')?.value;

    if (!registeredUsersCookie) {
      return NextResponse.json(
        { error: 'Registered users not found. Please log in.' },
        { status: 401 }
      );
    }

    // Parse the cookie value (assumes it's stored as a JSON string)
    const registeredUsers = JSON.parse(registeredUsersCookie);

    console.log('Registered Users:', userID);

    if (!userID) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch the user's profile from registered users
    const profile = await getProfileDataByUserID(userID, registeredUsers);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error in GET /api/profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const userID = cookieStore.get('userID')?.value; // Using 'userID' cookie

  if (!userID) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  // Delete the 'userID' cookie
  cookieStore.set({
    name: 'userID',
    value: '',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ message: 'User logged out successfully' }, { status: 200 });
}


// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// // Function to fetch profile data by userID
// async function getProfileDataByUserID(userID: string, registeredUsers: any[]) {
//   return registeredUsers.find(profile => profile.userID === userID) || null;
// }

// export async function GET(
//   request: Request,
//   { params }: { params: { userID: string } }
// ) {
//   try {
//     // Get the 'registeredUsers' cookie
//     const cookieStore = await cookies();
//     const registeredUsersCookie = cookieStore.get('registeredUsers')?.value;

//     if (!registeredUsersCookie) {
//       return NextResponse.json(
//         { error: 'Registered users not found. Please log in.' },
//         { status: 401 }
//       );
//     }

//     // Parse the cookie value (assumes it's stored as a JSON string)
//     const registeredUsers = JSON.parse(registeredUsersCookie);

//     console.log('Registered Users:', registeredUsers);

//     // Extract the userID from the params
//     const { userID } = params;

//     if (!userID) {
//       return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//     }



//     // Fetch the user's profile from registered users
//     const profile = await getProfileDataByUserID(userID, registeredUsers);

//     if (!profile) {
//       return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
//     }

//     return NextResponse.json(profile);
//   } catch (error) {
//     console.error('Error in GET /api/profile:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }


// export async function DELETE(request: Request) {
//     const cookieStore = await cookies();
//     const registeredUsers = cookieStore.get('userID')?.value; // Using 'registeredUsers' cookie

//     if (!registeredUsers) {
//         return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
//     }

//     // Delete the 'registeredUsers' cookie
//     cookieStore.set({
//         name: 'userID',
//         value: '',
//         path: '/',
//         maxAge: 0,
//     });

//     return NextResponse.json({ message: "User logged out successfully" }, { status: 200 });
// }