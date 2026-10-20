// web/src/auth/authRoute.ts

import type { Context } from 'hono'
import { createRPC } from '@hono-api/be'
import type { AppType } from '@src/index'
import { getSession, GetSessionSuccess } from '@src/auth/getSession'


export async function authRoute(c: Context): Promise<AuthRouteRes> {
  const resSession = await getSession(c, 'include-person-and-contact')

  if (resSession.status === 401) {
    const redirect: string = createRPC<AppType>()['sign-in'].$url().href
    return { authenticated: false, redirect }
  }

  return { authenticated: true, resSession }
}


type AuthRouteRes = 
  | { authenticated: false, redirect: string }
  | { authenticated: true, resSession: GetSessionSuccess<'include-person-and-contact'> }
