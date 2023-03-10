import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    setUser({
      username: 'tu',
      fullname: 'thanh tu',
      email: 'saf'
    })
  }, [])

  return <>{user ? user.fullname : 'Nothing'}</>
}
