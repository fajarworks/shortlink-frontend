import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import CreateLinkPage from './pages/CreateLinkPage'
import Dashboard from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<MainLayout/>}>
      <Route path='/landing' element={<LandingPage/>}/>
      <Route path='/create' element={<CreateLinkPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route/>
      </Route>
    </Routes>
  )
}

export default App