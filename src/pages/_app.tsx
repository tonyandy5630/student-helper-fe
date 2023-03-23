import React from "react"
import "../styles/global.css"
import type { AppProps } from "next/app"
import { AuthContextProvider } from "../context/AuthContext"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, createTheme } from "@mui/material/styles"

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Monsterrat"
      }
    }
  })
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
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
