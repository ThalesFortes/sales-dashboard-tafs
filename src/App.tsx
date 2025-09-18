import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Profile, Leads, Login, Registration } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/profiles" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
