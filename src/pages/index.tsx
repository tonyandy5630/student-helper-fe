import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import Link from "next/link"
export default function HomePage() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    setUser({
      username: "tu",
      fullname: "thanh tu",
      email: "saf"
    })
  }, [])

  return (
    <>
      <Link href={"/auth/register"}>Sign up</Link>
    </>
  )
}
