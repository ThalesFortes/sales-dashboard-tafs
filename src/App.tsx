import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom"
import Cookies from "js-cookie"
import { Home, Profile, Leads, Login, Registration } from "./pages"

function App() {
  const ProtectedRoute = () => {
    const checkAuthCookie = Cookies.get("Authorization")
    if (!checkAuthCookie) {
      alert("Autenticação necessária")
      return <Navigate to="/" replace />
    }
    return <Outlet />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
