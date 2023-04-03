import Image from "next/image"
import React from "react"
import { Stack } from "@mui/material"
import Link from "next/link"
export default function HomePageHeader() {
  return (
    <>
      <Image
        src='/banner-top.png'
        alt='banner image'
        width={1290}
        height={250}
        className='w-screen overflow-hidden h-fit md:max-w-full md:h-full md:relative'
      />
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-evenly'
        className='top-0 right-0 w-64 md:absolute md:py-3'
      >
        <Link href='/auth/signin' className='p-3 text-black no-underline transition-colors hover:bg-leaf-green'>
          Login
        </Link>
        <Link href='/auth/register' className='p-3 text-black no-underline transition-colors hover:bg-leaf-green'>
          Register
        </Link>
      </Stack>
    </>
  )
}
