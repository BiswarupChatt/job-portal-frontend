import { Route, Routes, Link } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Account from "./components/Account"
import { useAuth } from "./context/AuthContext"

export default function App() {
  const { user, handleLogout } = useAuth()
  return (
    <div>
      <h2>Job Portal</h2>
      <Link to='/'>Home</Link> |
      {!user ? (
        <>
          <Link to='/register'>Register</Link> |
          <Link to='/login'>Login</Link>
        </>
      ) : (
        <>
          <Link to='/account'>Account</Link> |
          <Link to='/logout' onClick={() => {
            localStorage.removeItem('token')
            handleLogout()
          }}>Logout</Link>
        </>
      )}


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/account" element={<Account/>}/>
      </Routes>
    </div>

  )
} 