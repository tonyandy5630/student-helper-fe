import React from "react"
import { Button, Grid, Stack, Container, Typography, Divider } from "@mui/material"
import logo from "assets/images/logo.png"
import FormInput from "components/utils/auth/LoginForm/Input"
import GoogleButton from "react-google-button"
import { useForm } from "react-hook-form"
import getRules from "../../utils/rules/auth"
import loginPhoto from "../../assets/images/login-2.jpg"
import { UserSchema, UserSchemaType } from "utils/schema/auth"
import { yupResolver } from "@hookform/resolvers/yup"

type FormData = UserSchemaType

export default function SignUp() {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    register
  } = useForm<FormData>({
    resolver: yupResolver(UserSchema)
  })

  const rules = getRules(getValues)

  const handleGoogleSignUp = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self")
  }

  const handleSubmitRegister = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Stack
      component={Container}
      alignItems='center'
      justifyContent='center'
      className='h-screen max-w-full bg-gradient-to-br  from-fade-gray to-light-gray '
    >
      <Grid
        container
        direction='row'
        spacing={0}
        alignItems='center'
        justifyContent='space-around'
        className='h-[90%] mobile-gray pl-0 w-full lg:w-8/12 lg:bg-black rounded-xl'
      >
        <Grid item md={6} sm={6} direction='row' className='h-5/6 w-full flex md:w-2/3' alignItems='center'>
          <Stack alignItems='center' justifyContent='space-around' className='h-full w-full'>
            <form className=' w-[70%] flex flex-col' onSubmit={handleSubmitRegister}>
              <div className='mx-auto h-40 '>
                <img src={logo.src} className='h-48' />
              </div>
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
              <Divider
                className='text-stone-300'
                light={true}
                sx={{
                  "&.MuiDivider-root:after, &.MuiDivider-root:before": {
                    top: "13%",
                    borderTop: "thin solid rgb(255 255 255);"
                  }
                }}
              >
                or
              </Divider>
              <Button
                variant='outlined'
                type='submit'
                className='rounded-3xl bg-leaf-green text-black border-white h-13 my-2.5 '
              >
                Continue
              </Button>
            </form>
            <GoogleButton onClick={handleGoogleSignUp} className='my-3' />
          </Stack>
        </Grid>
        <Grid item lg={6} sm={6} alignItems='center' justifyContent='flex-end' className='hidden lg:flex w-full h-full'>
          <img src={loginPhoto.src} width='450' height='710' className='h-full rounded-r-xl' />
        </Grid>
      </Grid>
    </Stack>
  )
}
