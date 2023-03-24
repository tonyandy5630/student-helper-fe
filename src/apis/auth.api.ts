import { LoginResponse, RegisterResponse } from "types/auth.type"
import { ResponseAPI } from "types/utils.type"
import http from "utils/http"

export const registerAccountAPI = (body: { email: string; username: string; pwd: string }) =>
  http.post<RegisterResponse>("/auth/signup", body)

export const LoginAPI = (body: { username: string; pwd: string }) => http.post<LoginResponse>("/auth/login", body)

export const verifyEmailAPI = (email: string, verifyToken: string) =>
  http.get<ResponseAPI<{}>>(`auth/verification/${email}/${verifyToken}`)

export const resendVerifyEmailAPI = (body: { email: string }) =>
  http.post<ResponseAPI<{}>>("auth/verification/resendToken", body)
