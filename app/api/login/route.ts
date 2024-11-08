import { NextResponse } from "next/server";
import { registeredUsers } from "../registration/route";
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { username } = data;

        // Check if user exists
        const existingUser = registeredUsers.find(user => user.username === username);
        if (!existingUser) {
            console.log("Error: User not registered with username:", username);
            return NextResponse.json({ error: "User not registered" }, { status: 400 });
        }

        console.log("Login successful for:", username);
        return NextResponse.redirect(new URL('/profile', request.url));

    } catch (error) {
        console.log("Error during login:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
