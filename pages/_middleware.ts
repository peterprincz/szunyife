import { NextRequest, NextResponse } from 'next/server'

const PRIVATE_PAGES:string[] = ["feed"];

class InboundRequest {

  basePath: string;
  isApiRequest: boolean;


  constructor(nextRequest:NextRequest){
    this.basePath = nextRequest.nextUrl.pathname;
    this.isApiRequest = nextRequest.nextUrl.pathname.startsWith("/api/");
  }

}

export function middleware(req: NextRequest) {
  // Add the user token to the response
  const inboundRequest = new InboundRequest(req);
  console.log("middleware called")
  NextResponse.next();
}

