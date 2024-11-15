import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { username, password } = data;

        // Await cookies to retrieve the registered users cookie
        const cookiesHeader = await cookies();
        const registeredUsersCookie = cookiesHeader.get("registeredUsers")?.value;
        const registeredUsers = registeredUsersCookie ? JSON.parse(registeredUsersCookie) : [];



        console.log("Registered Users from Cookie:", registeredUsers);
        console.log("Login Request Data:", data);

        // Check if user exists with matching username and password
        const existingUser = registeredUsers.find((user: any) => user.username === username && user.password === password);
        
        if (!existingUser) {
            console.log("Error: Incorrect username or password for username:", username);
            return NextResponse.json({ error: "Incorrect username or password" }, { status: 400 });
        }

        console.log("Login successful for:", username);

        // Return userID in the response and set it as a cookie for use in the profile page
        const response = NextResponse.json({ message: "Login successful", userID: existingUser.userID });
        response.headers.set('Set-Cookie', `userID=${existingUser.userID}; Path=/; HttpOnly; Secure; SameSite=Strict`);
        response.headers.set('Location', new URL(`/profile/${existingUser.userID}`, request.url).toString());

        return response;

    } catch (error) {
        console.log("Error during login:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
