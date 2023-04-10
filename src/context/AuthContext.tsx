import React, { createContext, useEffect, useMemo, useState } from "react"

import type { IAuthContext } from "../types/auth.type"
import type { User } from "types/user.type"
import { Cookies } from "react-cookie"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"

type AuthProviderProps = {
  children: React.ReactNode
}

const defaultState = {
  user: {
    email: "",
    followers: 0,
    rankInSubjects: [{}],
    username: ""
  },
  access_token: "",
  setUser: (user: User) => {},
  setAccessToken: (token: string) => {}
} as IAuthContext

export const AuthContext = createContext(defaultState)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(defaultState.user)
  const [access_token, setAccessToken] = useState(defaultState.access_token)
  const cookies = new Cookies()
  const userCookie = cookies.get(USER_COOKIE)
  const accessCookie = cookies.get(ACCESS_TOKEN_COOKIE)
  useMemo(() => {
    if (userCookie) {
      setUser(userCookie)
    }

    if (accessCookie) {
      setAccessToken(accessCookie)
    }
  }, [])

  return <AuthContext.Provider value={{ user, setUser, access_token, setAccessToken }}>{children}</AuthContext.Provider>
}
