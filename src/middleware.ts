import { NextRequest, NextResponse } from 'next/server'

import { PROFILE_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  if (pathname.startsWith('/profile') && !refreshToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (pathname.startsWith('/auth') && refreshToken) {
    return NextResponse.redirect(new URL(PROFILE_PAGES.MAIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/auth/:path*']
}
