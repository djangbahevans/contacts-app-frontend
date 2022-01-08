import { Navigate } from "react-router-dom"

export type PrivateRouteProps = {
    isAuthenticated?: boolean;
    children: JSX.Element
}

const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => (isAuthenticated) ? children : <Navigate to="/login" />

export { PrivateRoute }
