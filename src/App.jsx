import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/components/AppLayout'
import Login from './features/auth/pages/Login'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </div>
  )
}

export default App
