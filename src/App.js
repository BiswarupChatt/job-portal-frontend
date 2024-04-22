import { Route, Routes, Link } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Account from "./components/Account"
import { useAuth } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import AddJob from "./components/AddJob"
import ApplyJob from "./components/ApplyJob"
import Unauthorized from "./components/Unauthorized"

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

          {user.role === 'recruiter' && <Link to="/add-job">Add New Job</Link>}|
          {user.role === 'candidate' && <Link to="/apply-job">Apply for Job</Link>}|

          <Link to='/' onClick={() => {
            localStorage.removeItem('token')
            handleLogout()
          }}>Logout</Link>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/account" element={
          <PrivateRoute permittedRoles={['recruiter', 'candidate']}>
            <Account />
          </PrivateRoute>
        } />
        <Route path="/add-job" element={
          <PrivateRoute permittedRoles={['recruiter']}>
            <AddJob />
          </PrivateRoute>
        } />
        <Route path="/apply-job" element={
          <PrivateRoute permittedRoles={['candidate']}>
            <ApplyJob />
          </PrivateRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized/>}/>
      </Routes>
    </div>

  )
} 