import React, { useState } from "react"
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined"
export default function Notification() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title='Notification' arrow>
        <IconButton aria-label='Notification' onClick={handleClick}>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        onClick={handleClose}
        id='notification-button'
        onClose={handleClose}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        PaperProps={{
          sx: {
            marginTop: 1.5
          }
        }}
        disableScrollLock={true}
      >
        <MenuItem>Design this</MenuItem>
      </Menu>
    </>
  )
}
