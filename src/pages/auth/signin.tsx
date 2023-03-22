import { Stack, Container, Typography, Divider } from "@mui/material"
import { useForm } from "react-hook-form"
import Link from "next/link"
import React from "react"
import AuthFormInput from "components/utils/auth/LoginForm/Input"
import { LoadingButton } from "@mui/lab"
import LogoComponent from "components/logo"
import MyGoogleButton from "components/utils/GoogleButton"

export default function SigninPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    register,
    reset
  } = useForm<FormData>()

  return (
    <Stack component={Container} className='h-screen md:w-9/12' alignItems='center' justifyContent='center'>
      <form className='w-9/12 h-5/6  flex items-center justify-around flex-col'>
        <LogoComponent />
        <Stack alignItems='center' justifyContent='center' className='w-full mb-44'>
          <Typography
            variant='h5'
            gutterBottom
            className='w-full'
            textTransform='uppercase'
            fontWeight='bold'
            noWrap={false}
            textAlign='center'
          >
            Sign in
          </Typography>
          <AuthFormInput
            control={control}
            name='username'
            id='username'
            autocomplete='on'
            label='Username'
            isRequired={true}
            register={register}
            placeholder='Enter username'
            className='rounded-sm border-black'
            sx={{ borderColor: "black" }}
          />
          <AuthFormInput
            control={control}
            name='pwd'
            id='pwd'
            autocomplete='on'
            label='Password'
            isRequired={true}
            register={register}
            placeholder='Enter password'
            className='rounded-sm border-red-300'
          />
          <LoadingButton
            variant='outlined'
            className='rounded-3xl text-black h-8 my-2.5 w-8/12'
            type='submit'
            loadingIndicator='Working on it...'
          >
            Login
          </LoadingButton>
          <Typography variant='caption' className='text-black-300'>
            Do not have an account?
            <Link href='/auth/register' className='pl-1 '>
              Sign up
            </Link>
          </Typography>
          <Divider
            className='text-gray-700 justify-center'
            role='presentation'
            flexItem
            variant='middle'
            sx={{
              "&.MuiDivider-root:after, &.MuiDivider-root:before": {
                borderTop: "thin solid gray",
                top: "13%",
                width: "27%"
              }
            }}
          >
            or
          </Divider>
          <MyGoogleButton />
        </Stack>
      </form>
    </Stack>
  )
}
