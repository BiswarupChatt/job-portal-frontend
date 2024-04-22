import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function ({permittedRoles, children }) {
    const { user } = useAuth()

    if (!user) {
        return (<Navigate to='/login'/>)
    }
    if(!permittedRoles.includes(user.role)){
        return (<Navigate to='/unauthorized'/>)
    }

    else{
        return children
    }
}