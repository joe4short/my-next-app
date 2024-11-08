import { NextApiResponse, type NextApiRequest } from "next";
import { type NextRequest , NextResponse } from "next/server";


     
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   
   if(request.nextUrl.pathname==="/profile"){
    return NextResponse.redirect(new URL("/login", request.url))
    
  }
   
  // See "Matching Paths" below to learn more

    // if(request.nextUrl.pathname === '/'){
    //     return Response.redirect(new URL('/login', request.url))    
    // }

    // else if(request.nextUrl.pathname === '/login'){
    //     return Response.redirect(new URL('/registration', request.url))    
    // }
}
  
