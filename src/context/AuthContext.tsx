import React, { createContext, useState } from "react"

import type { IAuthContext } from "../types/auth.type"
import type { User } from "types/user.type"

type AuthProviderProps = {
  children: React.ReactNode
}

const defaultState = {
  user: {
    _id: "",
    email: "",
    followers: 0,
    isActive: true,
    isBanned: false,
    rankInSubjects: [{}],
    role: "user",
    username: ""
  },
  setUser: (user: User) => {}
} as IAuthContext

export const AuthContext = createContext(defaultState)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(defaultState.user)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
