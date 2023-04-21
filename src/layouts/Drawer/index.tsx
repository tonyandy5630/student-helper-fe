import * as React from "react"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import StoreIcon from "@mui/icons-material/Store"
import { Stack } from "@mui/material"
import PreviewIcon from "@mui/icons-material/Preview"
import SchoolIcon from "@mui/icons-material/School"
import FacebookIcon from "@mui/icons-material/Facebook"
import QuizIcon from "@mui/icons-material/Quiz"
import MyListItem from "./ListItem"

const drawerWidth = 175

const DRAWER_MAIN_ITEMS = [
  { text: "Marketplace", icon: <StoreIcon fontSize='small' />, href: "/marketplace" },
  { text: "Manage Classes", icon: <SchoolIcon fontSize='small' />, href: "/my-classes" },
  { text: "Reviews", icon: <PreviewIcon fontSize='small' />, href: "/reviews" }
]

const DRAWER_UTIL_ITEMS = [
  { text: "FB Group", icon: <FacebookIcon />, href: "https://www.facebook.com/groups/courseraandudemyvietnam" },
  { text: "Quizzes", icon: <QuizIcon />, href: "https://kungfutech.edu.vn/fpt" }
]

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}))

type DrawerProps = {
  open: boolean
  onToggleDrawer: React.MouseEventHandler<HTMLElement>
}

function MiniDrawer({ open, onToggleDrawer }: DrawerProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant='permanent' open={open} className='z-10' onClick={onToggleDrawer}>
        <Toolbar />
        <Divider />
        <List>
          {DRAWER_MAIN_ITEMS.map(({ text, icon, href }) => (
            <MyListItem key={text} text={text} icon={icon} href={href} open={open} />
          ))}
        </List>
        <Divider />
        <List>
          {DRAWER_UTIL_ITEMS.map(({ text, icon, href }) => (
            <MyListItem key={text} text={text} icon={icon} href={href} open={open} />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default React.memo(MiniDrawer)
