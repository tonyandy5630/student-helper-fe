import { LoadingButton } from "@mui/lab"
import React from "react"

type ButtonProps = {
  variant?: ButtonVariant
  loading?: boolean
  className?: string
  disabled?: boolean
  children?: React.ReactNode
  loadingIndicator?: React.ReactNode
  type?: ButtonType
}

export default function MyCustomButton({
  variant = "outlined",
  loading,
  className,
  disabled,
  children,
  loadingIndicator,
  type = "button"
}: ButtonProps) {
  return (
    <LoadingButton
      variant={variant}
      loading={loading}
      type={type}
      className={className}
      loadingIndicator={loadingIndicator}
      disabled={disabled}
    >
      {children}
    </LoadingButton>
  )
}

type ButtonVariant = "outlined" | "text" | "contained"
type ButtonType = "submit" | "button"
