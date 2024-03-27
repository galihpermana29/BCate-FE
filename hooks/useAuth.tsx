import { useEffect, useState } from "react"
import { User } from "api/response-interface"

export type UserAuthData = {
  token: string
  user: User
}

/**
 * Null means loading true
 * Undefined means user haven't log in
 * The res
 * @returns
 */

function useAuth() {
  const [authData, setAuthData] = useState<UserAuthData | null | undefined>(undefined)

  useEffect(() => {
    if (localStorage) {
      const loginData = JSON.parse(localStorage.getItem("user-data")!) as UserAuthData
      setAuthData(loginData)
    }
  }, [])

  return { authData }
}

export default useAuth
