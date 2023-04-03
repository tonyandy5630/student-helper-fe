import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import { Cookies } from "react-cookie"

type IAuth = {}

export default function isAuthHook() {
  const cookie = new Cookies()

  const accessToken = cookie.get(ACCESS_TOKEN_COOKIE)
  const user = cookie.get(USER_COOKIE)

  if (!accessToken || !user) {
    return null
  }
  return {
    user,
    accessToken
  }
}
