import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts"

interface IPrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
    const { isAuthenticated } = useAuth()
    
    return (isAuthenticated) ? children : <Navigate to="/login" />
}

export { PrivateRoute }
