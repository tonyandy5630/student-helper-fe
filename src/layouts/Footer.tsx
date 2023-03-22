import { Stack, Typography } from "@mui/material"
import React from "react"

export default function Footer() {
  return (
    <Stack
      className='h-20 w-full bg-black absolute bottom-0 text-white'
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='subtitle1'>RESME &#174;</Typography>
      <Typography variant='subtitle2'>MADE BY BUI THANH TU</Typography>
    </Stack>
  )
}
