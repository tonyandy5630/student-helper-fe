import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import React, { memo } from "react"
import { Button, Stack, AppBar, Toolbar, Container, Typography } from "@mui/material"
import { Cookies } from "react-cookie"
import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
import { logoutAPI } from "apis/auth.api"
import MyDrawer from "layouts/Drawer"
import { User } from "types/user.type"

type IHeaderProps = {
  accessCookie: string
  userCookie: User
}
const LoggedInHeader = ({ accessCookie, userCookie }: IHeaderProps) => {
  //* use context to store logged in user
  const router = useRouter()
  const cookies = new Cookies()

  const logoutMutation = useMutation({ mutationFn: (body: { email: string }) => logoutAPI(body, accessCookie) })

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

  return (
    <header>
      <AppBar position='fixed' color='transparent' className='z-0'>
        <Container maxWidth='md'>
          <Toolbar component={Stack} direction='row' className='justify-between '>
            <MyDrawer />
            <Typography variant='h5' fontWeight={600}>
              RESME
            </Typography>
            <Button variant='text' onClick={handleLogOut} className='text-black'>
              Log out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}

export default memo(LoggedInHeader)
