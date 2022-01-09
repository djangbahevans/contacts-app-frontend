import { createContext, useContext, useEffect, useState } from "react"

interface IUser {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
}

interface IAuthContext {
  isAuthenticated: boolean;
  user?: IUser;
  login: (email: string, password: string) => Promise<ILogin>
  logout: () => void
}

interface ILogin {
  access_token: string
  token_type: string
}


const authContextDefaults: IAuthContext = {
  isAuthenticated: false,
  login: (email: string, password: string) => new Promise<ILogin>(() => { }),
  logout: (): void => { }
}


const authContext = createContext<IAuthContext>(authContextDefaults)

const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{ isAuthenticated: boolean, user?: IUser }>({ isAuthenticated: false })

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) return

    (async () => {
      const response = await fetch("http://127.0.0.1:8000/users", {
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
          user: data
        })
    })()
  }, [])

  return {
    ...authInfo,
    login: (email: string, password: string) => {
      return new Promise<ILogin>(async (resolve, reject) => {
        let formBody: any = [];
        formBody.push(`${encodeURIComponent("username")}=${encodeURIComponent(email)}`)
        formBody.push(`${encodeURIComponent("password")}=${encodeURIComponent(password)}`)
        formBody = formBody.join('&')

        try {
          const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'post',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          })
          const data: ILogin = await response.json()
          if (response.status === 200) {
            setAuthInfo({
              isAuthenticated: true,
              ...data
            })
            resolve(data)
          }
          else reject(data)
        } catch (e: any) {
          reject({ detail: e.message })
        }
      });
    },
    logout: () => {
      localStorage.removeItem("access_token")
      setAuthInfo({ isAuthenticated: false })
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