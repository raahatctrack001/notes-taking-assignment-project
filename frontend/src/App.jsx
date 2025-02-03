import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Register from "./Pages/Auth/Register"
import Login from "./Pages/Auth/Login"


function App() {
  return <BrowserRouter>
    <Routes> 
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
}

export default App
