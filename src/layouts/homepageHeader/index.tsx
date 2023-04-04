import Image from "next/image"
import React from "react"
import { Stack } from "@mui/material"
import Link from "next/link"
import { useScroll, useTransform, motion } from "framer-motion"
export default function HomePageHeader() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "320px"])
  const color = useTransform(scrollYProgress, [0, 1], ["200", "400"])
  return (
    <>
      <Stack
        component={motion.div}
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        className={`fixed right-0 z-10 w-screen`}
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
