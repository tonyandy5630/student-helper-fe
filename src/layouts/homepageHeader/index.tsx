import Image from "next/image"
import React from "react"
import { Stack } from "@mui/material"
import Link from "next/link"

type HomePageHeaderProps = {
  isLoggedIn: boolean
}
export default function HomePageHeader({ isLoggedIn }: HomePageHeaderProps) {
  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='flex-end' className={`fixed right-0 z-10 w-screen`}>
        {isLoggedIn ? (
          <Link href='/dashboard' className='p-3 text-black no-underline transition-colors hover:bg-leaf-green'>
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link href='/auth/signin' className='p-3 text-black no-underline transition-colors hover:bg-leaf-green'>
              Login
            </Link>
            <Link href='/auth/register' className='p-3 text-black no-underline transition-colors hover:bg-leaf-green'>
              Register
            </Link>
          </>
        )}
      </Stack>
    </>
  )
}
