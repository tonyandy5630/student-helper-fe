import { useRouter } from "next/router"
import React from "react"

export default function ProfilePage() {
  const router = useRouter()
  const { userId } = router.query
  return <div>{userId}</div>
}
