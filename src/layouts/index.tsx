import React, { useEffect } from "react"
import Header from "./LoggedInHeader"
import MyNav from "./Navigation"
import useGetCookieTokens from "hooks/getCookieTokens"
import { useRouter } from "next/router"

type Props = {
  children: React.ReactNode
}

export default function LoggedInLayout({ children }: Props) {
  const { accessToken, userToken, queryState } = useGetCookieTokens()
  const router = useRouter()

  useEffect(() => {
    if (queryState === "error" && accessToken === "") {
      router.push("/auth/signin")
    }
  }, [accessToken, queryState])

  return (
    <>
      <Header accessCookie={accessToken} userCookie={userToken} />
      {children}
      <MyNav notificationQuantity={0} />
    </>
  )
}
