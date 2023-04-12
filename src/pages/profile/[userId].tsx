import { useRouter } from "next/router"
import React from "react"
import Layout from "layouts"
export default function ProfilePage() {
  const router = useRouter()
  const { userId } = router.query
  return <Layout>{userId}</Layout>
}
