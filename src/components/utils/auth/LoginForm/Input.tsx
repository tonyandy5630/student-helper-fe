import React, { useState, useEffect } from "react"
import { Control } from "react-hook-form"
import {
  InputLabel,
  FormHelperText,
  OutlinedInput,
  Stack,
  FormControl,
  IconButton,
  InputAdornment
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import type { UseFormRegister } from "react-hook-form"

type IFormInputProps = {
  label?: String
  placeholder?: string
  inputType?: InputType
  id: string
  helperText?: string
  helperTextIsError?: boolean
  name: string
  control: Control<any>
  autocomplete: string
  isRequired?: boolean
  rules?: object
  inputProps?: object
  register: UseFormRegister<any>
  registerOptions?: object
  className?: string
  sx?: object
}

export default function AuthFormInput({
  label,
  helperText,
  placeholder,
  inputType = "standard",
  id,
  name,
  autocomplete,
  helperTextIsError,
  isRequired = false,
  inputProps,
  register,
  registerOptions,
  className,
  sx
}: IFormInputProps) {
  const [showPwd, setShowPwd] = useState<Boolean>(false)
  const [isError, setIsError] = useState<boolean | undefined>(helperTextIsError)

  const handleClickShowPassword = () => setShowPwd((show) => !show)

  useEffect(() => {
    setIsError((prev) => helperTextIsError)
  }, [helperTextIsError])

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl component={Stack} className='my-2.5 w-full ' required={isRequired}>
      <InputLabel shrink className='w-full static text-white'>
        {label}
      </InputLabel>
      <OutlinedInput
        className={`bg-white p-2 h-9 rounded-3xl ${className}`}
        id={id}
        {...register(name, registerOptions)}
        autoComplete={autocomplete}
        error={isError}
        inputProps={inputProps}
        sx={{
          fontSize: 14,
          ...sx
        }}
        placeholder={placeholder}
        type={inputType === "password" && showPwd ? "" : inputType}
        endAdornment={
          inputType === "password" ? (
            <InputAdornment position='end' className='mr-3'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPwd ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : (
            ""
          )
        }
      />

      {helperText !== "" || helperText !== undefined ? (
        <FormHelperText error={helperTextIsError}>{helperText}</FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  )
}

export type InputType = "standard" | "password"
