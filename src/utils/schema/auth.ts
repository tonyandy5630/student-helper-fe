import * as yup from "yup"
import getRules from "../rules/auth"

const rules = getRules()

export const UserSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Wrong email format")
    .min(5, "Minimum length is from 5 - 160 characters")
    .max(160, "Minimum length is from 5 - 160 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Minimum length is from 5 - 160 characters")
    .max(20, "Minimum length is from 5 - 160 characters"),
  pwd: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum length is from 5 - 160 characters")
    .max(20, "Minimum length is from 5 - 160 characters"),
  rePwd: yup
    .string()
    .required("Confirm password is required")
    .min(5, "Minimum length is from 5 - 160 characters")
    .max(20, "Minimum length is from 5 - 160 characters")
    .oneOf([yup.ref("pwd")], "Confirm password not matched")
})

export type UserSchemaType = yup.InferType<typeof UserSchema>
