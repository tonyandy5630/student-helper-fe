import { log } from "console"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { checkLoginAPI } from "apis/auth.api"
import { useEffect, useMemo, useRef } from "react"
import { User } from "types/user.type"
import { useRouter } from "next/router"

export default function useGetCookieTokens() {
  const accessToken = useRef<string>("")
  const router = useRouter()
  const userToken = useRef<User>({
    email: "",
    username: "",
    followers: 0,
    rankInSubjects: [],
    hasSupportProfile: false
  })
  const queryState = useRef<string>("loading")
  // const queryClient = useQueryClient()
  const checkLoginQuery = useQuery(["check-login"], { queryFn: checkLoginAPI, retry: 1 })
  const { data, error, status } = checkLoginQuery

  useMemo(() => {
    if (data) {
      const access_token = data?.data.data?.access_token as string
      const user = data.data.data?.user

      if (user) userToken.current = user
      if (access_token) accessToken.current = access_token
    }
    queryState.current = status
  }, [data, status])

  useEffect(() => {
    if (status === "error" && accessToken.current.toString() === "") {
      router.push("/auth/signin")
    }
  })

  return {
    accessToken: accessToken.current.toString(),
    userToken: userToken.current,
    queryState: queryState.current.toString()
  }
}
