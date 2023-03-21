import { ResponseAPI } from "./utils.type"

export type CaptchaResponse = ResponseAPI<{
  captcha_verified: boolean
}>
