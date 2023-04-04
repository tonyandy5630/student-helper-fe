import React, { useRef, useState } from "react"
import { Grid, Stack, Container, Typography, Divider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import dynamic from "next/dynamic"
const Logo = dynamic(() => import("components/Logo"))
import Image from "next/image"
import FormInput from "components/utils/auth/LoginForm/Input"
import { useForm } from "react-hook-form"
import { UserSchema, UserSchemaType } from "utils/schema/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { registerAccountAPI } from "apis/auth.api"
import { omit } from "lodash"
import { isAxiosUnprocessableEntityError } from "utils/utils"
import { ResponseAPI } from "types/utils.type"
const MyCustomModal = dynamic(() => import("components/utils/auth/LoginForm/Modal"), { ssr: false })
import Link from "next/link"
import Recaptcha from "react-google-recaptcha"
import { verifyCaptchaAPI } from "apis/verifyCaptcha.api"
import MyGoogleButton from "components/utils/GoogleButton"
import Head from "next/head"

type FormData = UserSchemaType

export default function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    register,
    reset
  } = useForm<FormData>({
    resolver: yupResolver(UserSchema)
  })

  const [visibleCheckMail, setVisibleCheckMail] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false)
  const captchaRef = useRef<Recaptcha>(null)
  const [siteKey] = useState<string>(process.env.NEXT_PUBLIC_SITE_KEY || "")

  function handleHideModal() {
    setVisibleCheckMail(false)
  }

  //* form validate with no error and captcha is verified
  const isNotValidateForm = errors && !isCaptchaVerified

  function handleCaptchaChange(value: any) {
    verifyCaptchaMutation.mutate(value, {
      onSuccess: (data) => {
        const isVerified = data.data.data?.captcha_verified || false
        setIsCaptchaVerified(isVerified)
      },
      onError: (err) => {
        console.log(err)
      }
    })
  }

  const verifyCaptchaMutation = useMutation({
    mutationFn: (captcha: string) => verifyCaptchaAPI(captcha)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, "rePwd">) => registerAccountAPI(body)
  })
  const { isLoading: isRegistering } = registerAccountMutation

  const handleSubmitRegister = handleSubmit((data) => {
    const body = omit(data, ["rePwd"])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        const email = data.data.data?.email

        if (email) {
          setEmail(email)
        }
        setVisibleCheckMail(true)
        reset((formValues) => {
          captchaRef.current?.reset()
          return { ...formValues, email: "", pwd: "", rePwd: "", username: "" }
        })
      },
      onError: (err) => {
        if (isAxiosUnprocessableEntityError<ResponseAPI<Omit<FormData, "rePwd">>>(err)) {
          const formError = err.response?.data.data

          if (formError?.email) {
            setError("email", {
              message: formError.email,
              type: "Server"
            })
          }

          if (formError?.username) {
            setError("username", {
              message: formError.username,
              type: "Server"
            })
          }

          if (formError?.pwd) {
            setError("pwd", {
              message: formError.pwd,
              type: "Server"
            })
          }
        }
      }
    })
  })

  return (
    <>
      <Head>
        <title>RESME Sign up</title>
        <meta name='description' content="RESME's sign up. Where your deadlines stop suffer" />
      </Head>
      <MyCustomModal visible={visibleCheckMail} setVisible={handleHideModal} email={email} />
      <Stack
        component={Container}
        alignItems='center'
        justifyContent='center'
        className='h-screen max-w-full bg-gradient-to-br from-fade-gray to-light-gray '
      >
        <Grid
          container
          direction='row'
          spacing={0}
          alignItems='center'
          justifyContent='space-around'
          className='w-full pl-0 h-fit mobile-gray lg:w-8/12 lg:bg-dirt rounded-xl'
        >
          <Grid item md={6} sm={6} className='flex w-full h-5/6 md:w-2/3' alignItems='center'>
            <Stack alignItems='center' justifyContent='space-around' className='w-full h-full'>
              <form className=' w-[70%] flex flex-col ' onSubmit={handleSubmitRegister}>
                <Logo />
                <Typography
                  variant='h5'
                  gutterBottom
                  className='w-full text-bright-teal'
                  textTransform='uppercase'
                  fontWeight='bold'
                  noWrap={false}
                  textAlign='center'
                >
                  Create account
                </Typography>
                <FormInput
                  control={control}
                  name='email'
                  id='email'
                  autocomplete='on'
                  label='Your email address'
                  placeholder='Example: abc@def.com'
                  isRequired={true}
                  register={register}
                  helperText={errors.email?.message}
                  helperTextIsError={errors.email !== undefined}
                />
                <FormInput
                  control={control}
                  name='username'
                  id='username'
                  autocomplete='on'
                  label='Username'
                  placeholder='David504'
                  isRequired={true}
                  register={register}
                  helperText={errors.username?.message}
                  helperTextIsError={errors.username !== undefined}
                />
                <FormInput
                  control={control}
                  inputType='password'
                  name='pwd'
                  id='pwd'
                  autocomplete='on'
                  label='Password'
                  isRequired={true}
                  register={register}
                  helperText={errors.pwd?.message}
                  helperTextIsError={errors.pwd !== undefined}
                />
                <FormInput
                  control={control}
                  inputType='password'
                  name='rePwd'
                  id='rePwd'
                  autocomplete='on'
                  label='Confirm Password'
                  isRequired={true}
                  register={register}
                  helperText={errors.rePwd?.message}
                  helperTextIsError={errors.rePwd !== undefined}
                />
                <Recaptcha sitekey={siteKey} onChange={handleCaptchaChange} ref={captchaRef} />
                <LoadingButton
                  variant='outlined'
                  loading={isRegistering}
                  type='submit'
                  className={`rounded-3xl text-black h-8 my-2.5 ${
                    isNotValidateForm ? "bg-zinc-400 text-gray-500 border-transparent" : "bg-leaf-green  border-white"
                  } ${isRegistering ? "h-8" : ""}`}
                  loadingIndicator='Working on it...'
                  disabled={isNotValidateForm}
                >
                  {isRegistering ? <></> : "Continue"}
                </LoadingButton>
              </form>
              <Typography variant='caption' className='text-slate-300'>
                Already has an account ?
                <Link href='/auth/signin' className='text-leaf-green'>
                  Sign in
                </Link>
              </Typography>
              <Divider
                className='justify-center text-stone-300'
                light
                role='presentation'
                flexItem
                variant='middle'
                sx={{
                  "&.MuiDivider-root:after, &.MuiDivider-root:before": {
                    borderTop: "thin solid rgba(255 255 255)",
                    top: "13%",
                    width: "27%"
                  }
                }}
              >
                or
              </Divider>
              <MyGoogleButton />
            </Stack>
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            alignItems='center'
            justifyContent='flex-end'
            className='hidden w-full h-full lg:flex'
          >
            <Image src='/login-2.jpg' width='450' height='710' className='h-full rounded-r-xl' alt='Picture of trees' />
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}
