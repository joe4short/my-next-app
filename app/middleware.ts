import { NextApiResponse, type NextApiRequest } from "next";
import { type NextRequest , NextResponse } from "next/server";
     
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   
   if(request.nextUrl.pathname==="/profile"){
    return NextResponse.redirect(new URL("/login", request.url))
    
  }

}
