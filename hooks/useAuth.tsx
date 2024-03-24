import { useEffect, useState } from "react"
import { User } from "api/response-interface"

type UserAuthData = {
  token: string
  user: User
}

function useAuth() {
  const [userData, setUserData] = useState<User | undefined>()
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    if (localStorage) {
      const loginData = JSON.parse(localStorage.getItem("user-data")!) as UserAuthData

      setUserData(loginData.user)
      setToken(loginData.token)
    }
  }, [])

  return { userData, token }
}

export default useAuth
