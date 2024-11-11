import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import { registeredUsers } from "../registration/route";

export async function GET() {
    const cookieStore = await cookies();
    const userID = cookieStore.get('userID')?.value;

    if (!userID) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Find user profile by userID
    const userProfile = registeredUsers.find(user => user.userID === userID);

    if (!userProfile) {
        return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    // Return user profile details
    return NextResponse.json({ 
        firstName: userProfile.firstname, 
        middleName: userProfile.middlename, 
        lastName: userProfile.lastname, 
        email: userProfile.email 
    }, { status: 200 });
}
