import { Container, Box } from "@mui/material"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import { AuthContext } from "context/AuthContext"
import useGetCookieTokens from "hooks/getCookieTokens"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useMemo } from "react"
import { useCookies } from "react-cookie"
import Layout from "layouts"

export default function SignedInHomePage(props: any) {
  const router = useRouter()
  const context = useContext(AuthContext)
  const { accessToken, userToken, queryState } = useGetCookieTokens()
  const [accessCookie, setAccessCookie] = useCookies([ACCESS_TOKEN_COOKIE])
  const [userCookie, setUserCookie] = useCookies([USER_COOKIE])

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
            <Box sx={{ border: "1px solid red", height: "56px" }}>Future majors</Box>
          </>
        )
    }
  }

  const viewPage = useMemo(() => {
    return sendStatus(queryState)
  }, [queryState])

  return <Layout>{viewPage}</Layout>
}
