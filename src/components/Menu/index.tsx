import React from "react"
import { Menu, MenuItem } from "@mui/material"

type MenuProps = {
  MenuItem: JSX.Element[]
  anchorEl: HTMLElement
}

export default function MyMenu({ MenuItem }: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Menu
      open={openMenu}
      anchorEl={anchorEl}
      onClick={handleClose}
      id='account-menu'
      onClose={handleClose}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      disableScrollLock={true}
    >
      {MenuItem}
    </Menu>
  )
}
