
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const newUser = await request.json();
    const cookieStore = await cookies();
    const useraccount = cookieStore.get('registeredUsers')?.value;
    
    interface User {
        userID: string;
        firstname: string;
        lastname: string;
        middlename: string;
        mobilenumber: string;
        email: string;
    }

    // Retrieve current registered users
    let registeredUsers: Array<User> = useraccount ? JSON.parse(useraccount) : [];

    // Check if the user already exists by userID
    const existingUser = registeredUsers.find(user => user.userID === newUser.userID);
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Add the new user
    registeredUsers.push(newUser);

    // Update the cookie with the new registeredUsers array with persistence
    cookieStore.set({
        name: 'registeredUsers',
        value: JSON.stringify(registeredUsers),
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // Persistent for 1 week
    });

    // Optionally, set a persistent userID cookie
    cookieStore.set({
        name: 'userID',
        value: newUser.userID,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // Persistent for 1 week
    });

    return NextResponse.json({ message: "User added successfully", user: newUser }, { status: 201 });
}

export async function GET(request : Request) {
    const cookieStore = await cookies();
    const userID = cookieStore.get('userID')?.value;
    const useraccount = cookieStore.get('registeredUsers')?.value;
    
    // console.log("User ID from registeredUsers:", userID);
    // console.log(useraccount);
    if(!userID) {
    
        return NextResponse.redirect(new URL("/login", request.url), 302);
    
    }
    //Check if user is authenticated
    // if (!userID) {
    //    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
      
    // }
    interface User {
        userID: string;
        firstname: string;
        lastname: string;
        middlename: string;
        mobilenumber: string;
        email: string;
    }
   
    let registeredUsers: Array<User> = [];
    if (useraccount) {
        registeredUsers = JSON.parse(useraccount);
    }
   
    // Find user profile by userID
    const userProfile = registeredUsers.find(user => user.userID === userID);
    console.log(userProfile);

    if (userProfile == undefined) {
       // return NextResponse.redirect(new URL("/login", request.url), 302);
         return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }
   
    // Return user profile details
    return NextResponse.json({ 
        userID: userProfile.userID,
        firstName: userProfile.firstname, 
        middleName: userProfile.middlename, 
        lastName: userProfile.lastname, 
        email: userProfile.email, 
        contactnumber: userProfile.mobilenumber
    }, { status: 200 });
}



export async function DELETE(request: Request) {
    const cookieStore = await cookies();
    const userID = cookieStore.get('userID')?.value;
    if (!userID) {
        // return NextResponse.redirect('/login', 302);
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Delete the userID cookie
    cookieStore.set({
        name: 'userID',
        value: '',
        path: '/',
        maxAge: 0,
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}

