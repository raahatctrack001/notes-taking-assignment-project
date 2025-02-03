import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Home/>} />
    </Routes>
  </BrowserRouter>
}

export default App
