import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"


export default function App(){
  return(
    <BrowserRouter>
      <div>
        <h2>Job Portal</h2>
       <Link to='/'>Home</Link> | <Link to='/register'>Register</Link> | <Link to='/login'>Login</Link>

       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path= '/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
       </Routes>
      </div>
    </BrowserRouter>
  )
}