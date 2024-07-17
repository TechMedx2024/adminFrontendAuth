// import { NextResponse } from 'next/server';
// const authPaths = ['/']
// export async function middleware(request) {
//     console.log('Middleware is running');
//     try {
//         const isAuthenticated = request.cookies.get('is_auth')?.value;
//         const path = request.nextUrl.pathname;
//         if (isAuthenticated) {

//             if (authPaths.includes(path)) {
//                 return NextResponse.redirect(new URL('/components/dashboards/ecommerce/'))
//             }
//         }
//         if (!isAuthenticated) {
//             console.log("user profs")
//             return NextResponse.redirect(new URL('/', request.url));
//         }

//         return NextResponse.next();
//     } catch (error) {
//         console.error('Middleware error:', error);
//         return NextResponse.next(); // Ensure to continue if an error occurs
//     }
// }

// export const config = {
//     matcher: ['/components/dashboards/:path*']
// };


import { NextResponse } from 'next/server';

export async function middleware(request) {
    console.log('Middleware is running');
    try {
        const isAuthenticated = request.cookies.get('is_auth')?.value;
        const path = request.nextUrl.pathname;

        // Paths that require authentication
        const protectedPaths = ['/components/dashboards/ecommerce'];

        if (isAuthenticated) {
            // Redirect authenticated users from '/' and '/loginOtp/' to the dashboard
            if (path === '/' || path === '/loginOtp/') {
                return NextResponse.redirect(new URL('/components/dashboards/ecommerce', request.url));
            }
        } else {
            // Redirect unauthenticated users from protected paths to the login or root page
            if (protectedPaths.some(p => path.startsWith(p))) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.next(); // Ensure to continue if an error occurs
    }
}

export const config = {
    matcher: ['/', '/loginOtp', '/components/dashboards/ecommerce/:path*'],
};
