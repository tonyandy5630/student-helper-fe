import { AppBar, Box } from "@mui/material"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import { AuthContext } from "context/AuthContext"
import useGetCookieTokens from "hooks/getCookieTokens"
import LoggedInHeader from "layouts/LoggedInHeader"
import { useRouter } from "next/router"
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useCookies } from "react-cookie"
import { Slide } from "@mui/material"
import Navigation from "layouts/Navigation"
import Layout from "layouts"

export default function SignedInHomePage() {
  const router = useRouter()
  const context = useContext(AuthContext)
  const { accessToken, userToken, queryState } = useGetCookieTokens()
  const [accessCookie, setAccessCookie] = useCookies([ACCESS_TOKEN_COOKIE])
  const [userCookie, setUserCookie] = useCookies([USER_COOKIE])
  const [c, setC] = useState(0)

  useEffect(() => {
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
            <Box height={1200} width={400} bgcolor='red' position='relative' marginBottom={2} />
          </>
        )
    }
  }

  const viewPage = useMemo(() => {
    return sendStatus(queryState)
  }, [queryState])

  return <Layout>{viewPage}</Layout>
}
