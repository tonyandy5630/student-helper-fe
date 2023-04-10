import { log } from "console"
import { useQuery } from "@tanstack/react-query"
import { checkLoginAPI } from "apis/auth.api"
import { useEffect, useMemo, useRef } from "react"
import { User } from "types/user.type"

export default function useGetToken() {
  const accessToken = useRef<string>("")
  const userToken = useRef<User>({ email: "", username: "", followers: 0, rankInSubjects: [] })
  const queryState = useRef<string>("loading")
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

  return {
    accessToken: accessToken.current.toString(),
    userToken: userToken.current,
    queryState: queryState.current.toString()
  }
}
