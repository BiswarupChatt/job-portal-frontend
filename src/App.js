import { Route, Routes, Link } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Account from "./components/Account"
import { useAuth } from "./context/AuthContext"

export default function App() {
  const { user, handleLogin, handleLogout } = useAuth()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const response = await axios.get('http://localhost:3333/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        handleLogin(response.data)
      })()
    }
  }, [])



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
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>

  )
} 