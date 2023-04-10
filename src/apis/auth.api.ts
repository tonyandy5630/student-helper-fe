import { ACCESS_TOKEN_COOKIE } from "constants/auth"
import { Cookies } from "react-cookie"
import { LoginResponse, RegisterResponse } from "types/auth.type"
import { ResponseAPI } from "types/utils.type"
import http from "utils/http"

const cookies = new Cookies()
const accessCookie = cookies.get(ACCESS_TOKEN_COOKIE)

export const registerAccountAPI = (body: { email: string; username: string; pwd: string }) =>
  http.post<RegisterResponse>("/auth/signup", body)

export const LoginAPI = (body: { username: string; pwd: string }) => http.post<LoginResponse>("/auth/login", body)

export const verifyEmailAPI = (email: string, verifyToken: string) =>
  http.get<ResponseAPI<{}>>(`auth/verification/${email}/${verifyToken}`)

export const resendVerifyEmailAPI = (body: { email: string }) =>
  http.post<ResponseAPI<{}>>("auth/verification/resendToken", body)

export const checkLoginAPI = () => http.post<LoginResponse>("/auth/success")

export const logoutAPI = (body: { email: string }, accessToken: string) => {
  return http.post<ResponseAPI<{}>>("/auth/logout", body, {
    headers: {
      Authorization: accessToken
    }
  })
}

export const googleLoginAPI = () => http.get("/auth/google/callback")
