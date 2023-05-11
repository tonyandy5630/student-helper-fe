import React, { useEffect, useMemo, useRef, useState } from "react"
import styles from "styles/homepage.module.css"
import { useCookies } from "react-cookie"
import { useQuery } from "@tanstack/react-query"
import { checkLoginAPI } from "apis/auth.api"
import { TWO_WEEKS } from "constants/utils"
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "constants/auth"
import Image from "next/image"
import { Stack, Typography } from "@mui/material"
import HomePageHeader from "layouts/homepageHeader"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { UNIVERSITIES } from "constants/utils"
import Head from "next/head"
import useGetCookieTokens from "hooks/getCookieTokens"
import { useRouter } from "next/router"

export default function NotSignedInHomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 1], ["0.8", "0"], { clamp: false })
  const topRef = useRef(null)
  const isTopInView = useInView(topRef)
  const y = useTransform(scrollYProgress, [0, 1], ["0", "100px"])
  const [accessCookie, setAccessCookie] = useCookies([ACCESS_TOKEN_COOKIE])
  const [userCookie, setUserCookie] = useCookies([USER_COOKIE])
  const { accessToken, userToken } = useGetCookieTokens()
  const router = useRouter()
  const isLoggedIn = accessToken !== ""

  useMemo(() => {
    const options = {
      maxAge: TWO_WEEKS,
      path: "/"
    }
    if (accessToken && userToken) {
      setAccessCookie(ACCESS_TOKEN_COOKIE, accessToken, options)
      setUserCookie(USER_COOKIE, userToken, options)
      router.push("/dashboard")
    }
  }, [accessToken, userToken])

  return (
    <>
      <Head>
        <title>RESME's HomePage</title>
        <meta name='description' content="RESME's HomePage. Your study career is just begun" />
      </Head>
      <div className='scroll-smooth'>
        <HomePageHeader isLoggedIn={isLoggedIn} />
        <Stack
          justifyContent='space-between'
          alignItems='center'
          className={`relative w-screen min-h-screen ${styles["body"]}`}
        >
          <motion.div style={{ translateY: opacity, opacity }}>
            <Image
              src='/banner-top.png'
              alt='banner image'
              width={1290}
              height={250}
              className='w-screen overflow-hidden h-fit md:max-w-full md:h-full'
            />
          </motion.div>
          <Stack
            alignItems='center'
            justifyContent='center'
            className='sticky overflow-visible w-fit md:min-h-full md:h-auto'
          >
            <Stack
              alignItems='flex-start'
              justifyContent='space-evenly'
              className={`px-2 min-h-3/4 items-center md:max-w-full md:px-0 z-10`}
            >
              <Typography
                component={motion.h1}
                textTransform='uppercase'
                variant='h1'
                fontWeight='600'
                initial={{ opacity: 0, letterSpacing: "1px" }}
                transition={{ duration: 1.5 }}
                className={`text-7xl md:leading-[6rem] md:text-8xl text-center break-words ${styles["resme"]}`}
                gutterBottom
                animate={{ opacity: 1, letterSpacing: "4px" }}
              >
                RESME project
              </Typography>
              <Typography
                component={motion.span}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 0.9, y: 1 }}
                transition={{ duration: 1.5 }}
                variant='caption'
                fontSize={16}
                fontWeight='500'
                textAlign='center'
                className={`${styles["resme"]}`}
              >
                Study is more fun when you have friends
              </Typography>
            </Stack>
          </Stack>
          <motion.div style={{ opacity, translateY: y }}>
            <Image
              src='/banner-bottom.png'
              alt='banner image'
              width={1800}
              height={200}
              priority
              className='z-10 overflow-hidden md:max-w-screen-2xl'
            />
          </motion.div>
        </Stack>
        <section>
          <Stack
            component={motion.div}
            alignItems='center'
            style={{
              opacity: isTopInView ? 1 : 0,
              transition: "all 1.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              transform: isTopInView ? "none" : "translateY(-100px)"
            }}
            justifyContent='center'
            ref={topRef}
          >
            <Typography
              variant='h1'
              gutterBottom
              className='text-5xl md:leading-[6rem] md:text-8xl text-center break-words'
            >
              Now available in
            </Typography>
            <Stack component={motion.div} direction='row' alignItems='center'>
              {UNIVERSITIES.map((uni) => (
                <Image src={uni.src} key={uni.src} width={180} height={80} alt={uni.alt} />
              ))}
            </Stack>
          </Stack>
        </section>
      </div>
    </>
  )
}
