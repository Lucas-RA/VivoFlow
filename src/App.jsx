import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Colaborador from './pages/Colaborador'
import Buddy from './pages/Buddy'
import Gestor from './pages/Gestor'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/colaborador" element={<Colaborador />} />
        <Route path="/buddy" element={<Buddy />} />
        <Route path="/gestor" element={<Gestor />} />
      </Routes>
    </Router>
  )
}

export default App