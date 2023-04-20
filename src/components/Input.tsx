import React from "react"
import { OutlinedInput, InputAdornment } from "@mui/material"

type IFormInputProps = {
  label?: String
  placeholder?: string
  id: string
  name: string
  autoComplete: string
  inputProps?: object
  className?: string
  sx?: object
  endAdornment?: React.ReactNode
}

export default function MyCustomInput({ className, endAdornment, ...props }: IFormInputProps) {
  return (
    <OutlinedInput
      {...props}
      className={`${className} h-9 w-5/12 mx-3`}
      endAdornment={
        <InputAdornment position='end' className='mr-3'>
          {endAdornment}
        </InputAdornment>
      }
    />
  )
}
