import React, { useEffect } from "react"
import dynamic from "next/dynamic"
const SMHeader = dynamic(() => import("./LoggedInHeader-SM"))
const MyNav = dynamic(() => import("./Navigation"))
const LGHeader = dynamic(() => import("./LoggedInHeader-LG"))
import useGetCookieTokens from "hooks/getCookieTokens"
import { useRouter } from "next/router"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { Container, Stack } from "@mui/material"

type Props = {
  children: React.ReactNode
}

export default function LoggedInLayout({ children }: Props) {
  const { accessToken, userToken, queryState } = useGetCookieTokens()
  const router = useRouter()
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))

  useEffect(() => {
    if (queryState === "error" && accessToken === "") {
      router.push("/auth/signin")
    }
  }, [accessToken, queryState])

  return (
    <>
      {isLargeScreen ? (
        <LGHeader accessCookie={accessToken} userCookie={userToken} />
      ) : (
        <SMHeader accessCookie={accessToken} userCookie={userToken} />
      )}
      <Container maxWidth='lg' component={Stack}>
        {children}
      </Container>
      {isLargeScreen ? <></> : <MyNav notificationQuantity={0} />}
    </>
  )
}
