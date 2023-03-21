import React from "react"
import { Html, Head, Main, NextScript } from "next/document"
import GlobalCssPriority from "components/utils/globalscssprop"
import { ToastContainer } from "react-toastify"
export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <GlobalCssPriority>
        <body>
          <Main />
          <NextScript />
          <div id='portal'></div>
          <ToastContainer />
        </body>
      </GlobalCssPriority>
    </Html>
  )
}
