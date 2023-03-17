import { EMAIL_PATTERN } from "constants/auth"
import type { UseFormGetValues } from "react-hook-form"
const getRules = (getValues?: UseFormGetValues<any>) => ({
  email: {
    pattern: {
      value: EMAIL_PATTERN,
      message: `Not a valid email format`
    },
    minLength: {
      value: process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH,
      message: `Minimum length is ${process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH} - ${process.env.NEXT_PUBLIC_EMAIL_MAX_LENGTH} characters`
    },
    maxLength: {
      value: process.env.NEXT_PUBLIC_EMAIL_MAX_LENGTH,
      message: `Minimum length is ${process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH} - ${process.env.NEXT_PUBLIC_AUTH_INPUT_MAX_LENGTH} characters`
    }
  },
  username: {
    maxLength: {
      value: process.env.NEXT_PUBLIC_AUTH_INPUT_MAX_LENGTH,
      message: `Minimum length is ${process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH} - ${process.env.NEXT_PUBLIC_AUTH_INPUT_MAX_LENGTH} characters`
    },
    minLength: {
      value: process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH,
      message: `Minimum length is ${process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH} - ${process.env.NEXT_PUBLIC_AUTH_INPUT_MAX_LENGTH} characters`
    }
  },
  pwd: {
    minLength: {
      value: process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH,
      message: `Minimum length is ${process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH} - ${process.env.NEXT_PUBLIC_AUTH_INPUT_MAX_LENGTH} characters`
    },
    maxLength: {
      value: process.env.NEXT_PUBLIC_AUTH_INPUT_MAX_LENGTH,
      message: `Minimum length is ${process.env.NEXT_PUBLIC_AUTH_INPUT_MIN_LENGTH} - ${process.env.NEXT_PUBLIC_AUTH_INPUT_MAX_LENGTH} characters`
    }
  },
  rePwd: {
    validate:
      typeof getValues === "function"
        ? (value: string) => value === getValues("pwd") || "Confirm password not matched"
        : undefined
  }
})

export default getRules
