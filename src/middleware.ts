import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers'
interface MyCookies {
    myToken?: string;
}

export function middleware(req: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('myToken')?.value;
    // console.log(token);
    if (!token && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/Login', req.url));
    }

    if (token && token.length > 100 && (req.nextUrl.pathname === '/Login' || req.nextUrl.pathname === '/Signup')) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}