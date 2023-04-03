"use client"
import React, { useMemo } from "react"
import styles from "styles/homepage.module.css"
import { useCookies } from "react-cookie"
import { useQuery } from "@tanstack/react-query"
import { checkLoginAPI } from "apis/auth.api"
import { TWO_WEEKS } from "constants/utils"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import Image from "next/image"
import { Stack, Typography, Fade, duration } from "@mui/material"
import HomePageHeader from "layouts/homepageHeader"
import { motion, AnimatePresence } from "framer-motion"
export default function HomePage() {
  const [accessCookie, setAccessCookie] = useCookies([ACCESS_TOKEN_COOKIE])
  const [userCookie, setUserCookie] = useCookies([USER_COOKIE])
  const checkLoginQuery = useQuery(["check-login"], { queryFn: checkLoginAPI })
  const { data, error, status } = checkLoginQuery

  useMemo(() => {
    if (data) {
      const access_token = data.data.data?.access_token
      const user = data.data.data?.user
      const options = {
        maxAge: TWO_WEEKS,
        path: "/"
      }
      setAccessCookie(ACCESS_TOKEN_COOKIE, access_token, options)
      setUserCookie(USER_COOKIE, user, options)
    }
  }, [])

  return (
    <>
      <Stack
        justifyContent='space-between'
        alignItems='center'
        className={`relative w-screen min-h-screen ${styles["body"]}`}
      >
        <HomePageHeader />
        <Stack
          alignItems='center'
          justifyContent='center'
          className='h-3/4 min-h-[400px] w-fit md:min-h-full md:h-auto  '
        >
          <Stack
            alignItems='flex-start'
            justifyContent='space-evenly'
            className={`px-2 min-h-3/4 md:items-center md:max-w-full md:px-0 ${styles["resme"]}`}
          >
            <Typography
              component={motion.h1}
              textTransform='uppercase'
              variant='h1'
              fontWeight='600'
              initial={{ opacity: 0, letterSpacing: 1 }}
              transition={{ duration: 1.3 }}
              className={`text-7xl md:leading-[6rem] md:text-8xl`}
              gutterBottom
              animate={{ opacity: 1, letterSpacing: 5 }}
            >
              RESME project
            </Typography>

            <Typography variant='caption' fontSize={16} fontWeight='500'>
              Study is more fun when you have friends
            </Typography>
          </Stack>
        </Stack>
        <Image
          src='/banner-bottom.png'
          alt='banner image'
          width={1800}
          height={200}
          className='overflow-hidden md:max-w-screen-2xl'
        />
      </Stack>
    </>
  )
}
