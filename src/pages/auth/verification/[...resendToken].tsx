import React, { useState } from "react"
import dynamic from "next/dynamic"
import { Container, Stack, Typography } from "@mui/material"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { VerifyEmailType } from "types/auth.type"
import { isAxiosNotAcceptable } from "utils/utils"
import Link from "next/link"
import { HttpStatusCode } from "axios"

//* dynamic
const DynamicImage = dynamic(() => import("components/DynamicImage"))
const Recaptcha = dynamic(() => import("react-google-recaptcha"))
const LoadingCircle = dynamic(() => import("components/Loading"), { ssr: false })

//* APIs
import { verifyCaptchaAPI } from "apis/verifyCaptcha.api"
import { resendVerifyEmailAPI } from "apis/auth.api"
import { toast } from "react-toastify"

type ResendEmailType = Omit<VerifyEmailType, "token">

export default function ResendMailPage() {
  const router = useRouter()
  const { email } = router.query as ResendEmailType
  const [siteKey] = useState<string>(process.env.NEXT_PUBLIC_SITE_KEY || "")
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false)

  const verifyCaptchaMutation = useMutation({
    mutationFn: (captcha: string) => verifyCaptchaAPI(captcha)
  })

  const resendVerifyEmailQuery = useQuery({
    queryKey: [email],
    queryFn: () => resendVerifyEmailAPI({ email }),
    enabled: isCaptchaVerified
  })
  const { data: queryData, error, status } = resendVerifyEmailQuery

  function sendMessage(status: string) {
    if (status === "error") {
      if (isAxiosNotAcceptable(error)) {
        return (
          <>
            <Typography className='flex flex-col items-center justify-center md:text-2xl' textAlign='center'>
              We can not find user with email:
              <span className='ml-1 text-xl font-semibold md:text-2xl'>{email}</span>
            </Typography>
            <Typography variant='subtitle2' className='md:text-xl'>
              Please <Link href='/auth/register'>Register</Link>
            </Typography>
          </>
        )
      }
      return (
        <>
          <Typography className='flex flex-col items-center justify-center md:text-2xl' textAlign='center'>
            Something went wrong
          </Typography>
        </>
      )
    } else if (status === "success") {
      //*  sent mail already
      if (queryData?.status === HttpStatusCode.Accepted) {
        return (
          <>
            <Typography variant='h4' className='flex flex-row justify-center w-full text-base ' noWrap={false}>
              {`We sent an email to`} <span className='ml-1 font-semibold'>{email}</span>
            </Typography>
            <Typography color='red'>Please check your spam in email box</Typography>
          </>
        )
        //* account is verified
      } else if (queryData?.status === HttpStatusCode.Created) {
        return (
          <>
            <Typography variant='h4' className='flex flex-row sm:text-xl'>
              {`Your account is verified. Please `}{" "}
              <Link href='/auth/signin' className='ml-1 f'>
                Login
              </Link>
            </Typography>
          </>
        )
      }

      //* success
      return (
        <>
          <Typography variant='h4' className='flex flex-row sm:text-xl'>
            {`An email has sent to `} <span className='ml-1 font-semibold'>{email}</span>
          </Typography>
        </>
      )
    } else if (status === "loading" && isCaptchaVerified) {
      return (
        <>
          <LoadingCircle />
          <Typography>Working on it...</Typography>
        </>
      )
    }
  }

  function handleChange(value: any) {
    verifyCaptchaMutation.mutate(value, {
      onSuccess: (data) => {
        const isVerified = data.data.data?.captcha_verified || false
        setIsCaptchaVerified(isVerified)
      },
      onError: (err) => {
        toast.error("Something is wrong")
      }
    })
  }

  return (
    <Container className='flex items-center justify-center min-h-screen'>
      <Stack alignItems='center' justifyContent='center'>
        {status === "error" && (
          <DynamicImage
            src='/red-x.png'
            height={240}
            width={240}
            className='my-5'
            alt='Resend verify email error red-x mark'
          />
        )}
        {status === "success" && (
          <DynamicImage src='/send-mail.jpg' width={400} height={400} alt='Image of mail sending' priority={true} />
        )}
        {sendMessage(status)}
        {!isCaptchaVerified && (
          <Typography variant='h5' fontWeight={600} className='text-center'>
            Please verify before we send you a verify email
          </Typography>
        )}
        <Recaptcha sitekey={siteKey} onChange={handleChange} className={`${isCaptchaVerified ? "hidden" : "block"}`} />
      </Stack>
    </Container>
  )
}
