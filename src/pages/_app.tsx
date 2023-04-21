import React from "react"
import "../styles/global.css"
import type { AppProps } from "next/app"
import { AuthContextProvider } from "../context/AuthContext"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CookiesProvider } from "react-cookie"
import { ThemeContextProvider } from "context/ThemeContext"
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <CookiesProvider>
            <ThemeContextProvider>
              <Component {...pageProps} />
            </ThemeContextProvider>
          </CookiesProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
