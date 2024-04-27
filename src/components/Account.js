import { useAuth } from "../context/AuthContext"
import CandidateProfile from "./CandidateProfile"
import RecruiterProfile from "./RecruiterProfile"
export default function Account() {
    const { user } = useAuth()
    return (
        <>
            <h2>Account</h2>
            {user && (
                <div>
                <p>username - {user.account.username}</p>
                <p>email - {user.account.email}</p>
                <p>role - {user.account.role}</p>

                {user.account.role === 'candidate'? <CandidateProfile/> : <RecruiterProfile/>}
            </div>
            )}
        </>
    )
} 