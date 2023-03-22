import { SetStateAction, Dispatch } from "react"
import { ResponseAPI } from "./utils.type"
import { User } from "./user.type"
export interface IAuthContext {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

export type AuthResponse = ResponseAPI<{
  access_token: string
  expires: string
  user: User
}>

export type RegisterResponse = ResponseAPI<{
  userid: string
  email: string
}>

export type LoginResponse = ResponseAPI<{
  access_token: string
  user: User
}>
