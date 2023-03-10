import React from 'react'
import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
