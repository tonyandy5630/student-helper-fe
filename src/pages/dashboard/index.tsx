import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import { AuthContext } from "context/AuthContext"
import useGetToken from "hooks/getToken"
import LoggedInHeader from "layouts/LoggedInHeader"
import { useRouter } from "next/router"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Button } from "@mui/material"

export default function SignedInHomePage() {
  const router = useRouter()
  const context = useContext(AuthContext)
  const { accessToken, userToken, queryState } = useGetToken()
  const [accessCookie, setAccessCookie] = useCookies([ACCESS_TOKEN_COOKIE])
  const [userCookie, setUserCookie] = useCookies([USER_COOKIE])

  useEffect(() => {
    if (queryState === "error" && accessToken === "") {
      router.push("/auth/signin")
    }
    context.setUser(userToken)
    context.setAccessToken(accessToken)
    setAccessCookie(ACCESS_TOKEN_COOKIE, accessToken)
    setUserCookie(USER_COOKIE, userToken)
  }, [accessToken, userToken, queryState])

  const viewPage = useCallback(
    (status: string) => {
      switch (status) {
        case "loading":
          return <>Loading...</>
        case "error":
          router.push("/")
          return <></>
        case "success":
          return (
            <div>
              <LoggedInHeader accessCookie={accessToken} userCookie={userToken} />
              <span>{userToken.username}</span>
            </div>
          )
      }
    },
    [userToken]
  )

  return <>{viewPage(queryState)}</>
}
