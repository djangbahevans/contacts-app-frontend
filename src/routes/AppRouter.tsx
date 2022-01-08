import { createBrowserHistory } from "history"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PublicRoute } from "."
import { LoginPage, SignupPage } from "../pages"

const history = createBrowserHistory()

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      </Routes>
    </div>
  </BrowserRouter>
)

export { AppRouter, history }
