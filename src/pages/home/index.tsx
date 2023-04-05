import { Button } from "@mui/material"
import isAuthHook from "hooks/isAuth"

import React from "react"
export default function SignedInHomePage() {
  function handleLogout() {
    return
  }

  return (
    <>
      <div>HomePage</div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}
