import React from "react"
import { verifyEmailAPI } from "apis/auth.api"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { VerifyEmailType } from "types/auth.type"
import { Container, Stack, Typography } from "@mui/material"
import Link from "next/link"
import verifiedTick from "assets/images/green-tick.png"
import { isAxiosNotAcceptable, isAxiosUnauthorized } from "utils/utils"
import LoadingCircle from "components/Loading"
import ErrorMark from "assets/images/red-x.png"
export default function verificationPage() {
  const router = useRouter()
  const { email, token } = router.query as VerifyEmailType

  const verifyEmailQuery = useQuery({
    queryKey: [email, token],
    queryFn: async () => {
      const data = await verifyEmailAPI(email, token)
      return data
    }
  })
  const { data, status, error } = verifyEmailQuery

  const message = (status: string) => {
    if (status === "loading") {
      return (
        <>
          <LoadingCircle />
          <Typography variant='h4' textTransform='capitalize' fontWeight='600'>
            Working on it...
          </Typography>
        </>
      )
    } else if (status === "error") {
      if (isAxiosNotAcceptable(error)) {
        return (
          <>
            <Typography>
              Cannot find an account with this email. Please <Link href='auth/register'>Sign up</Link>
            </Typography>
          </>
        )
      }

      if (isAxiosUnauthorized(error)) {
        return (
          <>
            <Typography>
              Your token is expired. <Link href='auth/verification/resendToken'>Click here</Link> to resend verify email
            </Typography>
          </>
        )
      }
    } else {
      const successCode = data?.status
      if (successCode === 208) {
        return (
          <Typography>
            Your email is already verified. Please <Link href='auth/signin'>Login</Link>
          </Typography>
        )
      } else {
        return (
          <>
            <Typography variant='h6'>{data?.data.message}</Typography>
          </>
        )
      }
    }
  }

  return (
    <Container maxWidth='md' className='flex flex-col items-center justify-center min-h-screen'>
      <Stack alignItems='center' justifyContent='center' className='py-10'>
        {status === "error" && (
          <>
            <img src={ErrorMark.src} width='200px' height='200px' className='mb-4' />
            <Typography variant='h4' textTransform='capitalize' fontWeight='600'>
              Cannot verified
            </Typography>
          </>
        )}
        {status === "success" && (
          <>
            <img src={verifiedTick.src} width='200px' height='200px' className='mb-4' />
            <Typography variant='h4' textTransform='capitalize' fontWeight='600'>
              Your Email is verified
            </Typography>
          </>
        )}
        {message(status)}
      </Stack>
    </Container>
  )
}
