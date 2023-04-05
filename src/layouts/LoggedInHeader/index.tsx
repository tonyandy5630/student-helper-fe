import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import Link from "next/link"
import React from "react"
import { Button } from "@mui/material"
import { Cookies } from "react-cookie"
import { useRouter } from "next/router"

export default function LoggedInHeader() {
  //* use context to store logged in user
  const router = useRouter()

  function handleLogOut() {
    const cookies = new Cookies()
    const accessCookie = cookies.get(ACCESS_TOKEN_COOKIE)
    const userCookie = cookies.get(USER_COOKIE)
    if (accessCookie && userCookie) {
      cookies.remove(ACCESS_TOKEN_COOKIE)
      cookies.remove(USER_COOKIE)
      router.push("/")
    }
  }
  return (
    <header>
      <Button variant='text' onClick={handleLogOut}>
        Log out
      </Button>
    </header>
  )
}
