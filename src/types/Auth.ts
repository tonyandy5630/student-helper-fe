import { SetStateAction, Dispatch } from "react"

export type User = {
  username: string
  email: string
  fullname: string
  phone?: string
}

export interface IAuthContext {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}
