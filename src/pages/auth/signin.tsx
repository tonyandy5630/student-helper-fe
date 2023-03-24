import { Stack, Container, Typography, Divider } from "@mui/material"
import { useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"
import AuthFormInput from "components/utils/auth/LoginForm/Input"
import { LoadingButton } from "@mui/lab"
const LogoComponent = dynamic(() => import("components/Logo"))
import MyGoogleButton from "components/utils/GoogleButton"
import Footer from "layouts/Footer"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserSchema, UserSchemaType } from "utils/schema/auth"
import * as yup from "yup"
import { useMutation } from "@tanstack/react-query"
import { LoginAPI } from "apis/auth.api"
import { isAxiosUnprocessableEntityError } from "utils/utils"
import { ResponseAPI } from "types/utils.type"
import { useRouter } from "next/router"

type FormData = Omit<UserSchemaType, "email" | "rePwd">
const LoginSchema = UserSchema.omit(["email", "rePwd"])
export default function SigninPage() {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    register,
    reset
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema)
  })

  const handleLogin = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        router.push("/success")
      },
      onError: (err) => {
        if (isAxiosUnprocessableEntityError<ResponseAPI<Omit<FormData, "rePwd" | "email">>>(err)) {
          const formError = err.response?.data.data

          if (formError?.username) {
            reset((formValues) => {
              return { ...formValues, pwd: "" }
            })
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

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, "rePwd" | "email">) => LoginAPI(body)
  })

  return (
    <>
      <Stack component={Container} className='h-screen md:w-7/12 lg:w-fit' alignItems='center' justifyContent='center'>
        <form className='flex flex-col items-center justify-around w-9/12 h-5/6 lg:w-10/12' onSubmit={handleLogin}>
          <LogoComponent />
          <Stack alignItems='center' justifyContent='center' className='w-fit lg:w-80 mb-44'>
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
              className='m-0 border-black rounded-sm'
              helperText={errors.username?.message}
              helperTextIsError={errors.username !== undefined}
            />
            <AuthFormInput
              control={control}
              name='pwd'
              id='pwd'
              autocomplete='on'
              inputType='password'
              label='Password'
              isRequired={true}
              register={register}
              placeholder='Enter password'
              className='m-0 border-red-300 rounded-sm'
              helperText={errors.pwd?.message}
              helperTextIsError={errors.pwd !== undefined}
            />
            <LoadingButton
              variant='outlined'
              className='rounded-3xl text-black h-8 my-2.5 w-8/12 bg-leaf-green'
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
              className='justify-center text-gray-700'
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
      <Footer />
    </>
  )
}
