
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';
import { colors } from "@mui/material";
export let registeredUsers: Array<{
    userID: string;
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

        console.log("Registered Users:", registeredUsers);
        
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

        // Generate unique userID and registration date
        const userID = uuidv4();
        const registrationDate = new Date().toUTCString();

        // Add new user with userID to the in-memory storage
        registeredUsers.push({
            userID,
            username,
            firstname,
            lastname,
            password,
            middlename,
            email,
            mobilenumber,
            registrationDate
        });

        console.log("content of registeredUsers:", registeredUsers);
        console.log("Registration successful for:", username);

        // Serialize registered users to a JSON string for storing in a cookie
        const usersCookieValue = JSON.stringify(registeredUsers);

        // Set cookie using NextResponse to ensure compatibility with Next.js
        const response = NextResponse.json({ message: "Registration successful" }, { status: 201 });
       
        const cookie = response.cookies.get("registeredUsers");
        if (cookie === undefined || cookie.value !== usersCookieValue) {
            response.cookies.set("registeredUsers", usersCookieValue, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });
        }

   

        return response;
    } catch (error: Error | any) {
        console.error("Registration failed:", error.message);
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json(registeredUsers);
}