import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Registration } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<>HOME</>} />
        <Route path="/leads" element={<>leads</>} />
        <Route path="/profile" element={<>PERFIL</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
