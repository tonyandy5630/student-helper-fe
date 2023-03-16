import React from "react"
import { Html, Head, Main, NextScript } from "next/document"
import GlobalCssPriority from "components/utils/globalscssprop"

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <GlobalCssPriority>
          <Main />
          <NextScript />
        </GlobalCssPriority>
      </body>
    </Html>
  )
}
