import React, { createContext, useState } from 'react'

import type { User, IAuthContext } from '../types/Auth'

type AuthProviderProps = {
  children: React.ReactNode
}

const defaultState = {
  user: {
    username: '',
    email: '',
    fullname: ''
  },
  setUser: (user: User) => {}
} as IAuthContext

export const AuthContext = createContext(defaultState)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    fullname: ''
  })

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
