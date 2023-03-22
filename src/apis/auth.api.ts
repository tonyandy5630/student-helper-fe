import { RegisterResponse } from "types/auth.type"
import http from "utils/http"

export const registerAccountAPI = (body: { email: string; username: string; pwd: string }) =>
  http.post<RegisterResponse>("/auth/signup", body)
