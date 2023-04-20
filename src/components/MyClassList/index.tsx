import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import ClassListIcon from "@mui/icons-material/ImportContactsOutlined"
import Link from "next/link"

export default function MyClassList() {
  return (
    <Tooltip title='My class list' arrow>
      <IconButton href='/class-list' LinkComponent={Link}>
        <ClassListIcon />
      </IconButton>
    </Tooltip>
  )
}
