import { CaptchaResponse } from "types/captcha.type"
import http from "utils/http"

export const verifyCaptchaAPI = (captcha: string) => http.post<CaptchaResponse>(`auth/captcha`, { captcha })
