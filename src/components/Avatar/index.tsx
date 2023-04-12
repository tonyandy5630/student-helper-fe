import React from "react"
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { Cookies } from "react-cookie"
import { useMutation } from "@tanstack/react-query"
import { User } from "types/user.type"
import { logoutAPI } from "apis/auth.api"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"

interface IAvatarProps {
  username: string
  src: string
  className?: string
  accessCookie: string
  userCookie: User
}

type MenuItemsType = {
  title: string
  path: string
}[]

export default function MyAvatar({ username, src, className, accessCookie, userCookie }: IAvatarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const router = useRouter()
  const cookies = new Cookies()

  const logoutMutation = useMutation({ mutationFn: (body: { email: string }) => logoutAPI(body, accessCookie) })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const MENU_ITEMS: MenuItemsType = [
    {
      title: "My Profile",
      path: `/profile/${userCookie.username}`
    },
    {
      title: "My Class(s)",
      path: "/my-class"
    }
  ]

  function handleLogOut() {
    if (accessCookie && userCookie) {
      const body = { email: userCookie.email }
      logoutMutation.mutate(body, {
        onSuccess: (data) => {
          cookies.remove(ACCESS_TOKEN_COOKIE)
          cookies.remove(USER_COOKIE)
          router.push("/auth/signin")
        },
        onError: (err) => console.log(err)
      })
    }
  }

  const items = MENU_ITEMS.map((item) => (
    <MenuItem LinkComponent={Link} href={item.path} key={item.path}>
      {item.title}
    </MenuItem>
  ))

  return (
    <>
      <Tooltip title='User Account'>
        <IconButton
          onClick={handleClick}
          aria-controls={openMenu ? "account-menu" : undefined}
          aria-haspopup='true'
          aria-expanded={openMenu ? "true" : undefined}
        >
          <Avatar className={`${className}`} src={src} alt={`${username.toUpperCase()}'s avatar`} />
        </IconButton>
      </Tooltip>

      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        onClick={handleClose}
        id='account-menu'
        onClose={handleClose}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        disableScrollLock={true}
      >
        {items}
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
      </Menu>
    </>
  )
}
