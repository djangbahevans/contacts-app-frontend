import { createContext, useContext, useEffect, useState } from "react"
import { login as loginResponse } from "../services/api"
import { authContextDefaults, IAuthContext, ILoginVariables, IUser } from "../utils/sharedInterfaces"


const authContext = createContext<IAuthContext>(authContextDefaults)

const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{ isAuthenticated: boolean, loading: boolean, user?: IUser }>({ isAuthenticated: false, loading: true })

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      setAuthInfo({ isAuthenticated: false, loading: false })
      return
    }

    (async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'get',
        mode: 'cors',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const data: IUser = await response.json()
      if (response.status === 200)
        setAuthInfo({
          isAuthenticated: true,
          loading: false,
          user: data
        })
      else
        setAuthInfo({
          isAuthenticated: false,
          loading: false
        })
    })()
  }, [])

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
