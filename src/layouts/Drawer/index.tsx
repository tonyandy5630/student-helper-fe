import React, { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  TextField,
  InputAdornment,
  OutlinedInput,
  Badge
} from "@mui/material"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import SearchIcon from "@mui/icons-material/Search"

export default function MyDrawer() {
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false)

  function handleToggleDrawer() {
    setToggleDrawer((prev) => !prev)
  }

  const list = () => (
    <Box role='presentation'>
      <List>
        <ListItem>
          <OutlinedInput
            placeholder='Find a subject'
            sx={{ height: "40px", paddingRight: 0 }}
            endAdornment={
              <IconButton
                className='m-0'
                onClick={() => {
                  console.log(true)
                }}
              >
                <SearchIcon />
              </IconButton>
            }
          />
        </ListItem>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div className='md:hidden'>
      <IconButton onClick={handleToggleDrawer}>
        <Badge
          badgeContent={0}
          showZero
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          color='primary'
        >
          <MenuIcon />
        </Badge>
      </IconButton>

      <SwipeableDrawer
        hysteresis={0.5}
        swipeAreaWidth={20}
        anchor='left'
        open={toggleDrawer}
        onOpen={handleToggleDrawer}
        onClose={handleToggleDrawer}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  )
}
