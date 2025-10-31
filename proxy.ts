export { auth as middleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  // Your proxy logic here
  // For example, a redirect:
  // return NextResponse.redirect(new URL('/home', request.url));

  // Or a rewrite:
  // return NextResponse.rewrite(new URL('/new-path', request.url));

  // Or simply allow the request to proceed:
  return NextResponse.next();
}
