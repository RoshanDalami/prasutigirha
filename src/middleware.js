import {NextRequest,NextResponse} from 'next/server';

export function middleware(req){
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/login';
    const token = req.cookies.get('token')?.value || ''
    if(token && isPublicPath){
        return NextResponse.redirect(new URL('/',req.nextUrl))
    }
    if(!token && !isPublicPath ){
        return NextResponse.redirect(new URL('/login',req.nextUrl))
    }
}
export const config = {
    matcher: [
        '/',
      '/login',
    ],
  }