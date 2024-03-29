import React, { memo } from "react"
import { Stack, AppBar, Toolbar, Typography } from "@mui/material"
import { User } from "types/user.type"
import MyAvatar from "components/Avatar"
import HideOnScroll from "components/HideOnScroll"
import type { IHeaderProps } from "types/headers.type"

const LoggedInHeader = ({ accessCookie, userCookie }: IHeaderProps) => {
  return (
    <HideOnScroll>
      <AppBar className=' min-h-[56px] bg-transparent'>
        <Toolbar className='relative px-5 bg-white'>
          <Stack className='justify-center w-full ' direction='row'>
            <Typography variant='h5' fontWeight={600} className='text-black'>
              RESME
            </Typography>
          </Stack>
          <MyAvatar
            userCookie={userCookie}
            accessCookie={accessCookie}
            src='/broken.img'
            username={userCookie.username}
            className='absolute left'
          />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default memo(LoggedInHeader)
