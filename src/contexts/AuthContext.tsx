import { createContext, useContext, useState } from "react"
import { useQuery } from "react-query"
import { getUsers, login as loginResponse } from "../services/api"
import { authContextDefaults, IAuthContext, ILoginVariables, IUser } from "../utils/sharedInterfaces"


const authContext = createContext<IAuthContext>(authContextDefaults)

const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{ isAuthenticated: boolean, loading: boolean, user?: IUser }>({ isAuthenticated: false, loading: true })

  useQuery("users", getUsers, {
    onSuccess: (data) => {
      setAuthInfo({
        isAuthenticated: true,
        loading: false,
        user: data
      })
    },
    onError: () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        setAuthInfo({ isAuthenticated: false, loading: false })
        return
      }

      setAuthInfo({
        isAuthenticated: false, loading: true
      })
    },
    retry: (failureCount, error): boolean => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        setAuthInfo({ isAuthenticated: false, loading: false })
        return false
      }

      return true
    }
  })

  return {
    ...authInfo,
    login: async ({ email, password }: ILoginVariables) => {
      const data = await loginResponse({ email, password })

      const { access_token } = data

      localStorage.setItem("access_token", access_token)
      setAuthInfo({
        isAuthenticated: true,
        loading: false,
        ...data
      })

      return data
    },
    logout: () => {
      localStorage.removeItem("access_token")
      setAuthInfo({ isAuthenticated: false, loading: false })
    }
  };
}

export const AuthProvider = ({ children }: any) => {
  const auth = useAuth()

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

const AuthConsumer = () => useContext(authContext)

export { AuthConsumer as useAuth }
