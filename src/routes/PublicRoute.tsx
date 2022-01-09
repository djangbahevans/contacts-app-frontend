import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts"

interface PublicRouteProps {
    isAuthenticated?: boolean;
    children: JSX.Element
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuthenticated } = useAuth()

    return isAuthenticated ? <Navigate to="/" /> : children
}

export { PublicRoute }
