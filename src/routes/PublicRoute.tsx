import { Navigate } from "react-router-dom"
import { Loading } from "../components"
import { useAuth } from "../contexts"

interface PublicRouteProps {
  isAuthenticated?: boolean;
  children: JSX.Element
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuth()

  return loading ?
    <Loading /> :
    isAuthenticated ?
      <Navigate to="/" /> :
      children
}

export { PublicRoute }
