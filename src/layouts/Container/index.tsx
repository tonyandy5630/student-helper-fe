import React from "react"
import { Container } from "@mui/material"

type Props = {
  children: JSX.Element | JSX.Element[]
  className?: string
}
export default function MyContainer({ children, className }: Props) {
  return <Container className={`min-w-[90%] flex ${className}`}>{children}</Container>
}
