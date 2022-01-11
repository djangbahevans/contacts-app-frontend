import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "."
import { ContactCreatePage, ContactEditPage, ContactViewPage, HomePage, LoginPage, SignupPage } from "../pages"

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="new" element={<PrivateRoute><ContactCreatePage /></PrivateRoute>} />
        <Route path="edit/:id" element={<PrivateRoute><ContactEditPage /></PrivateRoute>} />
        <Route path="person/:id" element={<PrivateRoute><ContactViewPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </BrowserRouter>
)

export { AppRouter }
