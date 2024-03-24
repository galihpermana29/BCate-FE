import { useEffect, useState } from "react"
import { User } from "api/response-interface"

type UserAuthData = {
  token: string
  user: User
}

function useAuth() {
  const [authData, setAuthData] = useState<UserAuthData | undefined>()

  useEffect(() => {
    if (localStorage) {
      const loginData = JSON.parse(localStorage.getItem("user-data")!) as UserAuthData

      setAuthData(loginData)
    }
  }, [])

  return { authData }
}

export default useAuth
