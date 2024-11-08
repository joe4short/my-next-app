import { NextResponse } from "next/server";

// Temporary in-memory storage for registered users
export let registeredUsers: Array<{
    username: string;
    firstname: string;
    lastname: string;
    middlename?: string;
    email: string;
    password: string;
    mobilenumber: string;
    registrationDate: string;
}> = [];

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log("Received Registration data:", data);

        const {
            username,
            password,
            confirmPassword,
            firstname,
            lastname,
            middlename,
            email,
            mobilenumber
        } = data;

        // Check if user already exists
        const existingUser = registeredUsers.find(user => user.username === username);
        if (existingUser) {
            console.log("Error: User already exists with username:", username);
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            console.log("Error: Passwords do not match");
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        const registrationDate = new Date().toUTCString();
        registeredUsers.push({
            username,
            firstname,
            lastname,
            password,
            middlename,
            email,
            mobilenumber,
            registrationDate
        });

        console.log("Registration successful for:", username);

        // Serialize registered users to a JSON string for storing in a cookie
        const usersCookieValue = JSON.stringify(registeredUsers.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
password: user.password,
            email: user.email,
            mobilenumber: user.mobilenumber,
            registrationDate: user.registrationDate
        })));

        const response = NextResponse.json({ message: "Registration successful" }, { status: 201 });
        response.headers.set('Set-Cookie', `registeredUsers=${encodeURIComponent(usersCookieValue)}; Path=/; HttpOnly; Secure; SameSite=Strict`);

        return response;
    } catch (error) {
        console.error("Registration failed:", error);
        return NextResponse.json({ "error": "Registration failed" });
    }
}
export async function GET() {
    return NextResponse.json({ registeredUsers }, { status: 200 });
}
