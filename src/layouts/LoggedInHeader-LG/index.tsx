import React, { useState } from "react"
import { Stack, AppBar, Toolbar, Typography, Container, Box, IconButton } from "@mui/material"
import type { IHeaderProps } from "types/headers.type"
import MyAvatar from "components/Avatar"
import MyContainer from "layouts/Container"
import SearchInput from "components/Input"
import SearchIcon from "@mui/icons-material/Search"
import NotificationButton from "components/Notification"
import MyClassList from "components/MyClassList"
import MiniDrawer from "layouts/Drawer"
import MenuIcon from "@mui/icons-material/Menu"
export default function LoggedInHeaderLarge({ accessCookie, userCookie }: IHeaderProps) {
  const [toggleOpenDrawer, setToggleOpenDrawer] = useState(false)

  const handleToggleDrawer = () => {
    setToggleOpenDrawer((prev) => !prev)
  }

  return (
    <>
      <AppBar
        className=' min-h-[56px] bg-white flex flex-row'
        sx={{ boxShadow: "none", borderBottom: "1px solid #f0f0f0" }}
      >
        <Stack justifyContent='center' alignContent='center' className='min-w-[30px] h-auto ml-[0.75rem]'>
          <IconButton onClick={handleToggleDrawer} className='h-[40px] w-'>
            <MenuIcon />
          </IconButton>
        </Stack>
        <MyContainer>
          <Toolbar className='relative min-w-full'>
            <Stack className='justify-center w-full ' direction='row'>
              <Typography variant='h5' fontWeight={600} className='text-black'>
                RESME
              </Typography>
            </Stack>
            <SearchInput
              id='search bar'
              autoComplete='on'
              className='min-w-[60rem]'
              name='search bar'
              placeholder='Search a subject'
              endAdornment={<SearchIcon />}
            />
            <Stack direction='row' justifyContent='center' alignItems='center' className='mx-5 w-fit '>
              <NotificationButton />
              <MyClassList />
            </Stack>
            <MyAvatar
              userCookie={userCookie}
              accessCookie={accessCookie}
              src='/broken.img'
              username={userCookie.username}
              className='absolute left'
            />
          </Toolbar>
        </MyContainer>
      </AppBar>
      <MiniDrawer open={toggleOpenDrawer} />
    </>
  )
}
