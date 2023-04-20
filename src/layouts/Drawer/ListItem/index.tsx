import React, { memo } from "react"
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

type Props = {
  text: string
  open: boolean
  icon: React.ReactNode
  href: string
}

function MyListItem({ text, icon, open, href }: Props) {
  return (
    <ListItem key={text} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        href={href}
        target='_blank'
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center"
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{ opacity: open ? 1 : 0, textTransform: "capitalize" }}
          primaryTypographyProps={{
            sx: {
              fontSize: 12
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default memo(MyListItem)
