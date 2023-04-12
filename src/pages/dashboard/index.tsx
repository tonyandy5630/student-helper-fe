import { AppBar, Box } from "@mui/material"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import { AuthContext } from "context/AuthContext"
import useGetToken from "hooks/getToken"
import LoggedInHeader from "layouts/LoggedInHeader"
import { useRouter } from "next/router"
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useCookies } from "react-cookie"
import { Slide } from "@mui/material"

export default function SignedInHomePage() {
  const router = useRouter()
  const context = useContext(AuthContext)
  const { accessToken, userToken, queryState } = useGetToken()
  const [accessCookie, setAccessCookie] = useCookies([ACCESS_TOKEN_COOKIE])
  const [userCookie, setUserCookie] = useCookies([USER_COOKIE])
  const [c, setC] = useState(0)

  useEffect(() => {
    if (queryState === "error" && accessToken === "") {
      router.push("/auth/signin")
    }
    context.setUser(userToken)
    context.setAccessToken(accessToken)
    setAccessCookie(ACCESS_TOKEN_COOKIE, accessToken)
    setUserCookie(USER_COOKIE, userToken)
  }, [accessToken, userToken.username, queryState])

  const sendStatus = (status: string) => {
    switch (status) {
      case "loading":
        return <>Loading...</>
      case "error":
        router.push("/")
        return <></>
      case "success":
        return (
          <>
            <LoggedInHeader accessCookie={accessToken} userCookie={userToken} />
            <Box
              height={1200}
              width={400}
              bgcolor='red'
              position='relative'
              marginBottom={2}
              onClick={() => setC((prev) => prev + 1)}
            />
          </>
        )
    }
  }

  const viewPage = useMemo(() => {
    return sendStatus(queryState)
  }, [queryState])

  return <>{viewPage}</>
}
