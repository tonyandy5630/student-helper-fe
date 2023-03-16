import * as React from "react"
import { StyledEngineProvider } from "@mui/material/styles"

type IGlobalProps = {
  children: React.ReactNode
}

export default function GlobalCssPriority({ children }: IGlobalProps) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
}
