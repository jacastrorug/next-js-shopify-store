import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/login/:path*",
        "/signup/:path*"
    ]
}

export function middleware(request: NextRequest) {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get("accessToken")?.value as string;

    if (!accessToken) return NextResponse.next();

    return NextResponse.redirect(new URL("/store", request.url));
}