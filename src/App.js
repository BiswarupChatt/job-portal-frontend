import { Route, Routes, Link, Navigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Account from "./components/Account"
import { useAuth } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import RedirectedToHome from "./components/RedirectedToHome"
import NotFound from "./components/NotFound"
import AddJob from "./components/AddJob"
import ApplyJob from "./components/ApplyJob"
import Unauthorized from "./components/Unauthorized"

export default function App() {
  const { user, dispatch } = useAuth()

  const conditionalLinks = (path, roles) => {
    switch (path) {
      case '/add-job': {
        if (roles.includes(user.account.role)) {
          return <Link to={path}>Add Job</Link>
        }
      }
      case '/apply-job': {
        if (roles.includes(user.account.role)) {
          return <Link to={path}>Apply Job</Link>
        }
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const response = await axios.get('http://localhost:3333/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })

        let url
        if (response.data.role == 'candidate') {
          url = 'http://localhost:3333/api/candidate/profile'
        } else {
          url = 'http://localhost:3333/api/recruiter/profile'
        }

        const profileResponse = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })

        // handleLogin(response.data)
        dispatch({ type: 'LOGIN', payload: { account: response.data, profile: profileResponse.data } })
      })()
    }
  }, [])



  return (
    <div>
      <h2>Job Portal</h2>
      <Link to='/'>Home</Link> |
      {!user.isLoggedIn ? (
        <>
          <Link to='/register'>Register</Link> |
          <Link to='/login'>Login</Link>
        </>
      ) : (
        <>
          <Link to='/account'>Account</Link> |

          {conditionalLinks('/add-job', ['admin', 'recruiter'])} |
          {conditionalLinks('/apply-job', ['admin', 'candidate'])}

          <Link to='/' onClick={() => {
            localStorage.removeItem('token')
            // handleLogout()
            dispatch({ type: "LOGOUT" })
          }}>Logout</Link>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={
          <RedirectedToHome>
            <Login />
          </RedirectedToHome>
        } />
        <Route path='/register' element={
          <RedirectedToHome>
            <Register />
          </RedirectedToHome>
        } />
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
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path = "*" element={<NotFound/>}/>
      </Routes>
    </div>

  )
} 