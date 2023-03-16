import React from "react"
import "../styles/global.css"
import type { AppProps } from "next/app"
import { AuthContextProvider } from "../context/AuthContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
