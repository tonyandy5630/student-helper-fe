import React from "react"
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { Cookies } from "react-cookie"
import { useMutation } from "@tanstack/react-query"
import { User } from "types/user.type"
import { logoutAPI } from "apis/auth.api"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"

const MIN_W_XS = 40
const MIN_W_LG = 36
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
      title: "My Class(es)",
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
    <MenuItem sx={{ textTransform: "capitalize" }} LinkComponent={Link} href={item.path} key={item.path}>
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
          className={`min-w-[${MIN_W_XS}px] min-h-[${MIN_W_XS}px] lg:min-w-[${MIN_W_LG}px] lg:min-h-[${MIN_W_LG}px]`}
        >
          <Avatar src={src} alt={`${username.toUpperCase()}'s avatar`} />
        </IconButton>
      </Tooltip>

      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        onClick={handleClose}
        PaperProps={{
          sx: {
            marginTop: 1.5
          }
        }}
        id='account-menu'
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock={true}
      >
        {userCookie.hasSupportProfile ? (
          <></>
        ) : (
          <MenuItem sx={{ textTransform: "capitalize" }}>Create support profile</MenuItem>
        )}

        {items}
        <MenuItem sx={{ textTransform: "capitalize" }} onClick={handleLogOut}>
          Log out
        </MenuItem>
      </Menu>
    </>
  )
}
