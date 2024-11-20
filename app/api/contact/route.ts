import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

 interface Contact {
  name: string;
  email: string;
  phone: string;
}

const sampleContacts: Contact[] = [
  { name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
  { name: "Jane Smith", email: "jane.smith@example.com", phone: "098-765-4321" },
];

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const userID = cookieStore.get('userID')?.value;

  if (userID) {
    return NextResponse.json(sampleContacts);
  } else {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const userID = cookieStore.get('userID')?.value;

  if (userID) {
    return NextResponse.json(sampleContacts);
  } else {
    return NextResponse.json([]);
  }
}

