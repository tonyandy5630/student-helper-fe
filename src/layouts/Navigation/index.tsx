import React, { memo, useState } from "react"
import { AppBar, Toolbar, Tabs, Stack, Badge } from "@mui/material"
import NavLink, { NavLinkType } from "./NavLink"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SearchIcon from "@mui/icons-material/Search"
import HomeIcon from "@mui/icons-material/Home"
import { useRouter } from "next/router"

type NavProps = {
  notificationQuantity: number
}

const LINKS: NavLinkType[] = [
  { label: <HomeIcon fontSize='large' />, href: "/dashboard" },
  { label: <SearchIcon fontSize='large' />, href: "/search" },
  { href: "/notification" }
]

function MyNav({ notificationQuantity = 0 }: NavProps) {
  const router = useRouter()
  const { pathname } = router
  const [value, setValue] = useState(LINKS.findIndex((item) => item.href === pathname))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const navLinks = LINKS.map(({ label, href }) => {
    if (href !== "/notification")
      return <NavLink key={href} href={href} label={label} className={`${href === pathname ? "text-blue-400" : ""}`} />
  })

  return (
    <AppBar position='fixed' color='primary' sx={{ top: "auto", bottom: 0 }}>
      <Toolbar component={Stack} direction='row' justifyContent='space-around' className='min-w-full bg-black'>
        <Tabs value={value} onChange={handleChange} aria-label='Bottom nav bar'>
          {navLinks}
          <NavLink
            href='/notification'
            label={
              <Badge badgeContent={notificationQuantity} invisible={false} color='primary'>
                <NotificationsIcon fontSize='large' />
              </Badge>
            }
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}

export default memo(MyNav)
