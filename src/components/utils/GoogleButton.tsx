import React from "react"
import GoogleButton from "react-google-button"
export default function MyGoogleButton() {
  const handleGoogleSignUp = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self")
  }
  return <GoogleButton onClick={handleGoogleSignUp} className='my-3' />
}
