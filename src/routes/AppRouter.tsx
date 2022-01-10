import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "."
import { ContactCreatePage, ContactEditPage, ContactViewPage, HomePage, LoginPage, SignupPage } from "../pages"

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="contact/create" element={<PrivateRoute><ContactCreatePage /></PrivateRoute>} />
        <Route path="contact/edit/:id" element={<PrivateRoute><ContactEditPage /></PrivateRoute>} />
        <Route path="contact/:id" element={<PrivateRoute><ContactViewPage /></PrivateRoute>} />
      </Routes>
    </div>
  </BrowserRouter>
)

export { AppRouter }
