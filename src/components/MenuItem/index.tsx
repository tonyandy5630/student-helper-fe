import React from "react"
import { MenuItem } from "@mui/material"
type Props = {
  children: React.ReactNode
}

export default function MyMenuItem({ children }: Props) {
  return <MenuItem sx={{ textTransform: "capitalize" }}>{children}</MenuItem>
}
